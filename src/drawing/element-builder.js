import Konva from 'konva';

export class Element {  
    constructor(width, height, imgSrc) {  
        this.width = width;
        this.height = height;
        this.margin = 800;
        this.imgSrc = imgSrc;
        this.radius = this.height + this.margin;
        this.elementYCenter = (this.height / 2);
        this.elementXCenter = (this.width / 2);
    }

    setGroup(x, y) {  
        this.group = new Konva.Group({
            x: x,
            y: y,
            visible: false
        });

        this.lines = new Konva.Group({
            x: x,
            y: y,
            visible: false
        });
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
        
        this.group.add(this.title);
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

        this.group.add(this.container);
    }

    setImage(callback) {  
        const imageObj = new Image();
        imageObj.src = this.imgSrc;
        imageObj.onload = () => {  
            const frameDim = this.width * 0.8;
            this.image = new Konva.Image({
                x: this.width / 10,
                y: this.height / 5,
                width: frameDim,
                height: frameDim,
                image: imageObj
            });

            this.group.add(this.image);
            callback();
        };
    }

    addLine(newX, newY) {  
        const randomX = newX / 2 + (Math.random() * 100) - 50;
        const randomY = newY / 2 + (Math.random() * 100) - 50;
        const line = new Konva.Line({  
            points: [this.elementXCenter, this.elementYCenter, randomX, randomY, 
                newX + this.elementXCenter, newY + this.elementYCenter],
            stroke: '#333',
            tension: 0.5,
            strokewidth: 4,
            linecap: 'round',
            linejoin: 'round'
        });
        this.lines.add(line);
    }
    
    show(previous) {  
        this.group.show();
        this.lines.show();
    }

    hide(previous) {  
        this.group.hide();
        this.lines.hide();
    }
}
