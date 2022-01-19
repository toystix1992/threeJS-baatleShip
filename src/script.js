import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';
import { Water } from 'three/examples/jsm/objects/Water2';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

let scene, camera, clock, renderer, water;
let rotationTo = 0;

let ship
const ships = ['ships/large.glb', 'ships/medium.gltf', 'ships/small.gltf'];

const params = {
    color: '#9096df',
    scale: 4,
    flowX: 1,
    flowY: 1
};
//
//     rotationFrom: -0.2,
//     rotationTo: 0.2
//
init();
animate();

function init() {

    // scene

    scene = new THREE.Scene();

    // camera

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 200);
    camera.position.set(0, 5, 15);
    camera.lookAt(scene.position);

    // clock

    clock = new THREE.Clock();

    // model
        const loader = new GLTFLoader();
        ships.forEach((link, idx) => {
            loader.load(link, ( gltf ) => {
                ship = gltf.scene;
                scene.add(ship);
                ship.position.set(idx*3, 0.6 ,0);
                console.log(ship);
                ship.rotation._y = rotationTo;
                console.log(rotationTo);
            }, undefined, ( error ) => {
                console.error(error);
            });
        })
    // ground

    const groundGeometry = new THREE.PlaneGeometry(20, 20);
    const groundMaterial = new THREE.MeshStandardMaterial({ roughness: 0.8, metalness: 0.4 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = Math.PI * - 0.5;
    scene.add(ground);

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('textures/fieldTexture.jpg', function (map) {

        map.wrapS = THREE.RepeatWrapping;
        map.wrapT = THREE.RepeatWrapping;
        map.anisotropy = 16;
        map.repeat.set(6, 6);
        groundMaterial.map = map;
        groundMaterial.needsUpdate = true;

    });

    // water

    const waterGeometry = new THREE.PlaneGeometry(20, 20);

    water = new Water(waterGeometry, {
        color: params.color,
        scale: params.scale,
        flowDirection: new THREE.Vector2(params.flowX, params.flowY),
        textureWidth: 1024,
        textureHeight: 1024
    });

    water.position.y = 1;
    water.rotation.x = Math.PI * - 0.5;
    scene.add(water);

    // skybox

    const cubeTextureLoader = new THREE.CubeTextureLoader();
    cubeTextureLoader.setPath('textures/cube/');

    const cubeTexture = cubeTextureLoader.load([
        "dark-s_px.jpg", "dark-s_nx.jpg",
        "dark-s_py.jpg", "dark-s_ny.jpg",
        "dark-s_pz.jpg", "dark-s_nz.jpg"
    ]);

    scene.background = cubeTexture;

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

    // gui

    const gui = new GUI();

    gui.addColor(params, 'color').onChange(function (value) {

        water.material.uniforms['color'].value.set(value);

    });
    gui.add(params, 'scale', 1, 10).onChange(function (value) {

        water.material.uniforms['config'].value.w = value;

    });
    gui.add(params, 'flowX', - 1, 1).step(0.01).onChange(function (value) {

        water.material.uniforms['flowDirection'].value.x = value;
        water.material.uniforms['flowDirection'].value.normalize();

    });
    gui.add(params, 'flowY', - 1, 1).step(0.01).onChange(function (value) {

        water.material.uniforms['flowDirection'].value.y = value;
        water.material.uniforms['flowDirection'].value.normalize();

    });

    gui.open();

    //

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 5;
    controls.maxDistance = 50;

    //

    window.addEventListener('resize', onWindowResize);

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

}

function animate() {

    requestAnimationFrame(animate);

    render();

}

function render() {

    const delta = clock.getDelta();
    // console.log(rotationTo);
    // rotationTo -= 0.01;
    // if(rotationTo >= 0.2) {
    //     rotationTo -= 0.01;
    // } else if (rotationTo <= - 0.2) {
    //     rotationTo += 0.01;
    // }
    // rotationTo+= delta;
    // shipParams.rotationY -= delta;
    // console.log( shipParams.rotationY);

    renderer.render(scene, camera);

}

