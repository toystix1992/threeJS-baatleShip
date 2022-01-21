import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export const loadShips = async (ship, scene, shipRotation, ships) => {
    const loader = new GLTFLoader();
    ships.forEach((link, idx) => {
        loader.load(link, (gltf) => {
            ship = gltf.scene;
            scene.add(ship);
            ship.position.set(idx * 3, 0.6, 0);
        }, undefined, (error) => {
            console.error(error);
        });
    });
    return loader;
};

