import { Node } from './node.js';
import Konva from 'konva';

export class OrbWeaverNode extends Node {  

    constructor(name) {  
        super();
        this.name = name;
        this.element = {};
        this.element.width = 300;
        this.element.height = 60;
        this.element.topMargin = 60;
        this.element.rightMargin = 150;
    }

    render(layer, x, y) {  

        this.element.group = new Konva.Group({
            x: x,
            y: y,
            visible: false
        });

        // since this text is inside of a defined area, we can center it using
        // align: 'center'
        this.element.nodeText = new Konva.Text({
            x: 0,
            y: 0,
            text: this.name,
            width: this.element.width,
            fontSize: 18,
            fontFamily: 'Calibri',
            fill: '#555',
            padding: 20,
            align: 'center'
        });

        this.element.rect = new Konva.Rect({
            x: 0,
            y: 0,
            stroke: '#555',
            strokeWidth: 2,
            fill: '#ddd',
            width: this.element.width,
            height: this.element.height,
            shadowColor: 'black',
            shadowBlur: 10,
            shadowOffsetX: 10,
            shadowOffsetY: 10,
            shadowOpacity: 0.2,
            cornerRadius: 10
        });

        this.element.group.add(this.element.rect);
        this.element.group.add(this.element.nodeText);
        layer.add(this.element.group);

        if (!this.isLeaf()) {
            // calculating node positions
            const heightPerElement = this.element.height + this.element.topMargin;
            const totalHeightElements = (heightPerElement * this.children.length) - this.element.topMargin; // Remove top margin from first

            const newX = x + this.element.width + this.element.rightMargin;
            let newY = (y + (this.element.height / 2)) - (totalHeightElements / 2);

            for (let child of this.children) {  
                child.render(layer, newX, newY);
                newY = newY + heightPerElement;
            }
        }
    }

    setSelected() {  
        super.setSelected();
        this.element.nodeText.fontSize(20);
        this.element.rect.fill('#dfd');
    }

    unsetSelected() {  
        super.unsetSelected();
        this.element.nodeText.fontSize(18);
        this.element.rect.fill('#ddd');
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
