import { Node } from './node.js';
export class OrbWeaverNode extends Node {  

    constructor(layer, name) {  
        super(layer);
        this.name = name;
        this.element = {};
        this.element.width = 300;
        this.element.height = 60;
    }

    render(x, y) {  
        console.log('node', this);

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
            height: this.element.height,
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
        this.layer.add(this.element.group);

        let newX = x + this.element.width + 50;
        let newY = y;

        for (let child of this.children) {  
            child.render(newX, newY);
            newY = newY + this.element.height + 50;
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
