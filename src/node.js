export class Node {  

    constructor(layer) {  
        this.layer = layer;
        this.nextIndex = 0;
        this.previous = null;
        this.children = [];
    }

    addChild(node) {  
        node.previous = this;
        this.children.push(node);
        return this;
    }

    getNext() {  
        return this.children[this.nextIndex];
    }

    toggleSelected(next) {  
        this.unsetSelected();
        next.setSelected();
        return next;
    }

    // Moves to the current node in nextIndex
    moveNext() {  
        if (this.isLeaf()) {  
            return this;
        } else {  
            return this.toggleSelected(this.getNext());
        }
    }

    // Moves to the previous node
    movePrevious() {  
        if (this.isRoot()) {  
            return this;
        } else {  
            return this.toggleSelected(this.previous);
        }
    }

    getNextSibling() {  
        if (this.isRoot()) 
            return this;

        const previous = this.previous;

        if (previous.nextIndex < previous.getLastIndex()) 
            previous.nextIndex++;

        return this.toggleSelected(previous.getNext());

    }

    getPreviousSibling() {  
        if (this.isRoot()) 
            return this;
        
        const previous = this.previous;

        if (previous.nextIndex > 0) 
            previous.nextIndex--;

        return this.toggleSelected(previous.getNext());
    }

    // Broken
    //prepend(node) {  
        //// Set node pointers
        //node.add(this);
        //node.previous = this.previous; 
        //if(!this.isRoot())
            //this.previous.next = node; // Set previous pointers
        //this.previous = node; // Set this pointer

        //return this.toggleSelected(node);
    //}

    prependHead(node) {  
        const head = this.getRoot();
        return head.prepend(node);
    }

    setSelected() {  
        this.selected = true;
    }

    unsetSelected() {  
        this.selected = false;
    }

    getRoot() {  
        if (this.isRoot())
            return this;
        else
            return this.previous.getRoot();
    }

    getLeaf() {  
        if (this.isLeaf())
            return this;
        else
            return this.getNext();
    }

    isRoot() {  
        return this.previous === null;
    }

    isLeaf() {  
        return this.children.length === 0;
    }

    getLastIndex() {  
        return this.children.length - 1;
    }

    _validateIndex(index) {  
        if (isNaN(index))
            throw "Index is not a number!";
        if (index < 0) 
            throw "Index can't be negative";
    }
}
