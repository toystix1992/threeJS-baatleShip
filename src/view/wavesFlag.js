import {PlaneGeometry, MeshBasicMaterial, Mesh, DoubleSide, TextureLoader} from 'three';
let flagColor = "#ffffff";
const texture = new TextureLoader()
.load( 'textures/buttons/startBtn.jpg' );
const geometry = new PlaneGeometry(4,3,1,1);
const material = new MeshBasicMaterial({
    color: flagColor,
    side: DoubleSide,
    map: texture,
});
const wavesFlag = new Mesh(geometry, material);
wavesFlag.rotateX(-0.5);
export default wavesFlag;
