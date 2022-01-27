import {PlaneGeometry, MeshBasicMaterial, Mesh, DoubleSide, TextureLoader} from 'three';
const [sizeW,sizeH,segW,segH] = [4,3,1,1];
let flagColor = "#ffffff";
const texture = new TextureLoader().load( 'textures/buttons/startBtn.png' );
// scale x2 horizontal
texture.repeat.set(0.5, 1);
// scale x2 vertical
texture.repeat.set(1, 0.5);
const geometry = new PlaneGeometry(sizeW, sizeH, segW, segH);
const material = new MeshBasicMaterial({
    color: flagColor,
    side: DoubleSide,
    map: texture,
});
console.log(texture);
const wavesFlag = new Mesh(geometry, material);
export default wavesFlag;
