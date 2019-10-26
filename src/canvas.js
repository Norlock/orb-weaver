import Konva from 'konva';

const WIDTH = 3000;
const HEIGHT = 3000;
const NUMBER = 200;
const listContainer = document.getElementById('node-list-container');

export class Canvas {  

    constructor() {  
        this.width = window.innerWidth;
        this.height = 1000;

        this.stage = new Konva.Stage({
            container: 'canvas-container',
            width: this.width,
            height: this.height,
            draggable: true
        });
        var layer = new Konva.Layer();
        this.stage.add(layer);

        for (var i = 0; i < NUMBER; i++) {
            layer.add(this.generateNode());
        }
        layer.draw();
    }

    generateNode() {
        return new Konva.Circle({
            x: WIDTH * Math.random(),
            y: HEIGHT * Math.random(),
            radius: 50,
            fill: 'red',
            stroke: 'black'
        });
    }
}
