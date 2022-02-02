import './style.css';
import camera from './helpers/initial/camera';
import scene from './helpers/initial/scene';
import light from './helpers/initial/light';
import renderer from './helpers/initial/renderer';
import resize from './helpers/resize';
import getPage from './storage/getPage';
import { getPropertyFromStorage, removePropertyFromStorage, setPropertyToStorage } from "./helpers/localStorage";
import { loadingScreen, animateLoadingScreen } from './components/loadingScreen';
import { mousePosition } from './helpers/mousePosition';

const loadingText = document.querySelector('.loading');
export let page;

const init = () => {
    //Loading scrin
    loadingScreen();
    //choose  page
    getPage('setting');
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
});
window.addEventListener('resize', onWindowResize);

