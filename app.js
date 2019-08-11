'use strict';

const fs = require('fs');
const yaml = require('js-yaml');
const puppeteer = require('puppeteer');
const CliTable = require('tabletops');

const {
    Queue
} = require('./src/');

const table = new CliTable();
let currentCase = 0;
let cases = [  ];
let testTitle;

const runCase = (caseToRun) =>
{
    const q = new Queue();

    let actionSuccessCounter = 0;
    let actionFailedCounter;

    try
    {
        var doc = yaml.safeLoad(fs.readFileSync(`./cases/${caseToRun}`, 'utf8'));

        testTitle = doc.title;
        actionFailedCounter = doc.actions.length;

        doc.actions.forEach(action => {
            q.enqueue(action);
        });
    }
    catch (e)
    {

    }

    table.SetTableTitle(`Results for "${ testTitle }"`);

    table.SetTableColumns([
        {
            key: 'date',
            title: 'Date',
            width: 21
        },
        {
            key: 'action',
            title: 'Action',
            width: 55
        },
        {
            key: 'result',
            title: 'Result',
            width: 0
        }
    ]);

    const queuedActions = q.size;

    puppeteer.launch({
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
        ]
    }).then(async browser =>
    {
        const page = await browser.newPage();

        await page.setViewport({ width: 1280, height: 800 })

        table.ShowTable();

        for (let index = 0; index < queuedActions; index++)
        {
            const action = q.dequeue();

            let actionCase = '';

            if (action.data.delay)
            {
                await page.waitFor(action.data.delay);
            }

            try
            {
                switch (action.data.type)
                {
                    case 'visit':
                        await page.goto(action.data.url).then(() =>
                        {
                            actionCase = `visit '${ action.data.url }'`;
                        });
                        break;
                    case 'fill':
                        await page.type(action.data.target, action.data.content).then(() =>
                        {
                            actionCase = `fill '${ action.data.target }'`;
                        });
                        break;
                    case 'click':
                        await page.click(action.data.target).then(() =>
                        {
                            actionCase = `click '${ action.data.target.length > 60 ? '[element]' : action.data.target }'`;
                        });
                        break;
                    case 'press':
                        await page.keyboard.press(action.data.key).then(() =>
                        {    
                            actionCase = `press '${ action.data.key.length }'`;
                        });
                        break;
                    case 'wait':
                        await page.waitFor(action.data.time).then(() =>
                        {
                            actionCase = `wait ${ action.data.time / 1000 } seconds`;
                        });
                        break;
                }

                actionSuccessCounter++;
            }
            catch (e)
            {
                if (e instanceof puppeteer.errors.TimeoutError)
                {
                    actionFailedCounter++;
                }
            }

            action.handleAction(table, action.data, actionCase, true);
        }

        await page.waitFor(1000);
        await page.screenshot({path: `screenshots/screenshot_${ testTitle }_${ new Date().getTime() }.png`, fullPage: true });
        await browser.close().then(() =>
        {
            if (currentCase < cases.length - 1)
            {
                currentCase++;

                runCase(cases[currentCase]);
            }
        });

        table.AddTableFooter(`${ actionSuccessCounter } ${ actionSuccessCounter === 1 ? 'action' : 'actions' } passed | ${ actionFailedCounter - actionSuccessCounter } failed`);
    });
}

/**
 * @function init
 * 
 * Initializes the application.
 */
const init = () =>
{
    cases = fs.readdirSync('./cases');

    console.log("Running test cases:");

    cases.forEach(testCase =>
    {
        const caseMeta = yaml.safeLoad(fs.readFileSync(`./cases/${testCase}`, 'utf8'));
        
        console.log(`- ${caseMeta.title}`);
    });

    runCase(cases[currentCase]);
}

init();
