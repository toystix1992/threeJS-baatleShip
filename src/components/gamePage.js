import water from '../view/waterGeometry';
import ground from '../view/ground';
import { TextureLoader } from 'three';
import { checkFieldBorders, shoot, prevShots } from '../controller/gameController';
import getPage from '../storage/getPage';
import {shoots} from '../storage/gameStarage';
import { plane } from '../helpers/mesh/plane';

let player = null;
let keyAble = false;

export const gamePageOne = (scene) => {
    player = 'first';
    prevShots(player);
    // const playerTitile = document.querySelector('.player-title');
    // playerTitile.textContent = 'Player 1 game';
    //ground
    scene.add(ground);

    //water
    scene.add(water);
    //aim
    water.add(aim);

};
export const gamePageTwo = (scene) => {
    player = 'second';
    // const playerTitile = document.querySelector('.player-title');
    // playerTitile.textContent = 'Player 2 game';
    //ground
    scene.add(ground);
    //water
    scene.add(water);
};


const texture = new TextureLoader()
.load('textures/buttons/aim.png');
const aim = plane(1, 1, {map: texture});
aim.position.set(0.5, 0.5, 0.01);

const moveAim = (e) => {
    if (checkFieldBorders(aim, e.code)) {
        if (e.code === 'KeyD') {
            aim.position.x = aim.position.x += 1;
        } else if (e.code === 'KeyA') {
            aim.position.x = aim.position.x -= 1;
        } else if (e.code === 'KeyW') {
            aim.position.y = aim.position.y += 1;
        } else if (e.code === 'KeyS') {
            aim.position.y = aim.position.y -= 1;
        }
    }
    if (e.code === 'KeyE') {
        shoot(aim.position, player);
        if (shoot(aim.position, player)) {
            shoots.firs.hit.push(aim.position);
        } else {
            shoots.firs.miss.push(aim.position);

        }
    }
};

document.addEventListener('keypress', moveAim);
