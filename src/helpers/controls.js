import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const controls = (camera, domElement) => {
    const controls = new OrbitControls(camera, domElement);
    controls.minDistance = 20;
    controls.maxDistance = 30;
    controls.maxPolarAngle = Math.PI / 3.7;
    return controls;
}

export default controls;
