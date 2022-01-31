import water from '../view/waterGeometry';
import ground from '../view/ground';
import {ships} from '../view/ships';
const body = document.querySelector('body');

const addDiscription = (PlayerNumber) => {
    const element = `<h1 class="player-discr"> Player ${PlayerNumber} </h1>`;
    body.insertAdjacentHTML( 'beforeend', element );
}

export const settingPageOne = (scene) => {
    addDiscription('1');
    //ground
    scene.add(ground);
    //water
    scene.add(water);
    //model
    ships();
}

export const settingPageTwo = (scene) => {
    addDiscription('2');
    //ground
    scene.add(ground);
    //water
    scene.add(water);
    //model
    ships();
};
