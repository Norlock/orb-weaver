const css = require('./styles/main.css');
import { Node } from './node.js';

let currentNode = new Node("Blut Aus Nord");
const element = document.getElementById('node-container');
const arrowUp = 38;
const arrowDown = 40;

document.addEventListener('DOMContentLoaded', (event) => {
    //the event occurred
    currentNode.append(new Node("Deathspell Omega"));
    currentNode.append(new Node("Drudkh"));
    currentNode.append(new Node("Urfaust"));
    currentNode.append(new Node("Sunn O)))"));
    currentNode.append(new Node("Insomnium"));
    currentNode.prepend(new Node("Gojira"));

    element.innerText = currentNode.print();
});

document.addEventListener("keydown", event => {
    console.log('detect keydown');
    if (event.isComposing || event.keyCode === 229) {
        return;
    }

    const moveNext = function() {
        currentNode = currentNode.moveNext(1);
    };

    const movePrevious = function() {
        currentNode = currentNode.movePrevious(1);
    };

    switch (event.keyCode) {  
        case arrowUp: 
            moveNext();       
            break;
        case arrowDown:
            movePrevious();
            break;
        default:
            throw "Unknown key pressed";
    }

    element.innerText = currentNode.print();
});
