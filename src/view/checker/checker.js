import { getPropertyFromStorage, removePropertyFromStorage, setPropertyToStorage } from '../../helpers/localStorage';
import water from '../waterGeometry';
import { plane } from '../../helpers/mesh/plane';

const config = {
    opacity: 0.1,
    transparent: true
}
const largeShipHor = plane(3, 1, config);
const largeShipVert = plane(1, 3, config);
const mediumShipHor = plane(2, 1, config);
const mediumShipVert = plane(1, 2, config);
const smallShipFirst = plane(1, 1, config);
const smallShipSec = plane(1, 1, config);

export const getShipZone = () => {
    const largeShip = getPropertyFromStorage('largeShip');
    const mediumShip = getPropertyFromStorage('mediumShip');
    const smallShipOne = getPropertyFromStorage('smallShipOne');
    const smallShipTwo = getPropertyFromStorage('smallShipTwo');
    if (largeShip) {
        if (!largeShip.turn) {
            largeShipHor.position.x = largeShip.pos.x;
            largeShipHor.position.y = largeShip.pos.y;
            largeShipHor.position.z = 0.01;
            water.add(largeShipHor);
            setPropertyToStorage('LargeShipZone', largeShipHor);
        } else {
            largeShipVert.position.x = largeShip.pos.x;
            largeShipVert.position.y = largeShip.pos.y;
            largeShipVert.position.z = 0.01;
            water.add(largeShipVert);
            setPropertyToStorage('LargeShipZone', largeShipHor);
        }
        removePropertyFromStorage('largeShip');
    } else if (mediumShip) {
        if (!mediumShip.turn) {
            mediumShipHor.position.x = mediumShip.pos.x;
            mediumShipHor.position.y = mediumShip.pos.y;
            mediumShipHor.position.z = 0.01;
            water.add(mediumShipHor);
            setPropertyToStorage('MediumShipZone', mediumShipHor);
        } else {
            mediumShipVert.position.x = mediumShip.pos.x;
            mediumShipVert.position.y = mediumShip.pos.y;
            mediumShipVert.position.z = 0.01;
            water.add(mediumShipVert);
            setPropertyToStorage('MediumShipZone', mediumShipHor);
        }
        removePropertyFromStorage('mediumShip');
    } else if (smallShipOne) {
        smallShipFirst.position.x = smallShipOne.pos.x;
        smallShipFirst.position.y = smallShipOne.pos.y;
        smallShipFirst.position.z = 0.01;
        water.add(smallShipFirst);
        removePropertyFromStorage('smallShipOne');
        setPropertyToStorage('SmallShipOneZone', smallShipFirst);
    } else if (smallShipTwo) {
        smallShipSec.position.x = smallShipTwo.pos.x;
        smallShipSec.position.y = smallShipTwo.pos.y;
        smallShipSec.position.z = 0.01;
        water.add(smallShipSec);
        removePropertyFromStorage('smallShipTwo');
        setPropertyToStorage('SmallShipTwoZone', smallShipSec);
    }
}
