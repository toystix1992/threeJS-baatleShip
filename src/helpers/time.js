
import {Clock} from 'three';
const clock = new Clock();

export const dt = clock.getDelta();
export const el = clock.getElapsedTime();
