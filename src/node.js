export class Node {  

    constructor() {  
        this.next = null;
        this.previous = null;
    }

    append(node) {  
        node.previous = this;
        node.next = this.next;
        if(!this.isTail())
            this.next.previous = node;
        this.next = node;
        return node;
    }

    appendTail(node) {  
        const tail = this.getTail();
        return tail.append(node);
    }

    prepend(node) {  
        node.next = this;
        node.previous = this.previous; 
        if(!this.isHead())
            this.previous.next = node;
        this.previous = node;
        return node;
    }

    prependHead(node) {  
        const head = this.getHead();
        return head.prepend(node);
    }

    moveNext(index) {  
        this._validateIndex(index);

        if (index === 0) {  
            return this;
        } else if (!this.isTail()) {  
            return this.next.moveNext(index - 1);
        } else {  
            return this;
        }
    }

    movePrevious(index) {  
        this._validateIndex(index);

        if (index === 0) {  
            return this;
        } else if (!this.isHead()) {  
            return this.previous.movePrevious(index - 1);
        } else {  
            return this;
        }
    }

    isHead() {  
        return this.previous === null;
    }

    isTail() {  
        return this.next === null;
    }

    getHead() {  
        if (this.isHead())
            return this;
        else
            return this.previous.getHead();
    }

    getTail() {  
        if (this.isTail())
            return this;
        else
            return this.next.getTail();
    }

    _validateIndex(index) {  
        if (isNaN(index))
            throw "Index is not a number!";
        if (index < 0) 
            throw "Index can't be negative";
    }
}
