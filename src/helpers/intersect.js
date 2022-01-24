import * as THREE from 'three';
import camera from '../helpers/initial/camera';
import water from '../view/waterGeometry';
import { mouse } from './mousePosition';
const raycaster = new THREE.Raycaster();

export let intersect = null;

export const findIntersect = () => {
    raycaster.setFromCamera(mouse, camera);
    intersect = raycaster.intersectObjects(water.children);
    console.log(intersect);
    return raycaster.intersectObjects(water.children);
};

