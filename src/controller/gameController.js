import setedShipsPos from '../storage/setedShipsPos';
import {plane} from '../helpers/mesh/plane';
import {shoots} from '../storage/gameStarage';
import {firstGameGround, secondGameGround} from '../view/ground';

export const planesPos = [];
let x = -3.5;
let y = 2.5;

for (let i = 0; i < 36; i++) {
    if (x < 2.5) {
        x += 1;
    } else {
        x = -2.5;
        y -= 1;
    }
    const pos = {
        x: x,
        y: y,
        z: 0.01
    }
    planesPos.push(pos);
}

planesPos.forEach((pos, idx) => {
    const newPlaneOne = plane(0.9, 0.9, {
        color: 0x0000FF,
        opacity: 0,
        transparent: true
    });
    const newPlaneTwo = plane(0.9, 0.9, {
        color: 0x0000FF,
        opacity: 0,
        transparent: true
    });
    newPlaneOne.name = `${idx}`;
    newPlaneOne.position.set(
        pos.x,
        pos.y,
        pos.z
    );
    newPlaneTwo.name = `${idx}`;
    newPlaneTwo.position.set(
        pos.x,
        pos.y,
        pos.z
    );
    firstGameGround.add(newPlaneOne);
    secondGameGround.add(newPlaneTwo);
});