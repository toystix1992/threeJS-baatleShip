import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { loadingManager } from "../loadingManager";

const loader = new GLTFLoader(loadingManager)

const getGLTFModel = async (paths) => {
    const gltfs = await Promise.all(paths.map((path) => loader.loadAsync(path)))
    return gltfs
}

export default getGLTFModel
