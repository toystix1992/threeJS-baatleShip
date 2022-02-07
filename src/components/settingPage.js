import {firstSetWater, secondSetWater} from '../view/waterGeometry';
import {firstSetGround, secondSetGround} from '../view/ground';
import {ships} from '../view/ships';

export const settingPage = (scene) => {
    //first player
    scene.add(firstSetGround);
    scene.add(secondSetGround);
    //second player
    scene.add(firstSetWater);
    scene.add(secondSetWater);
    //model
    ships();
};


