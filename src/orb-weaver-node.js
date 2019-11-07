import { Node } from './node.js';
import { Element } from './drawing/element-builder';

export class OrbWeaverNode extends Node {  

    constructor(name, imgSrc) {  
        super();
        this.name = name;
        this.element = new Element(250, 280, imgSrc);
    }

    render(layer, x, y) {  
        this.element.setGroups(layer, x, y);
        this.element.setContainer("#ddd");
        this.element.setTitle(this.name, 20);

        this.element.setImage(() => {  
            layer.batchDraw();
        });

        if (!this.isLeaf()) {

            // calculating node positions
            const renderChildren = (index, mulPi) => {
                const child = this.children[index];
                const angle = 7; 
                const lineX = this.element.radius * Math.cos(mulPi * (Math.PI / angle));
                const lineY = this.element.radius * Math.sin(mulPi * (Math.PI / angle));

                child.render(layer, x + lineX, y + lineY);
                // line to previous is opposite direction (minus).
                child.element.addLine(-lineX, -lineY);

                if (index < this.children.length - 1) {
                    renderChildren(++index, ++mulPi);
                } 
            };

            const mulPi = (this.children.length - 1) / -2; // Negative number will appears on top.
            renderChildren(0, mulPi); 
        }
    }

    setSelected(selected) {  
        super.setSelected(selected);
        if (selected) {  
            this.element.title.fontSize(22);
            this.element.container.fill('#dfd');
        } else {  
            this.element.title.fontSize(20);
            this.element.container.fill('#ddd');
        }
    }

    setVisible(depth, visible) {  
        super.setVisible(visible);
        this.element.show(visible);

        if (0 < depth) {  
            for (let child of this.children) {
                child.setVisible(--depth, visible);
            }
        }     
    }
}
