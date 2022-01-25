import getGLTFModel from '../loaders/gltfLoader';
import water from './waterGeometry';
import { findIntersect } from '../helpers/intersect';
import controls from '../helpers/controls';
import { mouse } from '../helpers/mousePosition';
import { setPropertyToStorage, getPropertyFromStorage } from '../helpers/localStorage';

export const ships = () => {
    const ships = [];
    getGLTFModel(['ships/large.gltf', 'ships/medium.gltf', 'ships/small.gltf', 'ships/small.gltf']).
        then((gltfs) => {
            gltfs[0].scene.name = 'largeShip';
            gltfs[1].scene.name = 'mediumShip';
            gltfs[2].scene.name = 'smallShipOne';
            gltfs[3].scene.name = 'smallShipTwo';
            gltfs.forEach((gltf) => {
                gltf.scene.rotation.x = Math.PI / 2;
                if (gltf.scene.name === 'largeShip') {
                    gltf.scene.scale.set(1.3, 1.2, 1.6);
                    gltf.scene.position.set(8, 0, -0.3);
                } else if (gltf.scene.name === 'mediumShip') {
                    gltf.scene.scale.set(1.3, 1.2, 1.5);
                    gltf.scene.position.set(2.5, 0.4, 0);
                } else {
                    gltf.scene.scale.set(3, 4, 3.3);
                    if (gltf.scene.name === 'smallShipOne') {
                        gltf.scene.position.set(5, 0, -.1);
                    } else if (gltf.scene.name === 'smallShipTwo') {
                        gltf.scene.position.set(0, 0, -.1);
                    }
                }
                water.add(gltf.scene);
            });
        });
    return ships;
};
let choosenShip = null;
export const chooseShip = () => {
    const intersect = findIntersect();
    if (intersect.length > 0) {
        choosenShip = intersect[0].object.parent.parent;
        console.log(choosenShip);
    }
};

function logKey(e) {
    if (choosenShip != null) {
        console.log(e.code);
        if (e.code === 'KeyD') {
            choosenShip.position.x += 3;
            console.log(choosenShip.position);
        }
    }
}

document.addEventListener('click', chooseShip);
document.addEventListener('keypress', logKey);


// ArrowRight
// ships.js:47 ArrowLeft
// ships.js:47 ArrowUp
// ships.js:47 ArrowDown
