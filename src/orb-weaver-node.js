import { Node } from './node.js';
export class OrbWeaverNode extends Node {  
    constructor(name) {  
        super();
        this.name = name;

        this.element = document.createElement('li');
        this.element.classList.add("ow-li");
        this.element.innerText = this.name;
    }

    render(list) {  
        console.log(list);
        list = this.renderPreviousElements(list);
        list.appendChild(this.element);
        return this.renderNextElements(list);
    }

    render(listElement) {  
        listElement.appendChild(this.element);
        if (!this.isLeaf()) {  
            const li = document.createElement('li');
            let ol = document.createElement('ol');
            
            for (let child of this.children) {  
                ol = child.render(ol);
            }

            li.appendChild(ol);
            listElement.appendChild(li);
        }
        return listElement;
    }

    setSelected() {  
        super.setSelected();
        this.element.classList.add("selected");
    }

    unsetSelected() {  
        super.setSelected();
        this.element.classList.remove("selected");
    }
}
