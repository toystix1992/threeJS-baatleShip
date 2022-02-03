import {water, newWater} from '../view/waterGeometry';
import {ground, newGround} from '../view/ground';
import {ships} from '../view/ships';
import {getPlayer} from '../storage/player';
const body = document.querySelector('body');

const addDiscription = (PlayerNumber) => {
    const element = `<h1 class="player-title"> Player ${PlayerNumber}</h1>`;
    body.insertAdjacentHTML( 'beforeend', element );
};
const turnShipBtn = () => {
    const element = `<span class='start-btn'>turn ship</span>`;
    body.insertAdjacentHTML( 'beforeend', element );
};

export const settingPage = (scene) => {
    addDiscription(getPlayer());
    turnShipBtn();
    //first player
    scene.add(ground);
    scene.add(newGround);
    //second player
    scene.add(water);
    scene.add(newWater);
    //model
    ships();
};


