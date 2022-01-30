import water from '../view/waterGeometry';
import ground from '../view/ground';

const gamePage = (scene) => {
    //ground
    scene.add(ground);
    //water
    scene.add(water);
}

export default gamePage;
