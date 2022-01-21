import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
const loader = new GLTFLoader();

const getGLTFModel = ( path, scene ) => {
    return loader.load(
        path,
        function ( gltf ) {
            scene.add( gltf.scene );
        },undefined,
        function ( error ) {
            console.log( 'An error happened', error );
        }
    );
}

export default getGLTFModel;
