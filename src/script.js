import './style.css';
import camera from './helpers/initial/camera';
import scene from './helpers/initial/scene';
import light from './helpers/initial/light';
import renderer from './helpers/initial/renderer';
import water from './view/waterGeometry';
import ground from './view/ground';
import resize from './helpers/resize';
import controls from './helpers/controls';
import { getPropertyFromStorage, removePropertyFromStorage, setPropertyToStorage } from "./helpers/localStorage";
import { loadingScreen, animateLoadingScreen } from './components/loadingScreen';
import { mousePosition } from './helpers/mousePosition';
import { ships, chooseShip} from './view/ships';
import { findIntersect } from './helpers/intersect';
// import { dt, et } from './helpers/time';
// import cursor from './view/getCursor';

const loadingText = document.querySelector('.loading');

const init = () => {
    //Loading scrin
    loadingScreen();
    // ground
    scene.add(ground);
    // water
    scene.add(water);
    //model
    ships();
    //Light
    light(scene);
};

//Resize
const onWindowResize = () => {
    resize(camera, renderer);
};

const animate = () => {
    const loading = getPropertyFromStorage("loading");
    if (loading) {
        requestAnimationFrame(animate);
        animateLoadingScreen(renderer, loadingText);
        return;
    }
    loadingText.classList.add('hidden');
    render();
    requestAnimationFrame(animate);
};

const render = () => {
    renderer.render(scene, camera);
};

init();
animate();


window.addEventListener('mousemove', mousePosition, false);
window.addEventListener('mousedown', () => {
    setPropertyToStorage('mousedown', true);
});
window.addEventListener('mouseup', () => {
    removePropertyFromStorage('mousedown');
    // controls.enabled = true;
});
window.addEventListener('resize', onWindowResize);

