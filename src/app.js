import './styles/main.scss';
import { OrbWeaverNode } from './orb-weaver-node.js';
import { constants } from './constants.js';

let currentNode = new OrbWeaverNode("Blut Aus Nord");
const listContainer = document.getElementById('node-list-container');
const list = document.getElementById('ow-list');
const title = document.getElementById('title');
const errorMsg = document.getElementById('error-msg');

document.addEventListener('DOMContentLoaded', (event) => {
    // Adding dummy nodes
    currentNode = currentNode.add(new OrbWeaverNode("Be'lakor"));
    currentNode = currentNode.add(new OrbWeaverNode("Deathspell Omega"));
    currentNode = currentNode.add(new OrbWeaverNode("Drudkh"));
    currentNode = currentNode.add(new OrbWeaverNode("Urfaust"));
    currentNode = currentNode.add(new OrbWeaverNode("Sunn O)))"));
    currentNode = currentNode.add(new OrbWeaverNode("Insomnium"));
    currentNode = currentNode.add(new OrbWeaverNode("Gojira"));
    
    console.log('currentNode', currentNode);

    render(currentNode.getRoot());
});

document.addEventListener("keydown", event => {
    let iterateNode = currentNode;
    if (event.isComposing || event.keyCode === 229) {
        return;
    }

    const append = function() {
        const bandName = prompt("Please enter the band name", "");

        if (bandName == null || bandName == "") {
            errorMsg.innerText = "User cancelled the prompt.";
            errorMsg.style.display = "block";
        } else {
            errorMsg.style.display = "none";
            currentNode = currentNode.prepend(new OrbWeaverNode(bandName));
            list.insertBefore(currentNode.element, currentNode.next.element)
        }
    };

    console.log(event.keyCode);

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
            append();
            break;
        default:
            console.log('unknown key pressed');
            //throw "Unknown key pressed";
    }

});

function render(root) {  
    title.innerText = currentNode.name;
    root.render(list);
}
