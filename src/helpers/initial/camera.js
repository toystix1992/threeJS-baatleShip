import {PerspectiveCamera} from 'three';
import {perspectiveCamera} from '../../config/config';

const camera = new PerspectiveCamera(
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
