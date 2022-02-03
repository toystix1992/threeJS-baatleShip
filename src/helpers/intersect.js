import {Raycaster} from 'three';
import camera from '../helpers/initial/camera';
import {water, newWater} from '../view/waterGeometry';
import wavesFlag from '../view/wavesFlag';
import { mouse } from './mousePosition';
import {getPlayer} from '../storage/player';

const raycaster = new Raycaster();
let startBtnIntersect, player;
const firstPlayer = water;
const secondPlayer = newWater;
const startBtn = [wavesFlag];

export const shipsIntersect = () => {
    getPlayer() === 'first'?
    player = firstPlayer: player = secondPlayer;
    raycaster.setFromCamera(mouse, camera);
    return raycaster.intersectObjects([player]);
};

export const findStartBtnIntersect = () => {
    raycaster.setFromCamera(mouse, camera);
    startBtnIntersect = raycaster.intersectObjects(startBtn);
    return startBtnIntersect;
}
