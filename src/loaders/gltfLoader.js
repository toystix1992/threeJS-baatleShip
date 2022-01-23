import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
const loader = new GLTFLoader();

const getGLTFModel = ( arrPath ) => {
    const gltfArr = [];
    arrPath.forEach(path=> {
        loader.load(
            path,
            ( gltf ) => {
                // scene.add( gltf.scene );
                gltfArr.push(gltf.scene);
                // gltf.scene;
            },undefined,
            ( error ) => {
                console.log( 'An error happened', error );
            }
        );
    })
    return gltfArr;
}

export default getGLTFModel;
