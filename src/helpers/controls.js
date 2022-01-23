import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const controls = () => {
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 20;
    controls.maxDistance = 30;
    controls.maxPolarAngle = Math.PI / 3.7;
}

