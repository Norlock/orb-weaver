import './styles/main.scss';
import { OrbWeaverNode } from './orb-weaver-node.js';
import { constants } from './constants.js';
import { Canvas } from './canvas.js';

const title = document.getElementById('title');
const errorMsg = document.getElementById('error-msg');
const canvas = new Canvas();

let currentNode;
document.addEventListener('DOMContentLoaded', () => {

    // Adding dummy nodes
    currentNode = new OrbWeaverNode("Blut Aus Nord");
    currentNode = currentNode.addChild(new OrbWeaverNode("Be'lakor"));
    currentNode = currentNode.addChild(new OrbWeaverNode("Deathspell Omega"));
    currentNode = currentNode.addChild(new OrbWeaverNode("Drudkh"));

    const urfaust = new OrbWeaverNode("Urfaust");
    urfaust.addChild(new OrbWeaverNode("Ruins of beverast"));
    urfaust.addChild(new OrbWeaverNode("Esoteric"));
    currentNode = currentNode.addChild(urfaust);

    const sunn = new OrbWeaverNode("Sunn O)))");
    sunn.addChild(new OrbWeaverNode("Leprous"));
    sunn.addChild(new OrbWeaverNode("Robbie Basho"));
    currentNode.addChild(sunn);

    currentNode = currentNode.addChild(new OrbWeaverNode("Insomnium"));
    currentNode = currentNode.addChild(new OrbWeaverNode("Gojira"));
    
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
            currentNode = currentNode.movePreviousSibling();
            break;
        case constants.ARROW_DOWN:
            currentNode = currentNode.moveNextSibling();
            break;
        case constants.ENTER:
            addNode();
            break;
        default:
            console.log('unknown key pressed');
            //throw "Unknown key pressed";
    }

    canvas.panCanvas(currentNode);
    //title.innerText = currentNode.name;
});
