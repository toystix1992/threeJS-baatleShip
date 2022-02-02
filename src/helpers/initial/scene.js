import skybox from '../../view/skybox';
import {Scene, AxesHelper} from 'three';

const scene = new Scene();
scene.background = skybox;
const axesHelper = new AxesHelper( 5 );
scene.add( axesHelper );
console.log(scene);
export default scene;
