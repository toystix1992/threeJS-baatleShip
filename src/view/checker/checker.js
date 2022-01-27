import {Color} from 'three';
import water from '../waterGeometry';
import { plane } from '../../helpers/mesh/plane';

const config = {
    color: new Color( 'green' ),
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
            console.log(shipPosConf);
            largeShipHor.position.x = shipPosConf.pos.x;
            largeShipHor.position.y = shipPosConf.pos.y;
            largeShipHor.position.z = 0.01;
            largeShipHor.renderOrder = 1;
            water.add(largeShipHor);
            // console.log(largeShipHor.position, largeShipHor.geometry.parameters, largeShipHor.matrix.elements);
        } else {
            largeShipVert.position.x = largeShip.pos.x;
            largeShipVert.position.y = largeShip.pos.y;
            largeShipVert.position.z = 0.01;
            water.add(largeShipVert);
            // console.log(largeShipVert.position, largeShipVert.geometry.parameters);
        }
    }
    // else if (mediumShip) {
    //     if (!mediumShip.turn) {
    //         mediumShipHor.position.x = mediumShip.pos.x;
    //         mediumShipHor.position.y = mediumShip.pos.y;
    //         mediumShipHor.position.z = 0.01;
    //         water.add(mediumShipHor);
    //     } else {
    //         mediumShipVert.position.x = mediumShip.pos.x;
    //         mediumShipVert.position.y = mediumShip.pos.y;
    //         mediumShipVert.position.z = 0.01;
    //         water.add(mediumShipVert);
    //     }
    //     removePropertyFromStorage('mediumShip');
    // } else if (smallShipOne) {
    //     smallShipFirst.position.x = smallShipOne.pos.x;
    //     smallShipFirst.position.y = smallShipOne.pos.y;
    //     smallShipFirst.position.z = 0.01;
    //     water.add(smallShipFirst);
    //     removePropertyFromStorage('smallShipOne');
    //     console.log(smallShipFirst.position, smallShipFirst.geometry.parameters);
    // } else if (smallShipTwo) {
    //     smallShipSec.position.x = smallShipTwo.pos.x;
    //     smallShipSec.position.y = smallShipTwo.pos.y;
    //     smallShipSec.position.z = 0.01;
    //     water.add(smallShipSec);
    //     removePropertyFromStorage('smallShipTwo');
    //     console.log(smallShipSec.position, smallShipSec.geometry.parameters);
    // }
};

// const checkLargeShipBorder = () => {
//     if()
// }
