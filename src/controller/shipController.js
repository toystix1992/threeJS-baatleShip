import scene from "../helpers/initial/scene";
import { Color } from 'three';
import { water, newWater } from '../view/waterGeometry';
import { plane } from '../helpers/mesh/plane';
import setedShipsPos from '../storage/setedShipsPos';
import getPage from '../storage/getPage';
import gsap from 'gsap';

let shipsZone = [];
let curentShip;
let player = 1;
const config = {
    color: new Color('green'),
    opacity: 0.1,
    transparent: true
};

export const checkFieldBorders = (choosenShip, x, y, isTurned) => {
    if (
        choosenShip.name === 'smallShipOne' ||
        choosenShip.name === 'smallShipTwo') {
        if (x <= 2.5 && y <= 2.5 && x >= -2.5 && y >= -2.5) {
            return true;
        } else {
            return false;
        }
    } else if (choosenShip.name === 'mediumShip') {
        if (!isTurned) {
            if (x <= 2 && y <= 2.5 && x >= -2 && y >= -2.5) {
                return true;
            } else {
                return false;
            }
        } else if (isTurned) {
            if (x <= 2.5 && y <= 2 && x >= -2.5 && y >= -2) {
                return true;
            } else {
                return false;
            }
        }
    } else if (choosenShip.name === 'largeShip') {
        if (!isTurned) {
            if (x <= 1.5 && y <= 2.5 && x >= -1.5 && y >= -2.5) {
                return true;
            } else {
                return false;
            }
        } else if (isTurned) {
            if (x <= 2.5 && y <= 1.5 && x >= -2.5 && y >= -1.5) {
                return true;
            } else {
                return false;
            }
        }
    }
};

export const checkRotateEnable = (choosenShip, x, y, isTurned) => {
    if (!choosenShip) return;
    if (choosenShip.name === 'smallShipOne' ||
        choosenShip.name === 'smallShipTwo') {
        return true;
    } else if (choosenShip.name === 'largeShip') {
        if (
            x <= 1.5 && x >= -1.5 &&
            y <= 1.5 && y >= -1.5
        ) {
            return true;
        }
    } else if (choosenShip.name === 'mediumShip') {
        if (!isTurned) {
            if (y <= 1.5) {
                return true;
            }
        } else if (isTurned) {
            if (x <= 1.5) {
                return true;
            }
        }

    }

};
const addPos = (x, y) => {
    return {
        x: x,
        y: y,
        z: 0.01
    };
};
export const checkShipsIntersections = (shipPosConf, turn) => {
    let intersect = null;
    curentShip = shipPosConf.name;
    if (curentShip === 'largeShip') {
        !turn ?
            shipsZone[0] = [
                curentShip,
                [
                    addPos(
                        shipPosConf.position.x - 1,
                        shipPosConf.position.y
                    ),
                    addPos(
                        shipPosConf.position.x,
                        shipPosConf.position.y
                    ),
                    addPos(
                        shipPosConf.position.x + 1,
                        shipPosConf.position.y
                    )
                ]] :
            shipsZone[0] = [
                curentShip,
                [
                    addPos(
                        shipPosConf.position.x,
                        shipPosConf.position.y - 1
                    ),
                    addPos(
                        shipPosConf.position.x,
                        shipPosConf.position.y
                    ),
                    addPos(
                        shipPosConf.position.x,
                        shipPosConf.position.y + 1
                    )
                ]];
    } else if (curentShip === 'mediumShip') {
        !turn ? shipsZone[1] = [
            curentShip,
            [
                addPos(
                    shipPosConf.position.x - 0.5,
                    shipPosConf.position.y
                ),
                addPos(
                    shipPosConf.position.x + 0.5,
                    shipPosConf.position.y
                )
            ]] : shipsZone[1] = [
                curentShip,
                [
                    addPos(
                        shipPosConf.position.x - 0.5,
                        shipPosConf.position.y
                    ),
                    addPos(
                        shipPosConf.position.x - 0.5,
                        shipPosConf.position.y + 1
                    )
                ]];
    } else if (curentShip === 'smallShipOne') {
        shipsZone[2] = [
            curentShip,
            [
                addPos(
                    shipPosConf.position.x,
                    shipPosConf.position.y
                )
            ]];
    } else if (curentShip === 'smallShipTwo') {
        shipsZone[3] = [
            curentShip,
            [
                addPos(
                    shipPosConf.position.x,
                    shipPosConf.position.y
                )
            ]];
    }
    const prevPositions = [];
    const curPositions = [];
    let prevPos, curPos;
    shipsZone.forEach(shipZone => {
        shipZone[1].forEach(pos => {
            if (shipZone[0] === curentShip) {
                curPos = `${pos.x}:${pos.y}`;
                curPositions.push(curPos);
            } else {
                prevPos = `${pos.x}:${pos.y}`;
                prevPositions.push(prevPos);
            }
        });
    });
    curPositions.forEach(current => {
        if (prevPositions.length === 0) {
            intersect = true;
        } else {
            console.log(prevPos.includes(current));
            if (!prevPos.includes(current)) {
                intersect = true;
            } else {
                intersect = false;
            }
        }

    });
    console.log(curPositions, prevPositions, turn);
    return intersect;
};














// const lightShipZone = () => {
//     shipZone[1].forEach(pos => {
//         const shipLight = plane(1, 1, config);
//         shipLight.position.set(pos.x, pos.y, pos.z);
//         water.add(shipLight);
//     });
//     navigateShipZone();
// };

// const navigateShipZone = async () => {
//     let tween
//     if (shipsZone.length === 4 && player === 1) {
//         tween = gsap.to(scene.position, { duration: 1, ease: "elastic", x: 7 });
//         setedShipsPos.firstPlayer = shipsZone;
//         shipsZone = [];
//         player = 2;
//         await tween.play();
//         water.remove.apply(water, water.children);
//         getPage('settingTwo');
//         tween.reverse();
//     } else if (shipsZone.length === 4 && player === 2) {
//         setedShipsPos.secondPlayer = shipsZone;
//         console.log(setedShipsPos);
//         shipsZone = [];
//         player = 2;
//         water.remove.apply(water, water.children);
//         getPage('gameOne');
//     }
// }

