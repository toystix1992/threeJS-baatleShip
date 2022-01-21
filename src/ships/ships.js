
const ships = ['ships/large.glb', 'ships/large.glb','ships/large.glb']
export const shipsArray = [];
export const loadShips = (ship, scene) => {
    const loader = new GLTFLoader();
    ships.forEach((link, idx) => {
        loader.load(link, (gltf) => {
            ship = gltf.scene;
            scene.add(ship);
            ship.name = 'ship';
            ship.children.forEach(el => {
                el.name = 'ship';
            });
            // console.log(ship);
            shipsArray.push(ship);
            ship.position.set(idx * 3, 0.6, 0);
        }, undefined, (error) => {
            console.error(error);
        });
    });
    return loader;
};

