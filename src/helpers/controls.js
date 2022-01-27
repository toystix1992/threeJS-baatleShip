import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import camera from './initial/camera';
import { canvas } from './initial/canvas';

const controls = new OrbitControls(camera, canvas);
controls.minDistance = 8;
controls.maxDistance = 11;
controls.maxPolarAngle = Math.PI / 3.7;
controls.maxAzimuthAngle = Math.PI / 2;
