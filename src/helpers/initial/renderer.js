import { WebGLRenderer } from 'three';
import { canvas } from './canvas';
const renderer = new WebGLRenderer({
    canvas: canvas
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio || 1);
export default renderer;
