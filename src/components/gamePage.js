import water from '../view/waterGeometry';
import ground from '../view/ground';
import { TextureLoader } from 'three';
import { plane } from '../helpers/mesh/plane';
import {checkFieldBorders} from '../controller/gameController';

const texture = new TextureLoader()
    .load('textures/buttons/aim.png');
const aim = plane(1, 1, {
    map: texture,
    color: '#ffffff'
});
aim.position.set(0.5, 0.5, 0.1);

const moveAim = (e) => {
    console.log(e.keyCode);
    if (checkFieldBorders(aim, e.code)) {
        if (e.code === 'KeyD') {
            aim.position.x += 1;
        } else if (e.code === 'KeyA') {
            aim.position.x -= 1;
        } else if (e.code === 'KeyW') {
            aim.position.y += 1;
        } else if (e.code === 'KeyS') {
            aim.position.y -= 1;
        }
    }
};


export const gamePageOne = (scene) => {
    const playerTitile= document.querySelector('.player-title');
    playerTitile.textContent = 'Player 1 game';
    //ground
    scene.add(ground);
    //water
    scene.add(water);
    //aim
    water.add(aim);

};
export const gamePageTwo = (scene) => {
    const playerTitile= document.querySelector('.player-title');
    playerTitile.textContent = 'Player 2 game';
    //ground
    scene.add(ground);
    //water
    scene.add(water);
};


document.addEventListener('keypress', moveAim);
