import { Node } from './node.js';
export class OrbWeaverNode extends Node {  
    constructor(name) {  
        super();
        this.name = name;
    }

    render(listElement) {  
        console.log(listElement);

    }

    setSelected() {  
        super.setSelected();
    }

    unsetSelected() {  
        super.setSelected();
    }
}
