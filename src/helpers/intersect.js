import * as THREE from 'three';
import { mouse } from './mousePosition';
const raycaster = new THREE.Raycaster();

const intersect = (camera, scene) => {
    raycaster.setFromCamera(mouse, camera);
    console.log(mouse);
    // console.log(raycaster.intersectObjects(scene));
    // return raycaster.intersectObjects(scene.children);
}

export default intersect;
