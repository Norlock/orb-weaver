const css = require('./styles/main.css');
import { OrbWeaverNode } from './orb-weaver-node.js';

let currentNode = new OrbWeaverNode("Blut Aus Nord");
const listContainer = document.getElementById('node-list-container');
const list = document.getElementById('ow-list');
const title = document.getElementById('title');
const errorMsg = document.getElementById('error-msg');
const arrowUp = 38;
const arrowDown = 40;
const enter = 13;

document.addEventListener('DOMContentLoaded', (event) => {
    // Adding dummy nodes
    currentNode = currentNode.prepend(new OrbWeaverNode("Be'lakor"));
    currentNode = currentNode.append(new OrbWeaverNode("Deathspell Omega"));
    currentNode = currentNode.append(new OrbWeaverNode("Drudkh"));
    currentNode = currentNode.append(new OrbWeaverNode("Urfaust"));
    currentNode = currentNode.append(new OrbWeaverNode("Sunn O)))"));
    currentNode = currentNode.append(new OrbWeaverNode("Insomnium"));
    currentNode = currentNode.prepend(new OrbWeaverNode("Gojira"));
    
    console.log('currentNode', currentNode);

    render();
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

    const append = function() {
        const bandName = prompt("Please enter the band name", "");

        if (bandName == null || bandName == "") {
            errorMsg.innerText = "User cancelled the prompt.";
            errorMsg.style.display = "block";
        } else {
            errorMsg.style.display = "none";
            currentNode = currentNode.append(new OrbWeaverNode(bandName));
        }
    };

    console.log(event.keyCode);

    switch (event.keyCode) {  
        case arrowUp: 
            moveNext();       
            break;
        case arrowDown:
            movePrevious();
            break;
        case enter:
            append();
        default:
            console.log('unknown key pressed');
            //throw "Unknown key pressed";
    }

});

function render() {  
    title.innerText = currentNode.name;
    currentNode.render(list);
}
