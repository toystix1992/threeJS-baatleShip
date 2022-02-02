import {water, neWater} from '../view/waterGeometry';
import {ground} from '../view/ground';
import { TextureLoader } from 'three';
import { checkFieldBorders, shoot, prevShots } from '../controller/gameController';
import getPage from '../storage/getPage';
import {shoots} from '../storage/gameStarage';
import { plane } from '../helpers/mesh/plane';

let player = null;
let keyAble = false;

const texture = new TextureLoader()
.load('textures/buttons/aim.png');
const aim = plane(1, 1, {map: texture});
aim.position.set(0.5, 0.5, 0.01);

export const gamePage = (scene) => {
    player = 'first';
    console.log('first player game');
    // const playerTitile = document.querySelector('.player-title');
    // playerTitile.textContent = 'Player 1 game';
    //ground
    scene.add(ground);
    console.log(ground);
    //water
    scene.add(water);
    //aim
    water.add(aim);
};

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
        if (shoot(aim.position, player)) {
            if(player === 'first') {
                shoots.firs.hit.push(aim.position);
            } else {
                shoots.second.hit.push(aim.position);
            }
            const redPlane = plane(0.9, 0.9, {
                color: 0xff0000
            });
            ground.add(redPlane);
            redPlane.position.x = aim.position.x;
            redPlane.position.y = aim.position.y;
            redPlane.position.z = aim.position.z;
            console.log(ground);
        } else {
            const whitePlane = plane(0.9, 0.9, {
                color: 0xffffffff
            });
            whitePlane.position.x = aim.position.x;
            whitePlane.position.y = aim.position.y;
            whitePlane.position.z = aim.position.z;
            ground.add(whitePlane);
            // alert('мимо!!!')
            // if(player === 'first') {
            //     shoots.firs.miss.push(aim.position);
            //     getPage('gameTwo');
            // } else {
            //     shoots.second.miss.push(aim.position);
            //     getPage('gameOne');
            // }
            // ground.remove.apply(ground, ground.children);
            // prevShots(player);
        }
        console.log(player, shoots);
    }
};

document.addEventListener('keypress', moveAim);
