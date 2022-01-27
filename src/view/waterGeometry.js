import {PlaneGeometry, Vector2} from 'three';
import { Water } from 'three/examples/jsm/objects/Water2';

const params = {
    color: '#9096df',
    scale: 1,
    flowX: 1,
    flowY: 1
};

const waterGeometry = new PlaneGeometry(6, 6);
const water = new Water(waterGeometry, {
    color: params.color,
    scale: params.scale,
    flowDirection: new Vector2(params.flowX, params.flowY),
    textureWidth: 1024,
    textureHeight: 1024
});
water.position.y = 0.5;
water.rotation.x = Math.PI * - 0.5;
console.log(water);
export default water;
