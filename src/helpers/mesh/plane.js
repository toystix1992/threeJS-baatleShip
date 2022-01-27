import {PlaneGeometry, MeshBasicMaterial, Mesh} from 'three';


export const plane = (x, y, config) => {
    const geometry = new PlaneGeometry(x, y);
    const material = new MeshBasicMaterial(config);
    material.transparent = true;
    const plane = new Mesh(geometry, material);
    return plane
}
