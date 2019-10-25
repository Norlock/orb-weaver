import { Node } from './node.js';
export class OrbWeaverNode extends Node {  
    constructor(name) {  
        super();
        this.name = name;

        this.element = document.createElement('li');
        this.element.innerText = this.name;
    }

    render() {  
        const ol = document.createElement('ol');
        ol = this.getPreviousElements(ol);
        const current = this.getElement();
        return this.name;
    }

    // Only return previous elements (discard this).
    getPreviousElements(list) {  
        if (this.isHead()) {  
            return list;
        } else { 
            list = this.previous.getPreviousElements(list);
            list.appendChild(this.previous.element);
        }
    }

    getNextElements(list) {  
        if (this.isTail()) {  
            return list;
        } else { 
            list.appendChild(this.next.element);
            return this.next.getNextElements(list);
        }
    }
}
