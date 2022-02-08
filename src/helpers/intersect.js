import {Raycaster} from 'three';
import camera from '../helpers/initial/camera';
import {firstSetWater, secondSetWater } from '../view/waterGeometry';
import {firstGameGround, secondGameGround} from "../view/ground";
import wavesFlag from '../view/wavesFlag';
import { mouse } from './mousePosition';
import {getPlayer} from '../storage/player';

const raycaster = new Raycaster();
let startBtnIntersect, player, gamer;
const firstPlayer = firstSetWater;
const secondPlayer = secondSetWater;
const firstPlayerGame = firstGameGround;
const secondPlayerGame = secondGameGround;
const startBtn = [wavesFlag];

export const shipsIntersect = () => {
    getPlayer() === 'first'?
    player = firstPlayer: player = secondPlayer;
    raycaster.setFromCamera(mouse, camera);
    return raycaster.intersectObjects([player]);
};
export const gameIntersect = () => {
    getPlayer() === 'first'?
        gamer = firstPlayerGame: gamer = secondPlayerGame;
    raycaster.setFromCamera(mouse, camera);
    return raycaster.intersectObjects([gamer]);
};
export const findStartBtnIntersect = () => {
    raycaster.setFromCamera(mouse, camera);
    startBtnIntersect = raycaster.intersectObjects(startBtn);
    return startBtnIntersect;
}
