import scene from '../helpers/initial/scene';
import {gamePage} from '../components/gamePage';
import {settingPage} from '../components/settingPage';
// import homePage from '../components/homePage';

const getPage = () => {
    settingPage(scene);
    gamePage(scene);
};

export default getPage;
