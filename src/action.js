'use strict';

const color = require("cli-color");

class Action
{
    constructor(data)
    {
        this.data = data;
        this.next = null;
        this.logText = "";
    }

    /**
    * @function handleAction
    * 
    * @param { string } action 
    * @param { string } actionCase 
    * @param { bool } actionState 
    */
    handleAction(table, action, actionCase, actionState)
    {
        const currentDate = new Date().toLocaleString('de-DE', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    
        const caseActionString = action.title ? action.title : actionCase;

        table.AddTableRow(
            {
                date: currentDate,
                action: caseActionString,
                result: `${ actionState ? color.green("✔") : color.red("✗") }`
            }
        );
    }
}

module.exports = { Action };
