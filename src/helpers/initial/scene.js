import skybox from '../../view/skybox';
import {Scene} from 'three';

const scene = new Scene();
scene.background = skybox;

export default scene;
