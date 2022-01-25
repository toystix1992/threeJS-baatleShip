import {Raycaster} from 'three';
import camera from '../helpers/initial/camera';
import water from '../view/waterGeometry';
import { mouse } from './mousePosition';
import {setPropertyToStorage} from '../helpers/localStorage';
const raycaster = new Raycaster();

export let intersect = null;

export const findIntersect = () => {
    raycaster.setFromCamera(mouse, camera);
    intersect = raycaster.intersectObjects(water.children);
    setPropertyToStorage('mousedown', true);
    setPropertyToStorage('intersect',
    raycaster.intersectObjects(water.children));
};

