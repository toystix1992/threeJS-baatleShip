import {Raycaster} from 'three';
import camera from '../helpers/initial/camera';
import water from '../view/waterGeometry';
import { mouse } from './mousePosition';

const raycaster = new Raycaster();
let intersect = null;
const ships = water.children;

export const findIntersect = () => {
    raycaster.setFromCamera(mouse, camera);
    intersect = raycaster.intersectObjects(ships);
    return intersect;
};

