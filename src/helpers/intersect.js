import {Raycaster} from 'three';
import camera from '../helpers/initial/camera';
import {water, newWater} from '../view/waterGeometry';
import wavesFlag from '../view/wavesFlag';
import { mouse } from './mousePosition';

const raycaster = new Raycaster();
let startBtnIntersect;
const firstPlayer = water.children;
const secondPlayer = newWater.children;
const startBtn = [wavesFlag];

export const firstPlayerIntersect = () => {
    raycaster.setFromCamera(mouse, camera);
    const shipIntersect = raycaster.intersectObjects(firstPlayer);
    return shipIntersect;
};
export const secondPlayerIntersect = () => {
    raycaster.setFromCamera(mouse, camera);
    const shipIntersect = raycaster.intersectObjects(secondPlayer);
    return shipIntersect;
};
export const findStartBtnIntersect = () => {
    raycaster.setFromCamera(mouse, camera);
    startBtnIntersect = raycaster.intersectObjects(startBtn);
    return startBtnIntersect;
}
