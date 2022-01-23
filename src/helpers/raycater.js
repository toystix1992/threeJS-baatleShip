import * as THREE from 'three';
import mouse from './mousePosition';
const raycaster = new THREE.Raycaster();

const  pickPiece = (intesect) => {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(intesect);
    for (intersect of intersects) {
        console.dir(intersect.object);
        coursour.position.set(0, 0, 0);
        coursour.position.copy(intersects[0].point);
        // if (intersect.object.parrent === 'ship') {

        // }
    }
}

export default pickPiece;
