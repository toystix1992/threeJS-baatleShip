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
    console.log(shipPosConf.pos);
    if (shipPosConf.name === 'largeShip') {
        if (!shipPosConf.turn) {
            console.log(shipPosConf);
            largeShipHor.position.x = shipPosConf.pos.x;
            largeShipHor.position.y = shipPosConf.pos.y;
            largeShipHor.position.z = 0.01;
            largeShipHor.renderOrder = 1;
            water.add(largeShipHor);
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

export const checkFieldBorders = (choosenShip, keyCode) => {
    if (choosenShip.name === 'smallShipOne' ||
    choosenShip.name === 'smallShipTwo') {
        if (choosenShip.position.x > 1.5 ||
            choosenShip.position.x < -1.5 ||
            choosenShip.position.y > 1.5 ||
            choosenShip.position.y < -1.5
        ) {
            return false;
        } else {
            return true;
        }
    }
};
