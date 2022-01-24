import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import camera from './helpers/initial/camera';
import scene from './helpers/initial/scene';
import water from './view/waterGeometry';
import ground from './view/ground';
import cursor from './view/getCursor';
import skybox from './view/skybox';
import resize from './helpers/resize';
import { getPropertyFromStorage } from "./helpers/localStorage";
import { loadingScreen, animateLoadingScreen } from './components/loadingScreen';
import { mousePosition } from './helpers/mousePosition';
import getCursor from './view/getCursor';
import ships from './view/ships';
// import { dt, et } from './helpers/time';
import intersect from './helpers/intersect';

const loadingText = document.querySelector('.loading');
let renderer;

const init = () => {
    // scene
    scene.background = skybox;
    // camera
    camera.lookAt(scene.position);
    //Loading scrin
    loadingScreen();
    //Coursour geometry
    // const geometry = new THREE.PlaneGeometry(1, 1);
    // const material = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide });
    // coursour = new THREE.Mesh(geometry, material);
    // scene.add(coursour);
    cursor();
    // ground
    ground.rotation.x = Math.PI * - 0.5;
    scene.add(ground);
    // water
    water.position.y = 1;
    water.rotation.x = Math.PI * - 0.5;
    scene.add(water);
    //model
    ships();

    //Light
    const ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(- 1, 1, 1);
    scene.add(directionalLight);

    // renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio || 1);
    document.body.appendChild(renderer.domElement);

    //Orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 20;
    controls.maxDistance = 30;
    controls.maxPolarAngle = Math.PI / 3.7;
};

// const intersect = () => {
//     raycaster.setFromCamera(mouse, camera);
//     console.log(raycaster.intersectObjects(scene.children));
//     // return raycaster.intersectObjects(scene.children);
// };

window.addEventListener('mousemove', mousePosition, false);
// window.addEventListener('click', intersect);
//Resize
const onWindowResize = () => {
    resize(camera, renderer);
};
window.addEventListener('resize', onWindowResize);

const animate = () => {
    getCursor();
    const loading = getPropertyFromStorage("loading");
    if (loading) {
        requestAnimationFrame(animate);
        animateLoadingScreen(renderer, loadingText);
        return
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
