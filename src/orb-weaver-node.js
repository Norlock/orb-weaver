import { Node } from './node.js';
import { Element } from './drawing/element-builder';

export class OrbWeaverNode extends Node {  

    constructor(layer, name, imgSrc) {  
        super();
        this.name = name;
        this.element = new Element(layer, 250, 280, imgSrc);
    }

    render(x, y, mulPi) {  
        this.element.setGroups(x, y);
        this.element.setContainer("#ddd");
        this.element.setTitle(this.name, 20);
        this.element.setImage();

        console.log('name', this.name);
        console.log('mulPi', mulPi);

        if (!this.isLeaf()) {
            // Update mulPi for children.
            const mulPiOffset = (this.children.length - 1) / 2;
            mulPi = mulPi - mulPiOffset; // Negative number will appears on top.
            console.log('offset', mulPiOffset);

            // calculating node positions
            const renderChildren = (index, mulPi) => {
                const child = this.children[index];
                const angle = 7; 
                if (child.name === 'Mgla') {  
                    console.log('x', x);
                    //console.log('lineX', lineX);
                }
                const lineX = this.element.radius * Math.cos(mulPi * (Math.PI / angle));
                const lineY = this.element.radius * Math.sin(mulPi * (Math.PI / angle));

                if (child.name === 'Mgla') {  
                    console.log('x', x);
                    //console.log('lineX', lineX);
                }
                child.render(x + lineX, y + lineY, mulPi);
                child.element.addLine(-lineX, -lineY); // line to previous is opposite direction (minus).

                if (index < this.children.length - 1) {
                    renderChildren(++index, ++mulPi);
                } 
            };

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
