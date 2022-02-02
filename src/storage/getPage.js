import scene from '../helpers/initial/scene';
import {gamePage} from '../components/gamePage';
import {settingPage} from '../components/settingPage';
import homePage from '../components/homePage';

const getPage = (page) => {
    if (page === 'setting') {
        settingPage(scene);
    } else if (page === 'home') {
        homePage(scene);
    } else if (page === 'game') {
        gamePage(scene);
    }
};

export default getPage;
