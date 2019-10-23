import { Node } from './node.js';

document.addEventListener('DOMContentLoaded', (event) => {
    //the event occurred
    const element = document.getElementById('node-container');
    const list = new Node("Blut Aus Nord");
    list.append(new Node("Deathspell Omega"));
    list.append(new Node("Drudkh"));
    list.append(new Node("Urfaust"));
    list.append(new Node("Sunn O)))"));
    list.append(new Node("Insomnium"));

    list.removeAt(3);
    const node = list.getAt(4)
    console.log('node: ' + node.name + ' previous: ' + node.previous.name);
    element.innerText = list.print();

    //return element;
});
