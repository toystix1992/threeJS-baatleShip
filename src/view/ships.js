import getGLTFModel from '../helpers/loaders/gltfLoader';
import {water, newWater} from './waterGeometry';
import { firstPlayerIntersect, secondPlayerIntersect } from '../helpers/intersect';
import {checkShipsIntersections, checkFieldBorders, checkRotateEnable} from '../controller/shipController';
import {initialShipPos} from '../config/config';

const setedShips = [];
let choosenShip = null;
let isTurned = false;
let player = 'first';
let intersect;


export const ships = () => {
    getGLTFModel(['ships/large.gltf', 'ships/medium.gltf', 'ships/small.gltf', 'ships/small.gltf']).
        then((gltfs) => {
            gltfs[0].scene.name = 'largeShip';
            gltfs[1].scene.name = 'mediumShip';
            gltfs[2].scene.name = 'smallShipOne';
            gltfs[3].scene.name = 'smallShipTwo';
            gltfs.forEach((gltf) => {
                gltf.scene.rotation.x = Math.PI / 2;
                gltf.scene.rotation.y = Math.PI / 2;
                if (gltf.scene.name === 'largeShip') {
                    gltf.scene.scale.set(0.6, 0.5, 0.5);
                    gltf.scene.position.set(
                        initialShipPos.large.x,
                        initialShipPos.large.y,
                        initialShipPos.large.z
                    );
                } else if (gltf.scene.name === 'mediumShip') {
                    gltf.scene.scale.set(0.5, 0.4, 0.4);
                    gltf.scene.position.set(
                        initialShipPos.medium.x,
                        initialShipPos.medium.y,
                        initialShipPos.medium.z
                    );
                } else {
                    gltf.scene.scale.set(1, 1, 1);
                    if (gltf.scene.name === 'smallShipOne') {
                        gltf.scene.position.set(
                        initialShipPos.smallOne.x,
                        initialShipPos.smallOne.y,
                        initialShipPos.smallOne.z
                        );
                    } else if (gltf.scene.name === 'smallShipTwo') {
                        gltf.scene.position.set(
                        initialShipPos.smallTwo.x,
                        initialShipPos.smallTwo.y,
                        initialShipPos.smallTwo.z
                        );
                    }
                }
                const cloneShips = gltf.scene.clone();
                water.add(gltf.scene);
                newWater.add(cloneShips);
            });
        });
};
// export const cloneShips = () => {
//     getGLTFModel(['ships/large.gltf', 'ships/medium.gltf', 'ships/small.gltf', 'ships/small.gltf']).
//         then((gltfs) => {
//             gltfs[0].scene.name = 'largeShip';
//             gltfs[1].scene.name = 'mediumShip';
//             gltfs[2].scene.name = 'smallShipOne';
//             gltfs[3].scene.name = 'smallShipTwo';
//             gltfs.forEach((gltf) => {
//                 gltf.scene.rotation.x = Math.PI / 2;
//                 gltf.scene.rotation.y = Math.PI / 2;
//                 if (gltf.scene.name === 'largeShip') {
//                     gltf.scene.scale.set(0.6, 0.5, 0.5);
//                     gltf.scene.position.set(
//                         initialShipPos.large.x,
//                         initialShipPos.large.y,
//                         initialShipPos.large.z
//                     );
//                 } else if (gltf.scene.name === 'mediumShip') {
//                     gltf.scene.scale.set(0.5, 0.4, 0.4);
//                     gltf.scene.position.set(
//                         initialShipPos.medium.x,
//                         initialShipPos.medium.y,
//                         initialShipPos.medium.z
//                     );
//                 } else {
//                     gltf.scene.scale.set(1, 1, 1);
//                     if (gltf.scene.name === 'smallShipOne') {
//                         gltf.scene.position.set(
//                         initialShipPos.smallOne.x,
//                         initialShipPos.smallOne.y,
//                         initialShipPos.smallOne.z
//                         );
//                     } else if (gltf.scene.name === 'smallShipTwo') {
//                         gltf.scene.position.set(
//                         initialShipPos.smallTwo.x,
//                         initialShipPos.smallTwo.y,
//                         initialShipPos.smallTwo.z
//                         );
//                     }
//                 }
//                 newWater.add(gltf.scene);
//             });
//         });
// };
export const chooseShip = () => {
    player === 'first'?
    intersect = firstPlayerIntersect():
    intersect = secondPlayerIntersect();
    if (intersect.length > 0) {
        isTurned = false;
        choosenShip = intersect[0].object.parent.parent;
        if (!setedShips.includes(choosenShip.name)) {
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

const moveShip = (e) => {
    if (
        choosenShip != null &&
        !setedShips.includes(choosenShip.name)
    ) {
        if (e.code === 'KeyD') {
            checkFieldBorders(choosenShip, 'KeyD', isTurned) ?
                choosenShip.position.x += 1 : choosenShip;
        } else if (e.code === 'KeyA') {
            checkFieldBorders(choosenShip, 'KeyA', isTurned) ?
                choosenShip.position.x -= 1 : choosenShip;
        } else if (e.code === 'KeyW') {
            checkFieldBorders(choosenShip, 'KeyW', isTurned) ?
                choosenShip.position.y += 1 : choosenShip;
        } else if (e.code === 'KeyS') {
            checkFieldBorders(choosenShip, 'KeyS', isTurned) ?
                choosenShip.position.y -= 1 : choosenShip;
        } else if (e.code === 'KeyE') {
            if (choosenShip.name === 'mediumShip') {
                if (checkRotateEnable(choosenShip, isTurned)) {
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
                }
            } else {
                if (checkRotateEnable(choosenShip, isTurned)) {
                    if (!isTurned) {
                        choosenShip.rotation.y += Math.PI / 2;
                        isTurned = true;
                    } else {
                        choosenShip.rotation.y -= Math.PI / 2;
                        isTurned = false;
                    }
                }
            }
        } else if (e.code === 'KeyQ') {
            const shipPosConf = {
                name: choosenShip.name,
                pos: choosenShip.position,
                turn: isTurned
            };
            if(checkShipsIntersections(shipPosConf)) {
                alert('please choose another position');
                choosenShip.position.y = 1.5;
                choosenShip.position.x = -4
                choosenShip = null;
            } else {
            setedShips.push(shipPosConf);
            choosenShip = null;
            }
        }
        setedShips.length === 8 ? document.removeEventListener('click', chooseShip) : console.log();
    }
};

document.addEventListener('click', chooseShip);
document.addEventListener('keypress', moveShip);

