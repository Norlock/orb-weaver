import Konva from 'konva';

export class Element {  
    constructor(layer, width, height, imgSrc) {  
        this.layer = layer;
        this.width = width;
        this.height = height;
        this.margin = 800;
        this.imgSrc = imgSrc;
        this.radius = this.height + this.margin;

        // Help variables
        this.centerHeight = (this.height / 2);
        this.centerWidth = (this.width / 2);
    }

    setGroups(x, y) {  
        this.x = x;
        this.y = y;

        this.elementGrp = new Konva.Group({
            x: x,
            y: y,
            transformsEnabled: 'position',
            visible: false
        });

        this.lineGrp = new Konva.Group({
            x: x,
            y: y,
            transformsEnabled: 'position',
            visible: false
        });

        this.layer.add(this.lineGrp);
        this.layer.add(this.elementGrp);
        this.lineGrp.moveToBottom();
    }

    setTitle(title, fontSize) {  
        this.title = new Konva.Text({
            x: 0,
            y: 0,
            text: title,
            width: this.width,
            fontSize: fontSize, 
            fontFamily: 'Calibri',
            fill: '#555',
            padding: 20,
            align: 'center'
        });
        
        this.elementGrp.add(this.title);
    }

    setContainer(color) {  
        this.container = new Konva.Rect({
            x: 0,
            y: 0,
            stroke: '#333',
            strokeWidth: 2,
            fill: color, 
            width: this.width,
            height: this.height,
            shadowColor: 'black',
            shadowBlur: 10,
            shadowOffsetX: 10,
            shadowOffsetY: 10,
            shadowOpacity: 0.2,
            cornerRadius: 10
        });

        this.elementGrp.add(this.container);
    }

    setImage() {  
        const imageObj = new Image();
        imageObj.src = this.imgSrc;
        imageObj.onload = () => {  
            const frameDim = this.width * 0.8;
            this.image = new Konva.Image({
                x: this.width / 10,
                y: this.height / 5,
                width: frameDim,
                height: frameDim,
                image: imageObj,
                transformsEnabled: 'position'
            });

            this.elementGrp.add(this.image);
            this.layer.batchDraw();
        };
    }

    addLine(x, y) {  
        const offset = 200;
        const centerOffset = offset / 2;
        const randomX = x / 2 + (Math.random() * offset) - centerOffset;
        const randomY = y / 2 + (Math.random() * offset) - centerOffset;
        const line = new Konva.Line({  
            points: [this.centerWidth, this.centerHeight, randomX, randomY, 
                x + this.centerWidth, y + this.centerHeight],
            stroke: '#333',
            tension: 0.5,
            strokewidth: 4,
            lineCap: 'round',
            lineJoin: 'round',
            transformsEnabled: 'position'
        });
        this.lineGrp.add(line);
    }

    show(visible) {  
        if (visible) {  
            this.elementGrp.show();
            this.lineGrp.show();
        } else {  
            this.elementGrp.hide();
            this.lineGrp.hide();
        }
    }
}
