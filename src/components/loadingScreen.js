import * as THREE from 'three';

const loadingScreen = {
    scene: new THREE.Scene(),
    camera: new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 50),
    box: new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.5, 0.5),
        new THREE.MeshBasicMaterial({ color: 0x1111ff })
    )
};

export default loadingScreen;
