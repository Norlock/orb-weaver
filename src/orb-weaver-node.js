import { Node } from './node.js';
export class OrbWeaverNode extends Node {  
    constructor(name) {  
        super();
        this.name = name;
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
}
