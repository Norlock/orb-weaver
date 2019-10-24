export class Node {  

    constructor(name) {  
        this.name = name;
        this.next = null;
        this.previous = null;
    }

    append(node) {  
        if(this.isTail()) {  
            node.previous = this;
            this.next = node;
        } else {  
            this.next.append(node);
        }
    }

    prepend(node) {  
        if (this.isHead()) {  
            this.previous = node;
            node.next = this;
        } else {  
            this.previous.prepend(node);
        }
    }

    print() {  
        return this.name;
    }

    printRecursivelyPrevious() {  
        if (this.isHead()) {  
            return this.name;
        } else { 
            return this.name + " " + this.previous.printRecursivelyPrevious();
        }
    }

    printRecursivelyNext() {  
        if (this.isTail()) {  
            return this.name;
        } else { 
            return this.name + " " + this.next.printRecursivelyNext();
        }
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
