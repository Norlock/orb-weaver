import './styles/main.scss';
import { OrbWeaverNode } from './orb-weaver-node.js';
import { constants } from './constants.js';
import { Canvas } from './canvas.js';

const list = document.getElementById('ow-list');
const title = document.getElementById('title');
const errorMsg = document.getElementById('error-msg');

let currentNode;
document.addEventListener('DOMContentLoaded', (event) => {
    const canvas = new Canvas();
    
    // Adding dummy nodes
    currentNode = new OrbWeaverNode(canvas.layer, "Blut Aus Nord");
    currentNode = currentNode.addChild(new OrbWeaverNode(canvas.layer, "Be'lakor"));
    currentNode = currentNode.addChild(new OrbWeaverNode(canvas.layer, "Deathspell Omega"));
    currentNode = currentNode.addChild(new OrbWeaverNode(canvas.layer, "Drudkh"));
    currentNode = currentNode.addChild(new OrbWeaverNode(canvas.layer, "Urfaust"));
    currentNode = currentNode.addChild(new OrbWeaverNode(canvas.layer, "Sunn O)))"));
    currentNode = currentNode.addChild(new OrbWeaverNode(canvas.layer, "Insomnium"));
    currentNode = currentNode.addChild(new OrbWeaverNode(canvas.layer, "Gojira"));
    
    console.log('currentNode', currentNode);

    canvas.render(currentNode.getRoot());

    title.innerText = currentNode.name;
});

document.addEventListener("keydown", event => {
    if (event.isComposing || event.keyCode === 229) {
        return;
    }

    const addNode = function() {
        const bandName = prompt("Please enter the band name", "");

        if (bandName == null || bandName == "") {
            errorMsg.innerText = "User cancelled the prompt.";
            errorMsg.style.display = "block";
        } else {
            errorMsg.style.display = "none";
            currentNode.addChild(new OrbWeaverNode(bandName));
            console.log('root', currentNode.getRoot());
        }
    };

    //console.log(event.keyCode);

    switch (event.keyCode) {  
        case constants.ARROW_RIGHT: 
            currentNode = currentNode.moveNext();
            break;
        case constants.ARROW_LEFT:
            currentNode = currentNode.movePrevious();
            break;
        case constants.ARROW_UP:
            currentNode = currentNode.getPreviousSibling();
            break;
        case constants.ARROW_DOWN:
            currentNode = currentNode.getNextSibling();
            break;
        case constants.ENTER:
            addNode();
            break;
        default:
            console.log('unknown key pressed');
            //throw "Unknown key pressed";
    }

    title.innerText = currentNode.name;
});
