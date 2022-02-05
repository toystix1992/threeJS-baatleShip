
import {Clock} from 'three';


export const clock = new Clock();
export const dt = clock.getDelta();
export const et = clock.getElapsedTime();
