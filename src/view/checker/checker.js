import { Color } from 'three';
import water from '../waterGeometry';
import { plane } from '../../helpers/mesh/plane';

const config = {
    color: new Color('green'),
    opacity: 0.1,
    transparent: true
}
const largeShipHor = plane(3, 1, config);
const largeShipVert = plane(1, 3, config);
const mediumShipHor = plane(2, 1, config);
const mediumShipVert = plane(1, 2, config);
const smallShipFirst = plane(1, 1, config);
const smallShipSec = plane(1, 1, config);

export const lightShipZone = (shipPosConf) => {
    if (shipPosConf.name === 'largeShip') {
        if (!shipPosConf.turn) {
            largeShipHor.position.x = shipPosConf.pos.x;
            largeShipHor.position.y = shipPosConf.pos.y;
            largeShipHor.position.z = 0.01;
            largeShipHor.renderOrder = 1;
            water.add(largeShipHor);
            console.log(largeShipHor);
        } else {
            largeShipVert.position.x = shipPosConf.pos.x;
            largeShipVert.position.y = shipPosConf.pos.y;
            largeShipVert.position.z = 0.01;
            water.add(largeShipVert);
            console.log(largeShipVert.position, largeShipVert.geometry.parameters);
        }
    }
    else if (shipPosConf.name === 'mediumShip') {
        if (!shipPosConf.turn) {
            mediumShipHor.position.x = shipPosConf.pos.x;
            mediumShipHor.position.y = shipPosConf.pos.y;
            mediumShipHor.position.z = 0.01;
            water.add(mediumShipHor);
        } else {
            mediumShipVert.position.x = shipPosConf.pos.x;
            mediumShipVert.position.y = shipPosConf.pos.y;
            mediumShipVert.position.z = 0.01;
            water.add(mediumShipVert);
        }
    } else if (shipPosConf.name === 'smallShipOne') {
        smallShipFirst.position.x = shipPosConf.pos.x;
        smallShipFirst.position.y = shipPosConf.pos.y;
        smallShipFirst.position.z = 0.01;
        water.add(smallShipFirst);
    } else if (shipPosConf.name === 'smallShipTwo') {
        smallShipSec.position.x = shipPosConf.pos.x;
        smallShipSec.position.y = shipPosConf.pos.y;
        smallShipSec.position.z = 0.01;
        water.add(smallShipSec);
    }
};

export const checkFieldBorders = (choosenShip, keyCode, isTurned) => {
    if (keyCode === 'KeyD') {
        if (choosenShip.name === 'smallShipOne' ||
            choosenShip.name === 'smallShipTwo') {
            if (choosenShip.position.x > 1.5) {
                return false;
            } else {
                return true;
            }
        } else if (
            choosenShip.name === 'largeShip' ||
            choosenShip.name === 'mediumShip') {
            if (!isTurned) {
                if (choosenShip.position.x > 1) {
                    return false;
                } else {
                    return true;
                }
            } else if (isTurned) {
                if (choosenShip.position.x > 1.5) {
                    return false;
                } else {
                    return true;
                }
            }
        }
    }
    if (keyCode === 'KeyA') {
        if (choosenShip.name === 'smallShipOne' ||
            choosenShip.name === 'smallShipTwo') {
            if (choosenShip.position.x < -1.5) {
                return false;
            } else {
                return true;
            }
        } else if (
            choosenShip.name === 'largeShip' ||
            choosenShip.name === 'mediumShip') {
            if (!isTurned) {
                if (choosenShip.position.x < -1) {
                    return false;
                } else {
                    return true;
                }
            } else if (isTurned) {
                if (choosenShip.position.x < -1.5) {
                    return false;
                } else {
                    return true;
                }
            }
        }
    }
    if (keyCode === 'KeyW') {
        if (choosenShip.name === 'smallShipOne' ||
            choosenShip.name === 'smallShipTwo') {
            if (choosenShip.position.y > 1.5) {
                return false;
            } else {
                return true;
            }
        } if (
            choosenShip.name === 'largeShip' ||
            choosenShip.name === 'mediumShip') {
            if (isTurned) {
                if (choosenShip.position.y > 1) {
                    return false;
                } else {
                    return true;
                }
            } else if (!isTurned) {
                if (choosenShip.position.y > 1.5) {
                    return false;
                } else {
                    return true;
                }
            }
        }
    }
    if (keyCode === 'KeyS') {
        if (choosenShip.name === 'smallShipOne' ||
            choosenShip.name === 'smallShipTwo') {
            if (choosenShip.position.y < -1.5) {
                return false;
            } else {
                return true;
            }
        } else if (
            choosenShip.name === 'largeShip' ||
            choosenShip.name === 'mediumShip') {
            if (isTurned) {
                if (choosenShip.position.y < -1) {
                    return false;
                } else {
                    return true;
                }
            } else if (!isTurned) {
                if (choosenShip.position.y < -1.5) {
                    return false;
                } else {
                    return true;
                }
            }
        }
    }
};

export const checkRotateEnable = (choosenShip, isTurned) => {
    if (choosenShip.name === 'smallShipTwo' ||
        choosenShip.name === 'smallShipTwo') {
        return true;
    } else if (choosenShip.name === 'largeShip') {
        if (choosenShip.position.x === 2.5 ||
            choosenShip.position.x === -2.5 ||
            choosenShip.position.y === 2.5 ||
            choosenShip.position.y === -2.5) {
            return false;
        } else {
            return true;
        }
    } else if (choosenShip.name === 'mediumShip') {
        if (isTurned) {
            if (choosenShip.position.x === 2.5) {
                return false;
            } else {
                return true;
            }
        }
        if (choosenShip.position.y === 2.5) {
            return false;
        } else {
            return true;
        }
    }
}

export const checkShipsIntersections = () => {
    setedShips.forEach(ship => {
            console.log(ship.name);
        });
}
