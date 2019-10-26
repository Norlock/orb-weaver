import { Node } from './node.js';
export class OrbWeaverNode extends Node {  
    constructor(name) {  
        super();
        this.name = name;
        this.width = 300;
    }

    render(layer, x, y) {  
        // since this text is inside of a defined area, we can center it using
        // align: 'center'
        
        const nodeText = new Konva.Text({
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

        const rect = new Konva.Rect({
            x: x,
            y: y,
            stroke: '#555',
            strokeWidth: 2,
            fill: '#ddd',
            width: this.width,
            height: nodeText.height(),
            shadowColor: 'black',
            shadowBlur: 10,
            shadowOffsetX: 10,
            shadowOffsetY: 10,
            shadowOpacity: 0.2,
            cornerRadius: 10
        });

        layer.add(rect);
        layer.add(nodeText);

        let newX = x + this.width + 50;
        let newY = y;
        for (let child of this.children) {  
            child.render(layer, newX, newY);
            newY = newY + nodeText.height() + 50;
        }
    }

    setSelected() {  
        super.setSelected();
    }

    unsetSelected() {  
        super.setSelected();
    }
}
