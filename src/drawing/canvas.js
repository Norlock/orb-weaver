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
        this.layer.hitGraphEnabled(false);
        this.stage.add(this.layer);
    }

    render(node) {  
        const root = node.getRoot();
        this.centerX = (this.width / 2) - (root.element.width / 2); 
        this.centerY =  (this.height / 2) - (root.element.height / 2);
        root.render(this.centerX, this.centerY, 0);  
        root.setSelected(true);
        root.setVisible(1, true);
        return root;
    }

    panCanvas(node) {  
        // the tween has to be created after the node has been added to the layer
        const tween = new Konva.Tween({
            node: this.layer,
            duration: 0.3,
            x: this._getXOffset(node),
            y: this._getYOffset(node),
            easing: Konva.Easings.EaseIn
        });

        tween.play();
    }

    rerender() {  
        this.layer.batchDraw();
    }

    _getYOffset(node) {  
        return this.centerY - node.element.y;
    }

    _getXOffset(node) {  
        return this.centerX - node.element.x;
    }
}
