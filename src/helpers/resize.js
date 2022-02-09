const resize = (camera, renderer) => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.fov = 70/(window.innerWidth / window.innerHeight + 0.2)
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

export default resize;
// window.innerWidth / window.innerHeight;s