import Konva from 'konva';

export class Canvas {  

    constructor() {  
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.stage = new Konva.Stage({
            container: 'canvas-container',
            width: this.width,
            height: this.height,
            draggable: true
        });

        this.layer = new Konva.Layer();
        this.stage.add(this.layer);
    }

    render(root) {  
        this.centerX = (this.width / 2) - (root.element.width * 2); // element.width * 2 because of two rows.
        this.centerY =  (this.height / 2) - (root.element.height / 2);
        root.render(this.layer, this.centerX, this.centerY);  
        root.setSelected();
        root.setVisible(1, true);
        this.layer.draw();
    }

    panCanvas(node) {  
        this.layer.position({ x: this._getXOffset(node), y: this._getYOffset(node)}); // set position
    }

    rerender() {  
        this.layer.draw();
    }

    _getYOffset(node) {  
        return this.centerY - node.element.group.attrs.y;
    }

    _getXOffset(node) {  
        return this.centerX - node.element.group.attrs.x;
    }
}
