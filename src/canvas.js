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
        console.log('heigt', this.height);
        root.render(20, (this.height / 2) - 30);
        root.setSelected();
        root.setVisible(1, true);
        this.layer.draw();
    }
}
