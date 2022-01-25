import {Raycaster} from 'three';
import camera from '../helpers/initial/camera';
import water from '../view/waterGeometry';
import { mouse } from './mousePosition';

const raycaster = new Raycaster();
let intersect = null;

export const findIntersect = () => {
    raycaster.setFromCamera(mouse, camera);
    intersect = raycaster.intersectObjects(water.children);
    return intersect;
};

