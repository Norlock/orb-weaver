export class Node {  

    constructor(name) {  
        this.name = name;
        //this.id = id;

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

    print() {  
        if (this.previous === null && this.next === null) {  
            return "Head and tail is: " + this.name;
        } else if (this.isHead()) {  
            return "Head is: " + this.name + "\n" + this.next.print() ;
        } else if (this.isTail()) {  
            return "\nTail is: " +  this.name;
        } else { 
            return this.name + " " + this.next.print();
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
            this.previous.next = this.next;
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

    isTail() {  
        return this.next === null;
    }
}
