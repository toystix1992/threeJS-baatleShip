import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { loadShips, shipsArray } from './ships/ships';
import water from './view/waterGeometry';
import ground from './view/ground';
import skybox from './view/skybox';
import getGLTFModel from './loaders/gltfLoader';
import resize from './helpers/resize';
let scene, camera, clock, renderer,
    raycaster, mouse, intersect,
    coursour;

clock = new THREE.Clock();

init();
animate();

function init() {
    // scene
    scene = new THREE.Scene();
    scene.background = skybox;
    // camera
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 50);
    camera.position.set(0, 5, 15);
    camera.lookAt(scene.position);

    //Coursour geometry
    const geometry = new THREE.PlaneGeometry(1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide });
    coursour = new THREE.Mesh(geometry, material);
    scene.add(coursour);
    //raycaster
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();
    // ground
    ground.rotation.x = Math.PI * - 0.5;
    scene.add(ground);

    // water
    water.position.y = 1;
    water.rotation.x = Math.PI * - 0.5;
    scene.add(water);

    // model
    getGLTFModel('ships/large.glb', water);
    getGLTFModel('ships/medium.gltf', water);
    getGLTFModel('ships/small.gltf', water);

    // light
    const ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(- 1, 1, 1);
    scene.add(directionalLight);

    // renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);

    //Orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 20;
    controls.maxDistance = 30;
    controls.maxPolarAngle = Math.PI / 3.7;
}

const onWindowResize = () => {
    resize(camera, renderer)
}
window.addEventListener('resize', onWindowResize);

function pickPiece() {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(shipsArray);
    for (intersect of intersects) {
        console.dir(intersect.object);
        coursour.position.set(0, 0, 0);
        coursour.position.copy(intersects[0].point);
        // if (intersect.object.parrent === 'ship') {

        // }
    }
}

const getMousePos = (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    pickPiece();
}

window.addEventListener('mousemove', getMousePos, false);

// function onWindowResize() {
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight);
// }

function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    render();
}

function render() {
    renderer.render(scene, camera);
}
