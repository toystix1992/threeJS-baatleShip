import water from '../view/waterGeometry';
import ground from '../view/ground';

export const gamePageOne = (scene) => {
    const playerTitile= document.querySelector('.player-title');
    playerTitile.textContent = 'Player 1 game';
    //ground
    scene.add(ground);
    //water
    scene.add(water);
};
export const gamePageTwo = (scene) => {
    const playerTitile= document.querySelector('.player-title');
    playerTitile.textContent = 'Player 2 game';
    //ground
    scene.add(ground);
    //water
    scene.add(water);
};
