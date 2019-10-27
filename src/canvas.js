import Konva from 'konva';

export class Canvas {  

    constructor() {  
        this.width = window.innerWidth - 500;
        this.height = 800;

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
        root.render(20, 20);
        root.setSelected();
        root.setVisible(true);
        this.layer.draw();
    }
}
