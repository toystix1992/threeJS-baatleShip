import {firstGameWater, secondGameWater} from '../view/waterGeometry';
import {firstGameGround, secondGameGround} from '../view/ground';
import {getPlayer, setPlayer} from '../storage/player';
import {getStage} from '../storage/stage';
import {gameIntersect} from '../helpers/intersect';
import {plane} from '../helpers/mesh/plane';
import {navigateGameZone} from '../controller/gameController';
import setedShipsPos from '../storage/setedShipsPos';
import {hitCounter} from '../controller/domManipulaton';

const shipsCounter = document.querySelector('.ships-counter');
let intersect;
let isClickEnable = true;


export const gamePage = (scene) => {
    scene.add(firstGameGround);
    scene.add(secondGameGround);
    scene.add(firstGameWater);
    scene.add(secondGameWater);
    // firstGameGround.add(aim);
};
export const getShipsInGame = () => {
    shipsCounter.classList.remove('counter-hide');
    setedShipsPos.secondPlayer.forEach(ship => {
        ship[1].forEach((pos) => {
            const redPlane = plane(0.9, 0.9, {
                color: 0xff0000,
                opacity: 0,
                transparent: true
            });
            redPlane.name = ship[0];
            redPlane.position.set(
                pos.x,
                pos.y,
                pos.z + 0.1
            );
            firstGameGround.add(redPlane);
        });
    });
    setedShipsPos.firstPlayer.forEach(ship => {
        ship[1].forEach(pos => {
            const redPlane = plane(0.9, 0.9, {
                color: 0xff0000,
                opacity: 0,
                transparent: true
            });
            redPlane.name = ship[0];
            redPlane.position.set(
                pos.x,
                pos.y,
                pos.z +0.1
            );
            secondGameGround.add(redPlane);
        });
    });
};
const findGroundIntersecnts = async () => {
    if (getStage() === 'game') {
        intersect = gameIntersect();
        if (intersect.length > 0 && !intersect[0].object.isClicked && isClickEnable) {
            intersect[0].object.isClicked = true;
            intersect[0].object.material.opacity = 1;
            hitCounter(getPlayer(), intersect[0].object.name);
            if(intersect[0].object.name.length < 3) {
                isClickEnable = false;
                await navigateGameZone();
                hitCounter(getPlayer(), intersect[0].object.name);
                isClickEnable = true;
            }
        }
    }
};

document.addEventListener('pointerdown', findGroundIntersecnts);


// const bias = {
//     playerOne: {
//         biasX: 0,
//         biasZ: 10
//     },
//     playerTwo: {
//         biasX: 10,
//         biasZ: 10
//     }
// }