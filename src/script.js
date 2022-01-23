import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import { loadShips, shipsArray } from './ships/ships';
import water from './view/waterGeometry';
import ground from './view/ground';
import skybox from './view/skybox';
import getGLTFModel from './loaders/gltfLoader';
import resize from './helpers/resize';
import { dt, et } from './helpers/time';
import loadingScreen from './components/loadingScreen';
import { mousePosition, mouse } from './helpers/mousePosition';
import { getPropertyFromStorage } from "./helpers/localStorage"


let scene, camera, renderer, coursour, loadingManager;


const init = () => {
    // scene
    scene = new THREE.Scene();
    scene.background = skybox;
    // camera
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 50);
    camera.position.set(0, 5, 15);
    camera.lookAt(scene.position);
    //Loading scrin
    loadingScreen.box.position.set(0, 0, 5);
    loadingScreen.camera.lookAt(loadingScreen.box.position);
    loadingScreen.scene.add(loadingScreen.box);

    //Coursour geometry
    const geometry = new THREE.PlaneGeometry(1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide });
    coursour = new THREE.Mesh(geometry, material);
    scene.add(coursour);

    // ground
    ground.rotation.x = Math.PI * - 0.5;
    scene.add(ground);

    // water
    water.position.y = 1;
    water.rotation.x = Math.PI * - 0.5;
    scene.add(water);
    //model

    getGLTFModel(['ships/large.glb', 'ships/medium.gltf', 'ships/small.gltf']).then((gltfs) => {
        // debugger
        gltfs.forEach((gltf) => {
            water.add(gltf.scene)
        })
    })

    // if (ships.length > 0) {
    //     ships.forEach(ship => {
    //         scene.add(ship);
    //     });
    // }
    // scene.add(ships[0])
    // light
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

const onWindowResize = () => {
    resize(camera, renderer);
};

window.addEventListener('resize', onWindowResize);
window.addEventListener('mousemove', mousePosition, false);

const animate = () => {
    const loading = getPropertyFromStorage("loading");

    if (loading) {
        requestAnimationFrame(animate);
        loadingScreen.box.position.x -= 0.05;
        if (loadingScreen.box.position.x < -5) loadingScreen.box.position.x = 5;
        loadingScreen.box.position.y = Math.sin(loadingScreen.box.position.x);
        renderer.render(loadingScreen.scene, loadingScreen.camera);
        return;
    }
    requestAnimationFrame(animate);
    render();
}

const render = () => {
    renderer.render(scene, camera);
}


init();
animate();
