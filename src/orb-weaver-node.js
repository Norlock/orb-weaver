import { Node } from './node.js';
import { Element } from './drawing/element-builder';

export class OrbWeaverNode extends Node {  

    constructor(name, imgSrc) {  
        super();
        this.name = name;
        this.element = new Element(300, 330, 150, 150, imgSrc);
    }

    render(layer, x, y) {  
        this.element.setGroup(x, y);
        this.element.setContainer("#ddd");
        this.element.setTitle(this.name, 20);
        layer.add(this.element.group);

        this.element.setImage(() => {  
            layer.draw();
        });

        if (!this.isLeaf()) {
            // calculating node positions
            const heightPerElement = this.element.height + this.element.verticalMargin;
            const totalHeightElements = (heightPerElement * this.children.length) - this.element.verticalMargin; // Remove top margin from first

            const newX = x + this.element.width + this.element.horizontalMargin;
            let newY = (y + (this.element.height / 2)) - (totalHeightElements / 2);

            for (let child of this.children) {  
                child.render(layer, newX, newY);
                newY = newY + heightPerElement;
            }
        }
    }

    setSelected() {  
        super.setSelected();
        this.element.title.fontSize(22);
        this.element.container.fill('#dfd');
    }

    unsetSelected() {  
        super.unsetSelected();
        this.element.title.fontSize(20);
        this.element.container.fill('#ddd');
    }

    setVisible(depth, visible) {  
        if (visible) {  
            this.element.group.show();
        } else {  
            this.element.group.hide();
        }

        if (0 < depth) {  
            for (let child of this.children) {
                child.setVisible(--depth, visible);
            }
        }
    }
}
