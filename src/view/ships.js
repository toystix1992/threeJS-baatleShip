import getGLTFModel from '../loaders/gltfLoader';
import water from './waterGeometry';
import { findIntersect } from '../helpers/intersect';
import { setPropertyToStorage, getPropertyFromStorage } from '../helpers/localStorage';
import {getShipZone} from './checker/checker';

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
                    gltf.scene.scale.set(0.6, 0.5, 0.5);
                    gltf.scene.position.set(4.5, 1.5, -0.3);

                } else if (gltf.scene.name === 'mediumShip') {
                    gltf.scene.scale.set(0.5, 0.4, 0.4);
                    gltf.scene.position.set(4.2, 0, -0.12);
                } else {
                    gltf.scene.scale.set(1, 1, 1);
                    if (gltf.scene.name === 'smallShipOne') {
                        gltf.scene.position.set(4, -1, -0.02);
                    } else if (gltf.scene.name === 'smallShipTwo') {
                        gltf.scene.position.set(4, -2, -0.02);
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
        isTurned = false;
        choosenShip = intersect[0].object.parent.parent;
        if(!setedShips.includes( choosenShip.name)) {
            if (choosenShip.name === 'mediumShip') {
                choosenShip.position.x = 0;
                choosenShip.position.y = 0.5;
            } else if (
                choosenShip.name === 'smallShipOne' ||
                choosenShip.name === 'smallShipTwo' ||
                choosenShip.name === 'largeShip'
            ) {
                choosenShip.position.x = 0.5;
                choosenShip.position.y = 0.5;
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
            choosenShip.position.x += 1;
        } else if (e.code === 'KeyA') {
            choosenShip.position.x -= 1;
        } else if (e.code === 'KeyW') {
            choosenShip.position.y += 1;
        } else if (e.code === 'KeyS') {
            choosenShip.position.y -= 1;
        } else if (e.code === 'KeyE') {
            if (choosenShip.name === 'mediumShip') {
                if (!isTurned) {
                    choosenShip.rotation.y += Math.PI / 2;
                    choosenShip.position.x -= 0.5;
                    choosenShip.position.y += 0.5;
                    isTurned = true;
                } else {
                    choosenShip.rotation.y -= Math.PI / 2;
                    choosenShip.position.x += 0.5;
                    choosenShip.position.y -= 0.5;
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
                console.log(isTurned);
            }
        } else if (e.code === 'KeyQ') {
            const shipPosConf = {
                pos: choosenShip.position,
                turn: isTurned
            };
            setPropertyToStorage(`${choosenShip.name}`, shipPosConf);
            setedShips.push(choosenShip.name);
            choosenShip = null;
            getShipZone();
        }
        setedShips.length === 4?  document.removeEventListener('click', chooseShip): console.log();
    }
}

document.addEventListener('click', chooseShip);
document.addEventListener('keypress', moveShip);

