import skybox from '../../view/skybox';
import {Scene, AxesHelper} from 'three';

const scene = new Scene();
const sceneAxis = new AxesHelper(20);
scene.background = skybox;
scene.add(sceneAxis);

export default scene;
