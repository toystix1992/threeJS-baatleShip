import getGLTFModel from '../helpers/loaders/gltfLoader';
import { firstSetWater, secondSetWater } from './waterGeometry';
import { shipsIntersect } from '../helpers/intersect';
import { checkShipsIntersections, checkFieldBorders, checkRotateEnable }
    from '../controller/shipController';
import { initialShipPos } from '../config/config';
import { getPlayer, setPlayer } from '../storage/player';
import { clock } from '../helpers/time';

let x, y;
let choosenShip = null;
let intersect, newShipPos, shipPosConf, bias;
let ismouseDown = false;
let elTime = null;

export const ships = () => {
    getGLTFModel(['ships/large.gltf', 'ships/medium.gltf', 'ships/small.gltf', 'ships/small.gltf']).
        then((gltfs) => {
            gltfs[0].scene.name = 'largeShip';
            gltfs[1].scene.name = 'mediumShip';
            gltfs[2].scene.name = 'smallShipOne';
            gltfs[3].scene.name = 'smallShipTwo';
            gltfs.forEach((gltf) => {
                gltf.scene.turn = false;
                gltf.scene.rotation.x = Math.PI / 2;
                gltf.scene.rotation.y = Math.PI / 2;
                if (gltf.scene.name === 'largeShip') {
                    gltf.scene.scale.set(0.6, 0.5, 0.5);
                    gltf.scene.position.set(
                        initialShipPos.large.x,
                        initialShipPos.large.y,
                        initialShipPos.large.z
                    );
                } else if (gltf.scene.name === 'mediumShip') {
                    gltf.scene.scale.set(0.5, 0.4, 0.4);
                    gltf.scene.position.set(
                        initialShipPos.medium.x,
                        initialShipPos.medium.y,
                        initialShipPos.medium.z
                    );
                } else {
                    gltf.scene.scale.set(1, 1, 1);
                    if (gltf.scene.name === 'smallShipOne') {
                        gltf.scene.position.set(
                            initialShipPos.smallOne.x,
                            initialShipPos.smallOne.y,
                            initialShipPos.smallOne.z
                        );
                    } else if (gltf.scene.name === 'smallShipTwo') {
                        gltf.scene.position.set(
                            initialShipPos.smallTwo.x,
                            initialShipPos.smallTwo.y,
                            initialShipPos.smallTwo.z
                        );
                    }
                }
                const cloneShips = gltf.scene.clone();
                firstSetWater.add(gltf.scene);
                secondSetWater.add(cloneShips);
            });
        });
};
const chooseShip = () => {
    getPlayer() === 'first'?
        bias = 0 : bias = 15;
    clock.start();
    ismouseDown = true;
    intersect = shipsIntersect();
    if (intersect.length > 1) {
        choosenShip = intersect[0].object.parent.parent;
    }
};
const getNewShipPos = () => {
    intersect = shipsIntersect();
    if (intersect.length === 1 && ismouseDown && choosenShip) {
        newShipPos = intersect[0].point;
        choosenShip.position.set(
            newShipPos.x - bias,
            -newShipPos.z,
            choosenShip.position.z
        );
    }
};
const setNewShipPos = () => {
    if (newShipPos && choosenShip) {
        if (
            choosenShip.name === 'largeShip' ||
            choosenShip.name === 'smallShipOne' ||
            choosenShip.name === 'smallShipTwo'
        ) {
            ((Math.round((newShipPos.x - bias) * 2) / 2) ^ 0) === Math.round((newShipPos.x- bias) * 2) / 2 ?
                x = Math.round((newShipPos.x- bias) * 2) / 2 - 0.5 :
                x = Math.round((newShipPos.x- bias) * 2) / 2;
            ((Math.round((newShipPos.z) * 2) / 2) ^ 0) === Math.round((newShipPos.z) * 2) / 2 ?
                y = Math.round((-newShipPos.z) * 2) / 2 + 0.5 :
                y = Math.round((-newShipPos.z) * 2) / 2;
        } else if (choosenShip.name === 'mediumShip') {
            if (!choosenShip.turn) {
                ((Math.round((newShipPos.x- bias) * 2) / 2) ^ 0) === Math.round((newShipPos.x- bias) * 2) / 2 ?
                    x = Math.round((newShipPos.x- bias) * 2) / 2 :
                    x = Math.round((newShipPos.x- bias) * 2) / 2 - 0.5;
                ((Math.round((newShipPos.z) * 2) / 2) ^ 0) === Math.round((newShipPos.z) * 2) / 2 ?
                    y = Math.round((-newShipPos.z) * 2) / 2 + 0.5 :
                    y = Math.round((-newShipPos.z) * 2) / 2;
            } else {
                ((Math.round((newShipPos.x- bias) * 2) / 2) ^ 0) === Math.round((newShipPos.x) * 2) / 2 ?
                    x = Math.round((newShipPos.x- bias) * 2) / 2 - 0.5 :
                    x = Math.round((newShipPos.x- bias) * 2) / 2;
                ((Math.round((newShipPos.z) * 2) / 2) ^ 0) === Math.round((newShipPos.z) * 2) / 2 ?
                    y = Math.round((-newShipPos.z) * 2) / 2 :
                    y = Math.round((-newShipPos.z) * 2) / 2 + 0.5;
            }
        }
        shipPosConf = {
            name: choosenShip.name,
            position: {
                x: x,
                y: y
            }
        };
        if (
            checkFieldBorders(choosenShip, x, y, choosenShip.turn) &&
            checkShipsIntersections(shipPosConf, choosenShip.turn)
        ) {
            // console.log('move', x, y);
            choosenShip.position.set(x, y, choosenShip.position.z);
        } else {
            alert('ship intersect!');
            choosenShip.rotation.set(Math.PI / 2, Math.PI / 2, 0);
            choosenShip.turn = false;
            if (choosenShip.name === 'smallShipOne') {
                choosenShip.position.set(
                    initialShipPos.smallOne.x,
                    initialShipPos.smallOne.y,
                    initialShipPos.smallOne.z
                );
            } else if (choosenShip.name === 'smallShipTwo') {
                choosenShip.position.set(
                    initialShipPos.smallTwo.x,
                    initialShipPos.smallTwo.y,
                    initialShipPos.smallTwo.z
                );
            } else if (choosenShip.name === 'mediumShip') {
                choosenShip.position.set(
                    initialShipPos.medium.x,
                    initialShipPos.medium.y,
                    initialShipPos.medium.z
                );
            } else if (choosenShip.name === 'largeShip') {
                choosenShip.position.set(
                    initialShipPos.large.x,
                    initialShipPos.large.y,
                    initialShipPos.large.z
                );
            }
            shipPosConf = {
                name: choosenShip.name,
                position: {
                    x: Math.random().toString(36).substring(7),
                    y: Math.random().toString(36).substring(7)
                }
            };
            checkShipsIntersections(shipPosConf, choosenShip.turn);
        }
    }
    choosenShip = null;
};
const turnShip = () => {
    if(!choosenShip) return;
    if (checkRotateEnable(choosenShip, x, y, choosenShip.turn)) {
        if (!choosenShip) return;
        if (choosenShip.name === 'mediumShip') {
            if (choosenShip.turn) {
                choosenShip.rotation.y += Math.PI / 2;
                choosenShip.position.x -= 0.5;
                choosenShip.position.y += 0.5;
                choosenShip.turn = false;
            } else {
                choosenShip.rotation.y -= Math.PI / 2;
                choosenShip.position.x += 0.5;
                choosenShip.position.y -= 0.5;
                choosenShip.turn = true;
            }
        } else {
            if (choosenShip.turn) {
                choosenShip.rotation.y += Math.PI / 2;
                choosenShip.turn = false;
            } else {
                choosenShip.rotation.y -= Math.PI / 2;
                choosenShip.turn = true;
            }
        }
        setNewShipPos();
    }
};
const turnMoveToggle = () => {
    clock.stop();
    elTime = clock.elapsedTime;
    elTime < 0.25 ?
        turnShip() : setNewShipPos();
    choosenShip = null;
};
export const disableShipsIntersects = () => {
    document.removeEventListener('pointerdown', chooseShip);
    document.removeEventListener('pointermove', getNewShipPos);
    document.removeEventListener('pointerup', turnMoveToggle);
}

document.addEventListener('pointerdown', chooseShip);
document.addEventListener('pointermove', getNewShipPos);
document.addEventListener('pointerup', turnMoveToggle);

