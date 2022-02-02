import {AmbientLight, DirectionalLight} from 'three';

const ambientLight = new AmbientLight(0xcccccc, 0.4);
const directionalLight = new DirectionalLight(0xffffff, 0.6);
directionalLight.position.set(- 1, 1, 1);
const lights = [ambientLight, directionalLight];
const light = (scene) => {
    lights.forEach(lightType =>  scene.add(lightType));
};

export default light;
