import * as THREE from 'three';
import { Water } from 'three/examples/jsm/objects/Water2';
const params = {
    color: '#9096df',
    scale: 4,
    flowX: 1,
    flowY: 1
};

const waterGeometry = new THREE.PlaneGeometry(20, 20);
const water = new Water(waterGeometry, {
    color: params.color,
    scale: params.scale,
    flowDirection: new THREE.Vector2(params.flowX, params.flowY),
    textureWidth: 1024,
    textureHeight: 1024
});

export default water;
