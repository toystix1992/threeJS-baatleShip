import scene from '../helpers/initial/scene';
import settingPage from '../components/settingPage';
import homePage from '../components/homePage';
let page = 'setting';

const getPage = () => {
    if (page === 'setting') {
        settingPage(scene);
    } else if (page === 'home') {
        homePage(scene);
    }
}

export default getPage;
