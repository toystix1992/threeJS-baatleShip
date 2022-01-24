import * as THREE from 'three';
import { perspectiveCamera } from '../config/config';

const camera = new THREE.PerspectiveCamera(
    perspectiveCamera.fov,
    window.innerWidth / window.innerHeight,
    perspectiveCamera.near,
    perspectiveCamera.far
);
const scene = new THREE.Scene();
const box = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.5, 0.5),
    new THREE.MeshBasicMaterial({ color: 0x2ff })
);
export const loadingScreen = () => {
    scene;
    camera.position.set(
        perspectiveCamera.pos.x,
        perspectiveCamera.pos.y,
        perspectiveCamera.pos.z
    );
    box.position.set(0, 0, 5);
    camera.lookAt(box.position);
    scene.add(box);
};

export const animateLoadingScreen = (renderer, loadingText) => {
    loadingText.classList.remove('hidden');
    box.position.x -= 0.05;
    if (box.position.x < -5) box.position.x = 5;
    box.position.y = Math.sin(box.position.x);
    renderer.render(scene, camera);
    return;
};

