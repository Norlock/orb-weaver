export class Node {  

    constructor(name) {  
        this.name = name;

        this.next = null;
        this.previous = null;
    }

    append(node) {  
        if(this.next === null) {  
            node.previous = this;
            this.next = node;
        } else {  
            this.next.append(node);
        }
    }

    prepend(node) {  
        console.log('prepend', this);
        if (this.isHead()) {  
            this.previous = node;
            node.previous = null;
            node.next = this;
        } else {  
            this.previous.prepend(node);
        }
    }

    print() {  
        return this.getHead().printRecursivelyNext();
    }

    printRecursivelyPrevious() {  
        if (this.isHead() && this.isTail()) {  
            return "Head and tail is: " + this.name;
        } else if (this.isTail()) {  
            return "Tail is: " +  this.name + "\n" + this.previous.printRecursivelyPrevious();
        } else if (this.isHead()) {  
            return "\nHead is: " + this.name;
        } else { 
            return this.name + " " + this.previous.printRecursivelyPrevious();
        }
    }

    printRecursivelyNext() {  
        if (this.isHead() && this.isTail()) {  
            return "Head and tail is: " + this.name;
        } else if (this.isHead()) {  
            return "Head is: " + this.name + "\n" + this.next.printRecursivelyNext();
        } else if (this.isTail()) {  
            return "\nTail is: " +  this.name;
        } else { 
            return this.name + " " + this.next.printRecursivelyNext();
        }
    }

    getAt(index) {  
        if (index < 0) {  
            alert('Index to low');
        }

        if (index === 0) {  
            return this;
        } else if (!this.isTail()) {  
            return this.next.getAt(index - 1);
        } else {  
            alert('Index to high');
        }
    }

    removeAt(index) {  
        if (index < 0) {  
            alert('Index to low');
        }

        if (index === 0) {  
            if (!this.isHead()) 
                this.previous.next = this.next;
            else if (!this.isTail())
                this.next.previous = this.previous;
        } else if (!this.isTail()) {  
            this.next.removeAt(index - 1);
        } else {  
            alert('Index to high');
        }
    }

    isHead() {  
        return this.previous === null;
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

    isTail() {  
        return this.next === null;
    }
}
