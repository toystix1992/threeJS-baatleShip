import { getPropertyFromStorage } from '../../helpers/localStorage';
import water from '../waterGeometry';

let mediumShip = getPropertyFromStorage('mediumShip');
let smallShipOne = getPropertyFromStorage('smallShipOne');
let smallShipTwo = getPropertyFromStorage('smallShipTwo');

export const getShipZone = () => {
    let largeShip = getPropertyFromStorage('largeShip');
    if(largeShip) {
        if(!largeShip.turn) {
            const geometry = new THREE.PlaneGeometry( 3, 1 );
            const material = new THREE.MeshBasicMaterial({opacity: 0.1});
            material.transparent = true;
            const plane = new THREE.Mesh( geometry, material );
            plane.position.x = largeShip.pos.x;
            plane.position.y = largeShip.pos.y;
            plane.position.z = 0.01;
            water.add( plane );
        } else {

        }
    }

}
