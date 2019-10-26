import { Node } from './node.js';
export class OrbWeaverNode extends Node {  
    constructor(name) {  
        super();
        this.name = name;

        this.element = document.createElement('li');
        this.element.innerText = this.name;
    }

    render(list) {  
        this.element.classList.add("selected");
        console.log(list);
        list = this.renderPreviousElements(list);
        list.appendChild(this.element);
        return this.renderNextElements(list);
    }

    setSelected() {  
        this.element.classList.add("selected");
    }

    unsetSelected() {  
        this.element.classList.remove("selected");
    }

    // Only return previous elements (discard this).
    renderPreviousElements(list) {  
        if (!this.isHead()) {  
            if (!this.previous.isHead()) {  
                list = this.previous.renderPreviousElements(list);
            }
            list.appendChild(this.previous.element);
        }
        return list;
    }

    // Only return next elements (discard this).
    renderNextElements(list) {  
        if (!this.isTail()) {  
            list.appendChild(this.next.element);
            if (!this.next.isTail()) {  
                list = this.next.renderNextElements(list);
            }
        }  
        return list;
    }
}
