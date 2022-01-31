import {PlaneGeometry, MeshBasicMaterial, Mesh} from 'three';
import ground from '../view/ground';
import {mouse} from '../helpers/mousePosition';

const geometry = new PlaneGeometry(3.3, 3.3);
const material = new MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide });
const cursor = new Mesh(geometry, material);

const getCursor  = () => {
    // cursor.position.set(mouse.x, mouse.y, 0);
    cursor.position.set(mouse.x, mouse.y, 0);
    // console.log(cursor.position);
    ground.add(cursor);
}

export default getCursor;
