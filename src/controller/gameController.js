export const checkFieldBorders = (aim, keyCode) => {
    if (keyCode === 'KeyD') {
        if (aim.position.x > 1.5) {
            return false;
        } else {
            return true;
        }
    } else if (keyCode === 'KeyA') {
        if (aim.position.x < -1.5) {
            return false;
        } else {
            return true;
        }
    } else if (keyCode === 'KeyW') {
        if (aim.position.y > 1.5) {
            return false;
        } else {
            return true;
        }
    } else if (keyCode === 'KeyS') {
        if (aim.position.y < -1.5) {
            return false;
        } else {
            return true;
        }
    }
};


