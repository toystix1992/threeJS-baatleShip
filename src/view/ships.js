import getGLTFModel from '../helpers/loaders/gltfLoader';
import { water, newWater } from './waterGeometry';
import { shipsIntersect } from '../helpers/intersect';
import { checkShipsIntersections, checkFieldBorders, checkRotateEnable }
    from '../controller/shipController';
import { initialShipPos } from '../config/config';
import { getPlayer, setPlayer } from '../storage/player';

const setedShips = [];
let choosenShip = null;
let isTurned = false;
let intersect, newShipPos;
let ismouseDown = false;

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
export const chooseShip = () => {
    ismouseDown = true;
    intersect = shipsIntersect();
    if (intersect.length > 1) {
        isTurned = false;
        choosenShip = intersect[0].object.parent.parent;
        console.log(choosenShip.position);
    }
};
const getNewShipPpos = () => {
    intersect = shipsIntersect();
    if (intersect.length === 1 && ismouseDown) {
        newShipPos = intersect[0].point;
    }
};

const setNewShipPos = () => {
    ismouseDown = false;
    console.log(newShipPos);
    if (newShipPos) {
        choosenShip.position.set(
            newShipPos.x,
            -newShipPos.z,
            choosenShip.position.z
        );
    }

}


document.addEventListener('pointerdown', chooseShip);
document.addEventListener('pointermove', getNewShipPpos);
document.addEventListener('pointerup', setNewShipPos);

