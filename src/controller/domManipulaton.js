const playerTitle = document.querySelector('.player-title');
const largeCounter = document.querySelector('.large-counter');
const mediumCounter = document.querySelector('.medium-counter');
const firstSmallCounter = document.querySelector('.firstsmall-counter');
const secondtSmallCounter = document.querySelector('.secondtsmall-counter');

let firstLargse = 3;
let secondLargse = 3;
let firstMedium = 2;
let secondMedium = 2;
let firstSmallOne = 1;
let secondSmallOne = 1;
let firstSmallTwo = 1;
let secondSmallTwo = 1;
let firstTotal = 7;
let secondTotal = 7;

export const addTitleDiscription = (player, text) => {
    playerTitle.innerHTML = `${player} ${text}`;
};
export const hitCounter = (player, shot) => {
    if(player === 'first') {
        if(shot === 'largeShip') {
            firstLargse -= 1;
            firstTotal -=1;
        } else if(shot === 'mediumShip') {
            firstMedium -= 1;
            firstTotal -=1;
        } else if (shot === 'smallShipOne') {
            firstSmallOne -= 1;
            firstTotal -=1;
        }  else if (shot === 'smallShipTwo') {
            firstSmallTwo -= 1;
            firstTotal -=1;
        };
        console.log(firstTotal)
        if(firstTotal === 0) alert('First Player win');
        largeCounter.innerHTML = `${firstLargse}`;
        mediumCounter.innerHTML = `${firstMedium}`;
        firstSmallCounter.innerHTML = `${firstSmallOne}`;
        secondtSmallCounter.innerHTML = `${firstSmallTwo}`;
    } else {
        if(shot === 'largeShip') {
            secondLargse -= 1;
            secondTotal -=1;
        } else if(shot === 'mediumShip') {
            secondMedium -= 1;
            secondTotal -=1;
        } else if (shot === 'smallShipOne') {
            secondSmallOne -= 1;
            secondTotal -=1;
        }  else if (shot === 'smallShipTwo') {
            secondSmallTwo -= 1;
            secondTotal -=1;
        }
        console.log(secondTotal)
        if(secondTotal === 0) alert('Second Player win')
        largeCounter.innerHTML = `${secondLargse}`;
        mediumCounter.innerHTML = `${secondMedium}`;
        firstSmallCounter.innerHTML = `${secondSmallOne}`;
        secondtSmallCounter.innerHTML = `${secondSmallTwo}`;
    }
    console.log(player, shot);
}