import {Color} from 'three';
import {showSetShipsBtn} from '../view/setShipBtn';
import {plane} from '../helpers/mesh/plane';
import {firstSetWater, secondSetWater} from '../view/waterGeometry';
import {getPlayer, setPlayer} from '../storage/player';
import {setStage} from '../storage/stage';
import setedShipsPos from '../storage/setedShipsPos';
import camera from '../helpers/initial/camera';
import {disableShipsIntersects} from '../view/ships';
import gsap from 'gsap';

const body = document.querySelector('body');
const playerTitle = document.querySelector('.player-title');
const setShips = document.querySelector('.set-btn');
let shipsZone = [];
let curentShip, curWater, intersect;
const config = {
    color: new Color('green'),
    opacity: 0.1,
    transparent: true
};

const addDiscription = (PlayerNumber) => {
    const element = `<h1 class="player-title"> ${PlayerNumber} player set ships!</h1>`;
    body.insertAdjacentHTML( 'beforeend', element );
};
addDiscription(getPlayer());
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
            if (y >= -1.5) {
                return true;
            }
        } else if (isTurned) {
            if (x >= -1.5) {
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
                    shipPosConf.position.x,
                    shipPosConf.position.y + 0.5
                ),
                addPos(
                    shipPosConf.position.x,
                    shipPosConf.position.y - 0.5
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
    let positions = [];
    let position;
    shipsZone.forEach(shipZone => {
        shipZone[1].forEach(pos => {
            position = `${pos.x}:${pos.y}`;
            positions.push(position);
        });
    });
    let unique = [...new Set(positions)];
    // console.log(positions, positions.length, unique.length, turn);
    if (unique.length === 7) {
        let counter = 0;
        unique.forEach(
            el => {
                el.split(':')
                    .forEach(pos => {
                        isNaN(Number(pos)) ?
                            counter++ : counter;
                        // console.log(counter);
                    });
            });
        if (counter === 0) {
            showSetShipsBtn(setShips);
        }
    }
    positions.length === unique.length ?
        intersect = true : intersect = false;
    return intersect;
};

const lightShipZone = () => {
    shipsZone.forEach(shipsZone => {
        shipsZone[1].forEach(pos => {
            const shipLight = plane(1, 1, config);
            shipLight.position.set(pos.x, pos.y, pos.z);
            curWater.add(shipLight);
        });
    })
};

const navigateShipZone = async () => {
    let tween
    if (getPlayer() === 'first') {
        tween = gsap.to(camera.position,
            {delay: 1, duration: 2, ease: "elastic", x: 15});
        await tween.play();
        showSetShipsBtn(setShips);
    } else {
        disableShipsIntersects();
        setShips.classList.add('hidden');
        tween = gsap.to(camera.position,
            {delay: 1, duration: 2, ease: "elastic", x: 0, z: 14});
        await tween.play();
        setStage('game');
    }
}

const onSetShipsSetBtn = async () => {
    if (getPlayer() === 'first') {
        curWater = firstSetWater;
        setedShipsPos.firstPlayer = shipsZone;
        lightShipZone();
        await navigateShipZone();
        setPlayer('second');
    } else {
        curWater = secondSetWater;
        setedShipsPos.secondPlayer = shipsZone;
        lightShipZone();
        await navigateShipZone();
        setPlayer('first');
    }
    console.log(playerTitle);
    addDiscription(getPlayer());
    shipsZone = [];
    console.log(setedShipsPos, getPlayer());
}


setShips.addEventListener('click', onSetShipsSetBtn);


