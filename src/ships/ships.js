import getGLTFModel from '../loaders/gltfLoader';

const setArrayOfGLTF = async () => {
    const GLTFArr = [];
    let ship = await getGLTFModel(['ships/large.glb', 'ships/medium.gltf', 'ships/small.gltf']);
    console.log(ship, 'dsadas');
};
setArrayOfGLTF();

