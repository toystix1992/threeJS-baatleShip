
import * as THREE from 'three';
const clock = new THREE.Clock();

export const dt = clock.getDelta();
export const el = clock.getElapsedTime()
