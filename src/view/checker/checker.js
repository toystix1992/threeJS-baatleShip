import { Color } from 'three';
import water from '../waterGeometry';
import { plane } from '../../helpers/mesh/plane';
const shipsZone = [];
let shipZone, rendererPlanes;
const config = {
    color: new Color('green'),
    opacity: 0.1,
    transparent: true
};
export const lightShipZone = (shipPosConf) => {
    if (shipPosConf.name === 'largeShip') {
        if (!shipPosConf.turn) {
            const startShip = plane(1, 1, config);
            startShip.name = 'largeShip';
            startShip.position.set(
                shipPosConf.pos.x - 1,
                shipPosConf.pos.y,
                0.01
            );
            const centerShip = plane(1, 1, config);
            centerShip.name = 'largeShip';
            centerShip.position.set(
                shipPosConf.pos.x,
                shipPosConf.pos.y,
                0.01
            );
            const endShip = plane(1, 1, config);
            endShip.name = 'largeShip';
            endShip.position.set(
                shipPosConf.pos.x + 1,
                shipPosConf.pos.y,
                0.01
            );

            shipZone = [
                shipPosConf.name, [
                    startShip.position,
                    centerShip.position,
                    endShip.position
                ]
            ];
            rendererPlanes = [startShip, centerShip, endShip];
        } else {
            const startShip = plane(1, 1, config);
            startShip.name = 'largeShip';
            startShip.position.set(
                shipPosConf.pos.x,
                shipPosConf.pos.y - 1,
                0.01
            );
            const centerShip = plane(1, 1, config);
            centerShip.name = 'largeShip';
            centerShip.position.set(
                shipPosConf.pos.x,
                shipPosConf.pos.y,
                0.01
            );
            const endShip = plane(1, 1, config);
            endShip.name = 'largeShip';
            endShip.position.set(
                shipPosConf.pos.x,
                shipPosConf.pos.y + 1,
                0.01
            );
            shipZone = [
                shipPosConf.name, [
                    startShip.position,
                    centerShip.position,
                    endShip.position
                ]
            ];
            rendererPlanes = [startShip, centerShip, endShip];
        }
    } else if (shipPosConf.name === 'mediumShip') {
        if (!shipPosConf.turn) {
            const startShip = plane(1, 1, config);
            startShip.name = 'mediumShip';
            startShip.position.set(
                shipPosConf.pos.x - 0.5,
                shipPosConf.pos.y,
                0.01
            );
            const endShip = plane(1, 1, config);
            endShip.name = 'mediumShip';
            endShip.position.set(
                shipPosConf.pos.x + 0.5,
                shipPosConf.pos.y,
                0.01
            );
            shipZone = [
                shipPosConf.name, [
                    startShip.position,
                    endShip.position
                ]
            ];
            rendererPlanes = [startShip, endShip];
        } else {
            const startShip = plane(1, 1, config);
            startShip.name = 'mediumShip';
            startShip.position.set(
                shipPosConf.pos.x,
                shipPosConf.pos.y - 0.5,
                0.01
            );
            const endShip = plane(1, 1, config);
            endShip.name = 'mediumShip';
            endShip.position.set(
                shipPosConf.pos.x,
                shipPosConf.pos.y + 0.5,
                0.01
            );
            shipZone = [
                shipPosConf.name, [
                    startShip.position,
                    endShip.position
                ]
            ];
            rendererPlanes = [startShip, endShip];
        }
    } else if (shipPosConf.name === 'smallShipOne') {
        const centerShip = plane(1, 1, config);
        centerShip.name = 'smallShipOne';
        centerShip.position.set(
            shipPosConf.pos.x,
            shipPosConf.pos.y,
            0.01
        );
        shipZone = [
            shipPosConf.name, [
                centerShip.position
            ]
        ];
        rendererPlanes = [centerShip];
    } else if (shipPosConf.name === 'smallShipTwo') {
        const centerShip = plane(1, 1, config);
        centerShip.name = 'smallShipTwo';
        centerShip.position.set(
            shipPosConf.pos.x,
            shipPosConf.pos.y,
            0.01
        );
        shipZone = [
            shipPosConf.name, [
                centerShip.position
            ]
        ];
        rendererPlanes = [centerShip];
    }
    checkShipsIntersections(shipsZone, shipZone)
    shipsZone.push(shipZone);
    rendererPlanes.forEach(rendererPlane => {
        water.add(rendererPlane);
    });
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

const checkShipsIntersections = (shipsZone, shipZone) => {
    console.log(shipZone[1]);
    const typeShip = shipZone[0];
    console.log(typeShip);
    // shipsZone.forEach(ship => {
    //     console.log(ship[1]);
    // });
};
