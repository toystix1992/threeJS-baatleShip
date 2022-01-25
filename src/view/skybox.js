import {CubeTextureLoader} from 'three';

const cubeTextureLoader = new CubeTextureLoader();
cubeTextureLoader.setPath('textures/cube/');

const skybox = cubeTextureLoader.load([
    "dark-s_px.jpg", "dark-s_nx.jpg",
    "dark-s_py.jpg", "dark-s_ny.jpg",
    "dark-s_pz.jpg", "dark-s_nz.jpg"
]);

export default skybox;
