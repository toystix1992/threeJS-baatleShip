import wavesFlag from '../view/wavesFlag';
import {findStartBtnIntersect} from '../helpers/intersect';
import getPage from '../storage/getPage';
import gsap from "gsap";



const homePage = (scene) => {
    scene.add(wavesFlag);
    console.log(scene);
};

const navToSetting = async () => {
    const intersect = findStartBtnIntersect();
    if(intersect.length > 0) {
        const btn = intersect[0];
        await gsap.to(btn.object.position, { duration: 1, delay: 0.3, x: 12});
        getPage('settingOne');
    }
}


document.addEventListener('click', navToSetting);
export default homePage;
