import {water, newWater} from '../view/waterGeometry';
import {ground, newGround} from '../view/ground';
import {ships} from '../view/ships';
const body = document.querySelector('body');
let playerTitile = null;


const addDiscription = (PlayerNumber) => {
    const element = `<h1 class="player-title"> Player ${PlayerNumber}</h1>`;
    body.insertAdjacentHTML( 'beforeend', element );
};

export const settingPage = (scene) => {
    addDiscription('1');
    //first player
    scene.add(ground);
    scene.add(newGround);
    //second player
    scene.add(water);
    scene.add(newWater);
    //model
    ships();
};


