export const intersectFunc = (THREE, camera, mouse, scene) => {
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene);
    debugger
    return intersects;
}
