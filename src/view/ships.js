import getGLTFModel from '../loaders/gltfLoader';
import water from './waterGeometry';
import { findIntersect } from '../helpers/intersect';
import { setPropertyToStorage, getPropertyFromStorage } from '../helpers/localStorage';
import {getShipSize} from './checker/checker';

const setedShips = [];
let choosenShip = null;
let isTurned = false;

export const ships = () => {
    let ships = null;
    getGLTFModel(['ships/large.gltf', 'ships/medium.gltf', 'ships/small.gltf', 'ships/small.gltf']).
        then((gltfs) => {
            gltfs[0].scene.name = 'largeShip';
            gltfs[1].scene.name = 'mediumShip';
            gltfs[2].scene.name = 'smallShipOne';
            gltfs[3].scene.name = 'smallShipTwo';
            ships = gltfs;
            gltfs.forEach((gltf) => {
                gltf.scene.rotation.x = Math.PI / 2;
                gltf.scene.rotation.y = Math.PI / 2;
                if (gltf.scene.name === 'largeShip') {
                    gltf.scene.scale.set(1.3, 1.2, 1.6);
                    gltf.scene.position.set(15, 10, -0.3);

                } else if (gltf.scene.name === 'mediumShip') {
                    gltf.scene.scale.set(1.3, 1.2, 1.5);
                    gltf.scene.position.set(15, 5, 0);
                } else {
                    gltf.scene.scale.set(3, 4, 3.3);
                    if (gltf.scene.name === 'smallShipOne') {
                        gltf.scene.position.set(15, 0, -.1);
                    } else if (gltf.scene.name === 'smallShipTwo') {
                        gltf.scene.position.set(15, -5, -.1);
                    }
                }
                water.add(gltf.scene);
            });
        });
    return ships;
};

export const chooseShip = () => {
    const intersect = findIntersect();
    if (intersect.length > 0) {
        choosenShip = intersect[0].object.parent.parent;
        if(!setedShips.includes( choosenShip.name)) {
            if (choosenShip.name === 'mediumShip') {
                choosenShip.position.x = 0;
                choosenShip.position.y = 1.5;
            } else if (
                choosenShip.name === 'smallShipOne' ||
                choosenShip.name === 'smallShipTwo' ||
                choosenShip.name === 'largeShip'
            ) {
                choosenShip.position.x = 1.5;
                choosenShip.position.y = 1.5;
            }
        }
    }
};

function moveShip(e) {
    if (
        choosenShip != null &&
        !setedShips.includes( choosenShip.name)
    ) {
        if (e.code === 'KeyD') {
            choosenShip.position.x += 3;
        } else if (e.code === 'KeyA') {
            choosenShip.position.x -= 3;
        } else if (e.code === 'KeyW') {
            choosenShip.position.y += 3;
        } else if (e.code === 'KeyS') {
            choosenShip.position.y -= 3;
        } else if (e.code === 'KeyE') {
            if (choosenShip.name === 'mediumShip') {
                if (!isTurned) {
                    choosenShip.rotation.y += Math.PI / 2;
                    choosenShip.position.x -= 1.6;
                    choosenShip.position.y += 1.6;
                    isTurned = true;
                } else {
                    choosenShip.rotation.y -= Math.PI / 2;
                    choosenShip.position.x += 1.6;
                    choosenShip.position.y -= 1.6;
                    isTurned = false;
                }
            } else {
                if (!isTurned) {
                    choosenShip.rotation.y += Math.PI / 2;
                    isTurned = true;
                } else {
                    choosenShip.rotation.y -= Math.PI / 2;
                    isTurned = false;
                }
            }
        } else if (e.code === 'KeyQ') {
            const shipPosConf = {
                pos: choosenShip.position,
                turn: isTurned
            };
            setPropertyToStorage(`${choosenShip.name}`, shipPosConf);
            setedShips.push(choosenShip.name);
            choosenShip = null;
            getShipSize();
        }
        setedShips.length === 4?  document.removeEventListener('click', chooseShip): console.log();
    }
}

document.addEventListener('click', chooseShip);
document.addEventListener('keypress', moveShip);

