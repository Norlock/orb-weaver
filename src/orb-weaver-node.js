import { Node } from './node.js';
export class OrbWeaverNode extends Node {  

    constructor(layer, name) {  
        super(layer);
        this.name = name;
        this.width = 300;
    }

    render(x, y) {  

        // since this text is inside of a defined area, we can center it using
        // align: 'center'
        this.nodeText = new Konva.Text({
            x: x,
            y: y,
            text: this.name,
            fontSize: 18,
            fontFamily: 'Calibri',
            fill: '#555',
            width: this.width,
            padding: 20,
            align: 'center'
        });

        this.rect = new Konva.Rect({
            x: x,
            y: y,
            stroke: '#555',
            strokeWidth: 2,
            fill: '#ddd',
            width: this.width,
            height: this.nodeText.height(),
            shadowColor: 'black',
            shadowBlur: 10,
            shadowOffsetX: 10,
            shadowOffsetY: 10,
            shadowOpacity: 0.2,
            cornerRadius: 10
        });

        this.layer.add(this.rect);
        this.layer.add(this.nodeText);

        let newX = x + this.width + 50;
        let newY = y;
        for (let child of this.children) {  
            child.render(newX, newY);
            newY = newY + this.nodeText.height() + 50;
        }
    }

    setSelected() {  
        super.setSelected();
        this.nodeText.fontSize(20);
        this.rect.fill('#dfd');
        this.layer.draw();
    }

    unsetSelected() {  
        super.unsetSelected();
        this.nodeText.fontSize(18);
        this.rect.fill('#ddd');
        this.layer.draw();
    }
}
