import {water, newWater} from '../view/waterGeometry';
import {ground, newGround} from '../view/ground';
import {ships} from '../view/ships';

export const settingPage = (scene) => {
    //first player
    scene.add(ground);
    scene.add(newGround);
    //second player
    scene.add(water);
    scene.add(newWater);
    //model
    ships();
};


