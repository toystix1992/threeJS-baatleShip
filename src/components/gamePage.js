import water from '../view/waterGeometry';
import ground from '../view/ground';

const gamePage = (scene) => {
    const playerTitile= document.querySelector('.player-title');
    playerTitile.textContent = 'Player 1 game';
    //ground
    scene.add(ground);
    //water
    scene.add(water);
}

export default gamePage;
