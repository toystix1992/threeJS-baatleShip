import { TextureLoader } from 'three';
import {firstGameWater, secondGameWater} from '../view/waterGeometry';
import {firstGameGround, secondGameGround} from '../view/ground';
import {getPlayer, setPlayer} from '../storage/player';
import {getStage} from '../storage/stage';
import { gameIntersect } from '../helpers/intersect';
import { plane } from '../helpers/mesh/plane';
import setedShipsPos from '../storage/setedShipsPos';
//import {shoots} from '../storage/gameStarage';

let biasX, biasZ, intersect;
const texture = new TextureLoader()
.load('textures/buttons/aim.png');
const aim = plane(1, 1, {map: texture});
aim.position.set(0.5, 0.5, 0.01);

export const gamePage = (scene) => {
    //ground
    scene.add(firstGameGround);
    scene.add(secondGameGround);
    //water
    scene.add(firstGameWater);
    scene.add(secondGameWater);
    //aim
    firstGameGround.add(aim);
};

const findWaterIntersecnts = () => {
    if(getStage() === 'game') {
        if(getPlayer() === 'first') {
            biasX = 0;
            biasZ = 10;
        } else {
            biasX = 10;
            biasZ = 10;
        }
        console.log(setedShipsPos);
        intersect = gameIntersect();
        if(intersect.length > 0) {
            console.log(intersect[0].point);
        }
    }
};

document.addEventListener('pointerdown', findWaterIntersecnts);












// const moveAim = (e) => {
//     if (checkFieldBorders(aim, e.code)) {
//         if (e.code === 'KeyD') {
//             aim.position.x = aim.position.x += 1;
//         } else if (e.code === 'KeyA') {
//             aim.position.x = aim.position.x -= 1;
//         } else if (e.code === 'KeyW') {
//             aim.position.y = aim.position.y += 1;
//         } else if (e.code === 'KeyS') {
//             aim.position.y = aim.position.y -= 1;
//         }
//     }
//     if (e.code === 'KeyE') {
//         if (shoot(aim.position, player)) {
//             if(player === 'first') {
//                 shoots.firs.hit.push(aim.position);
//             } else {
//                 shoots.second.hit.push(aim.position);
//             }
//             const redPlane = plane(0.9, 0.9, {
//                 color: 0xff0000
//             });
//             firstSetGround.add(redPlane);
//             redPlane.position.x = aim.position.x;
//             redPlane.position.y = aim.position.y;
//             redPlane.position.z = aim.position.z;
//             console.log(firstSetGround);
//         } else {
//             const whitePlane = plane(0.9, 0.9, {
//                 color: 0xffffffff
//             });
//             whitePlane.position.x = aim.position.x;
//             whitePlane.position.y = aim.position.y;
//             whitePlane.position.z = aim.position.z;
//             firstSetGround.add(whitePlane);
//             // alert('мимо!!!')
//             // if(player === 'first') {
//             //     shoots.firs.miss.push(aim.position);
//             //     getPage('gameTwo');
//             // } else {
//             //     shoots.second.miss.push(aim.position);
//             //     getPage('gameOne');
//             // }
//             // ground.remove.apply(ground, ground.children);
//             // prevShots(player);
//         }
//         console.log(player, shoots);
//     }
// };

// document.addEventListener('keypress', moveAim);
