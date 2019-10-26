import Konva from 'konva';

const WIDTH = 3000;
const HEIGHT = 3000;
const NUMBER = 200;
const listContainer = document.getElementById('node-list-container');

export class Canvas {  

    constructor(rootNode) {  
        this.width = window.innerWidth - 500;
        this.height = 700;

        this.stage = new Konva.Stage({
            container: 'canvas-container',
            width: this.width,
            height: this.height,
            draggable: true
        });
        const layer = new Konva.Layer();
        this.stage.add(layer);
        rootNode.render(layer, 20, 20);

        layer.draw();
    }

}
