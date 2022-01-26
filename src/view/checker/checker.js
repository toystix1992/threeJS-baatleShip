import { getPropertyFromStorage } from '../../helpers/localStorage';

let largeShip = getPropertyFromStorage('largeShip');
let mediumShip = getPropertyFromStorage('mediumShip');
let smallShipOne = getPropertyFromStorage('smallShipOne');
let smallShipTwo = getPropertyFromStorage('smallShipTwo');

export const getShipSize = () => {
    if(largeShip) {
        if(largeShip.turn) {
            // largeShip.pos
        } else {

        }
    }
    console.log(largeShip);
}
