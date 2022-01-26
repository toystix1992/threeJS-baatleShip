import {PlaneGeometry, MeshStandardMaterial, Mesh, TextureLoader} from "three";
import { loadingManager } from "../helpers/loadingManager";

const groundGeometry = new PlaneGeometry(18, 18)
const groundMaterial = new MeshStandardMaterial({
  roughness: 0.8,
  metalness: 0.4,
});
const ground = new Mesh(groundGeometry, groundMaterial);
const textureLoader = new TextureLoader(loadingManager);

textureLoader.load("textures/fieldTexture.jpg", (map) => {
  map.wrapS = TextureLoader.RepeatWrapping;
  map.wrapT = TextureLoader.RepeatWrapping;
  map.anisotropy = 16;
  map.repeat.set(6, 6);
  groundMaterial.map = map;
  groundMaterial.needsUpdate = true;
});
ground.rotation.x = Math.PI * - 0.5;
console.log(ground);
export default ground;
