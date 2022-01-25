import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import camera from './initial/camera';
import { canvas } from './initial/canvas';

const controls = new OrbitControls(camera, canvas);
controls.minDistance = 20;
controls.maxDistance = 30;
controls.maxPolarAngle = Math.PI / 3.7;


export default controls;
