import * as THREE from 'three';
import {perspectiveCamera} from '../../canfig/config';

const camera = new THREE.PerspectiveCamera(
        perspectiveCamera.fov,
        window.innerWidth / window.innerHeight,
        perspectiveCamera.near,
        perspectiveCamera.far
        );
    camera.position.set(
        perspectiveCamera.pos.x,
        perspectiveCamera.pos.y,
        perspectiveCamera.pos.z
        );

export default camera;
