export class Node {  

    constructor() {  
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

    updateCanvas(node) {  
        this.unsetSelected();
        node.setSelected();

        return node;
    }

    // Moves to the current node in nextIndex
    moveNext() {  
        if (this.isLeaf()) {  
            return this;
        } else {  
            const next = this.getNext();
            for (let child of next.children) {
                child.setVisible(1, true);
            }
            return this.updateCanvas(next);
        }
    }

    // Moves to the previous node
    movePrevious() {  
        if (this.isRoot()) {  
            return this;
        } else {  
            for (let child of this.children) {
                child.setVisible(1, false);
            }
            return this.updateCanvas(this.previous, false);
        }
    }

    moveToSibling(indexOfPreviousNode) {  
        this.previous.nextIndex = indexOfPreviousNode;
        const next = this.previous.getNext();

        for (let child of this.children) {
            child.setVisible(1, false);
        }

        for (let child of next.children) {
            child.setVisible(1, true);
        }

        return this.updateCanvas(next);
    }

    moveNextSibling() {  
        if (this.isRoot() || this.previous.nextIndex === this.previous.getLastIndex())
            return this;

        return this.moveToSibling(++this.previous.nextIndex);
    }

    movePreviousSibling() {  
        if (this.isRoot() || this.previous.nextIndex === 0) 
            return this;
        
        return this.moveToSibling(--this.previous.nextIndex);
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
