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

            shipsZone.push([
                shipPosConf.name, [
                    startShip.position,
                    centerShip.position,
                    endShip.position
                ]
            ]);
            water.add(startShip, centerShip, endShip);
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
            shipsZone.push([
                shipPosConf.name, [
                    startShip.position,
                    centerShip.position,
                    endShip.position
                ]
            ]);
            water.add(startShip, centerShip, endShip);
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
            shipsZone.push([
                shipPosConf.name, [
                    startShip.position,
                    endShip.position
                ]
            ]);
            water.add(startShip, endShip);
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
            shipsZone.push([
                shipPosConf.name, [
                    startShip.position,
                    endShip.position
                ]
            ]);
            water.add(startShip, endShip);
        }
    } else if (shipPosConf.name === 'smallShipOne') {
        const centerShip = plane(1, 1, config);
        centerShip.name = 'smallShipOne';
        centerShip.position.set(
            shipPosConf.pos.x,
            shipPosConf.pos.y,
            0.01
        );
        shipsZone.push([
            shipPosConf.name, [
                centerShip.position
            ]
        ]);
        water.add(centerShip);
    } else if (shipPosConf.name === 'smallShipTwo') {
        const centerShip = plane(1, 1, config);
        centerShip.name = 'smallShipTwo';
        centerShip.position.set(
            shipPosConf.pos.x,
            shipPosConf.pos.y,
            0.01
        );
        shipsZone.push([
            shipPosConf.name, [
                centerShip.position
            ]
        ]);
        water.add(centerShip);
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

const checkShipsIntersections = (shipPosConf) => {
    // shipsZone.forEach(ship => {
    //     console.log(ship);
    // })
    console.log(shipsZone);
}



// if (shipsZone.length === 0) {
//     if (shipPosConf.name === 'largeShip' &&
//         shipPosConf.turn === false) {
//         firstChosebShip =
//         `${shipPosConf.pos.x - 1}${shipPosConf.pos.y}
//         ${shipPosConf.pos.x}${shipPosConf.pos.y}
//         ${shipPosConf.pos.x + 1}${shipPosConf.pos.y}
//         `;
//     } else if (shipPosConf.name === 'largeShip' &&
//     shipPosConf.turn === true) {
//     firstChosebShip =
//         `${shipPosConf.pos.x}${shipPosConf.pos.y - 1}
//         ${shipPosConf.pos.x}${shipPosConf.pos.y}
//         ${shipPosConf.pos.x}${shipPosConf.pos.y + 1}
//     `;
// }
//     console.log(firstChosebShip);
// } else {
//     shipsZone.forEach(ship => {
//         console.log(ship[1].x, ship[1].y);
//     })
// }
