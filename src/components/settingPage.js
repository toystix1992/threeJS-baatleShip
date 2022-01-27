import water from '../view/waterGeometry';
import ground from '../view/ground';
import {ships} from '../view/ships';

const settingPage = (scene) => {
    //ground
    scene.add(ground);
    //water
    scene.add(water);
    //model
    ships();
}

export default settingPage;
