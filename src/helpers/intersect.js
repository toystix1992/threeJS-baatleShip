import {Raycaster} from 'three';
import camera from '../helpers/initial/camera';
import {water} from '../view/waterGeometry';
import wavesFlag from '../view/wavesFlag';
import { mouse } from './mousePosition';

const raycaster = new Raycaster();
let shipIntersect, startBtnIntersect;
const ships = water.children;
const startBtn = [wavesFlag];

export const findShipIntersect = () => {
    raycaster.setFromCamera(mouse, camera);
    shipIntersect = raycaster.intersectObjects(ships);
    return shipIntersect;
};

export const findStartBtnIntersect = () => {
    raycaster.setFromCamera(mouse, camera);
    startBtnIntersect = raycaster.intersectObjects(startBtn);
    return startBtnIntersect;
}
