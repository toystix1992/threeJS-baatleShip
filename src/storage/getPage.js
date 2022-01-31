import scene from '../helpers/initial/scene';
import {gamePageOne, gamePageTwo} from '../components/gamePage';
import {settingPageOne, settingPageTwo} from '../components/settingPage';
import homePage from '../components/homePage';

const getPage = (page) => {
    if (page === 'settingOne') {
        settingPageOne(scene);
    } else if (page === 'settingTwo') {
        settingPageTwo(scene);
    }
    else if (page === 'home') {
        homePage(scene);
    } else if (page === 'gameOne') {
        gamePageOne(scene);
    } else if (page === 'gameTwo') {
        gamePageTwo(scene);
    }
}

export default getPage;
