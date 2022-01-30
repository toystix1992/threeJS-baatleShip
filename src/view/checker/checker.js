import { Color } from 'three';
import water from '../waterGeometry';
import { plane } from '../../helpers/mesh/plane';
const shipsZone = [];
let shipZone;
const config = {
    color: new Color('green'),
    opacity: 0.1,
    transparent: true
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
};
const addPos = (x, y) => {
    return {
        x: x,
        y: y,
        z: 0.01
    };

};

export const checkShipsIntersections = (shipPosConf) => {
    shipZone = [shipPosConf.name];
    if (shipPosConf.name === 'largeShip') {
        if (!shipPosConf.turn) {
            shipZone.push([
                addPos(
                    shipPosConf.pos.x - 1,
                    shipPosConf.pos.y
                ),
                addPos(
                    shipPosConf.pos.x,
                    shipPosConf.pos.y
                ),
                addPos(
                    shipPosConf.pos.x + 1,
                    shipPosConf.pos.y
                )
            ]);
        } else {
            shipZone.push([
                addPos(
                    shipPosConf.pos.x,
                    shipPosConf.pos.y - 1
                ),
                addPos(
                    shipPosConf.pos.x,
                    shipPosConf.pos.y
                ),
                addPos(
                    shipPosConf.pos.x,
                    shipPosConf.pos.y + 1
                )
            ]);
        }
    } else if (shipPosConf.name === 'mediumShip') {
        if (!shipPosConf.turn) {
            shipZone.push([
                addPos(
                    shipPosConf.pos.x - 0.5,
                    shipPosConf.pos.y
                ),
                addPos(
                    shipPosConf.pos.x + 0.5,
                    shipPosConf.pos.y
                )
            ]);
        } else {
            shipZone.push([
                addPos(
                    shipPosConf.pos.x,
                    shipPosConf.pos.y - 0.5
                ),
                addPos(
                    shipPosConf.pos.x,
                    shipPosConf.pos.y + 0.5
                )
            ]);
        }
    } else if (shipPosConf.name === 'smallShipOne') {
        shipZone.push([
            addPos(
                shipPosConf.pos.x,
                shipPosConf.pos.y
            )]);
    } else if (shipPosConf.name === 'smallShipTwo') {
        shipZone.push([
            addPos(
                shipPosConf.pos.x,
                shipPosConf.pos.y
            )]);
    }
    const positions = [];
    shipZone[1].forEach(pos => {
        const curPos = `${pos.x}:${pos.y}`;
        positions.push(curPos);
    });
    shipsZone.forEach(prevShipZone => {
        prevShipZone[1].forEach(pos => {
            const prevPos = `${pos.x}:${pos.y}`;
            positions.push(prevPos);
        });
    });
    const unicPositions = [...new Set(positions)];
    if (positions.length === unicPositions.length) {
        shipsZone.push(shipZone);
        lightShipZone();
        return false;
    } else {
        return true;
    }
};
const lightShipZone = () => {
    shipZone[1].forEach(pos => {
        const shipLight = plane(1, 1, config);
        shipLight.position.set(pos.x, pos.y, pos.z);
        water.add(shipLight);
    });
};
