import Konva from 'konva';

const WIDTH = 3000;
const HEIGHT = 3000;
const NUMBER = 200;
const listContainer = document.getElementById('node-list-container');

export class Canvas {  

    constructor() {  
        this.width = window.innerWidth - 500;
        this.height = 700;

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
        this.layer.draw();
    }
}
