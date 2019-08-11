'use strict';

const { Action } = require('./action');

class Queue
{
    constructor()
    {
        this.first = null;
        this.size = 0;
    }

    enqueue(data)
    {
        const action = new Action(data);
  
        if (!this.first)
        {
            this.first = action;
        }
        else
        {
            let n = this.first;

            while (n.next)
            {
                n = n.next;
            }

            n.next = action;
        }
  
        this.size += 1;
        return action;
    }

    dequeue()
    {
        const temp = this.first;

        this.first = this.first.next;
        this.size -= 1;
        
        return temp;
    }
}

module.exports = { Queue };
