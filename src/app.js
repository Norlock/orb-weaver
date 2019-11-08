import './styles/main.scss';
import { OrbWeaverNode } from './orb-weaver-node.js';
import { constants } from './constants.js';
import { Canvas } from './drawing/canvas.js';
import mglaImg from '../assets/mgla.jpg'; 
import urfaustImg from '../assets/urfaust.jpg'; 
import gojiraImg from '../assets/87838-gojira.jpg';

const errorMsg = document.getElementById('error-msg');
const canvas = new Canvas();
const layer = canvas.layer;

let currentNode;
document.addEventListener('DOMContentLoaded', () => {

    // Adding dummy nodes
    currentNode = new OrbWeaverNode(layer, "Blut Aus Nord", urfaustImg);
    
    const urfaust = new OrbWeaverNode(layer, "Urfaust", mglaImg);
    urfaust.addChild(new OrbWeaverNode(layer, "Mgla", mglaImg));

    const esoteric = new OrbWeaverNode(layer, "Esoteric", urfaustImg);
    esoteric.addChild(new OrbWeaverNode(layer, "Ruins of Beverast", mglaImg));

    urfaust.addChild(esoteric);
    currentNode = currentNode.addChild(urfaust);

    const belakor = new OrbWeaverNode(layer, "Be'lakor", urfaustImg);
    belakor.addChild(new OrbWeaverNode(layer, "Imperium Dekadenz", gojiraImg));
    belakor.addChild(new OrbWeaverNode(layer, "Schammasch", mglaImg));
    belakor.addChild(new OrbWeaverNode(layer, "Imperium Dekadenz", gojiraImg));
    belakor.addChild(new OrbWeaverNode(layer, "Imperium Dekadenz", gojiraImg));
    belakor.addChild(new OrbWeaverNode(layer, "Imperium Dekadenz", gojiraImg));
    belakor.addChild(new OrbWeaverNode(layer, "Schammasch", mglaImg));
    belakor.addChild(new OrbWeaverNode(layer, "Schammasch", mglaImg));

    currentNode = currentNode.addChild(new OrbWeaverNode(layer, "Be'lakor", urfaustImg));
    currentNode = currentNode.addChild(belakor);
    currentNode = currentNode.addChild(new OrbWeaverNode(layer, "Drudkh", mglaImg));
    currentNode = currentNode.addChild(new OrbWeaverNode(layer, "Deathspell Omega", mglaImg));
    currentNode = currentNode.addChild(new OrbWeaverNode(layer, "Gojira", gojiraImg));
    currentNode = currentNode.addChild(new OrbWeaverNode(layer, "Be'lakor", urfaustImg));
    currentNode = currentNode.addChild(new OrbWeaverNode(layer, "Be'lakor", urfaustImg));
    currentNode = currentNode.addChild(new OrbWeaverNode(layer, "Drudkh", mglaImg));
    currentNode = currentNode.addChild(new OrbWeaverNode(layer, "Deathspell Omega", mglaImg));
    currentNode = currentNode.addChild(new OrbWeaverNode(layer, "Gojira", gojiraImg));
    currentNode = currentNode.addChild(new OrbWeaverNode(layer, "Drudkh", mglaImg));
    //currentNode = currentNode.addChild(new OrbWeaverNode(layer, "Deathspell Omega", mglaImg));
    //const sunn = new OrbWeaverNode("Sunn O)))", urfaustImg);
    //sunn.addChild(new OrbWeaverNode("Leprous", mglaImg));
    //sunn.addChild(new OrbWeaverNode("Robbie Basho", mglaImg));
    //currentNode.addChild(sunn);

    currentNode = currentNode.addChild(new OrbWeaverNode(layer, "Insomnium", urfaustImg));
    
    currentNode = canvas.render(currentNode);
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

    console.log(event.keyCode);

    switch (event.keyCode) {  
        case constants.EXPAND: 
            currentNode = currentNode.moveNext();
            break;
        case constants.SHRINK:
            currentNode = currentNode.movePrevious();
            break;
        case constants.ARROW_UP:
        case constants.CYCLE_COUNTER_CLOCKWISE:
            currentNode = currentNode.movePreviousSibling();
            break;
        case constants.ARROW_DOWN:
        case constants.CYCLE_CLOCKWISE:
            currentNode = currentNode.moveNextSibling();
            break;
        case constants.ENTER:
            addNode();
            break;
        case constants.HELP:
            // TODO
            break;
        default:
            console.log('unknown key pressed');
            //throw "Unknown key pressed";
    }

    canvas.panCanvas(currentNode);
});
