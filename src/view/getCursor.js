import * as THREE from 'three';
import ground from './ground';
import {mouse} from '../helpers/mousePosition';

const geometry = new THREE.PlaneGeometry(3.3, 3.3);
const material = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide });
const cursor = new THREE.Mesh(geometry, material);

const getCursor  = () => {
    // cursor.position.set(mouse.x, mouse.y, 0);
    cursor.position.set(mouse.x, mouse.y, 0);
    // console.log(cursor.position);
    ground.add(cursor);
}

export default getCursor;
