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

    prepend(node) {  
        node.next = this;
        node.previous = this.previous; 
        if(!this.isHead())
            this.previous.next = node;
        this.previous = node;
        return node;
    }

    appendTail(node) {  
        const tail = this.getTail();
        return tail.append(node);
    }

    prependHead(node) {  
        const head = this.getHead();
        return head.prepend(node);
    }

    setSelected() {  
        this.selected = true;
    }

    unsetSelected() {  
        this.selected = false;
    }

    moveNext(index) {  
        this._validateIndex(index);

        if (index === 0 || this.isTail()) {  
            this.setSelected();
            return this;
        } else {  
            this.unsetSelected();
            return this.next.moveNext(index - 1);
        } 
    }

    movePrevious(index) {  
        this._validateIndex(index);

        if (index === 0 || this.isHead()) {  
            this.setSelected();
            return this;
        } else {  
            this.unsetSelected();
            return this.previous.movePrevious(index - 1);
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
