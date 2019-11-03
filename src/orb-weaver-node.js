import { Node } from './node.js';
import { Element } from './drawing/element-builder';

export class OrbWeaverNode extends Node {  

    constructor(name, imgSrc) {  
        super();
        this.name = name;
        this.element = new Element(250, 280, imgSrc);
    }

    render(layer, x, y) {  
        this.element.setGroup(x, y);
        this.element.setContainer("#ddd");
        this.element.setTitle(this.name, 20);
        layer.add(this.element.group);

        this.element.setImage(() => {  
            layer.batchDraw();
        });

        if (!this.isLeaf()) {

            // calculating node positions
            const renderChildren = (index, mulPi) => {
                const child = this.children[index];
                const angle = 7; 
                console.log('degrees', (Math.PI / angle) * mulPi);
                const newX = x + (this.element.radius * Math.cos(mulPi * (Math.PI / angle)));
                const newY = y + (this.element.radius * Math.sin(mulPi * (Math.PI / angle)));

                child.render(layer, newX, newY);

                const hasNext = index < this.children.length - 1;
                if (hasNext) {
                    renderChildren(++index, ++mulPi);
                } 
            };

            const mulPi = (this.children.length - 1) / -2; // Negative number will appears on top.
            renderChildren(0, mulPi); 
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
            depth--;
            for (let child of this.children) {
                child.setVisible(depth, visible);
            }
        }
    }
}
