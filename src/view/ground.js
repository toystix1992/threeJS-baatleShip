import {PlaneGeometry, MeshStandardMaterial, Mesh, TextureLoader} from "three";
import { loadingManager } from "../helpers/loadingManager";

const getGround = () => {
  const groundGeometry = new PlaneGeometry(6, 6);
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
}


const groundGeometry = new PlaneGeometry(6, 6);
const groundMaterial = new MeshStandardMaterial({
  roughness: 0.8,
  metalness: 0.4,
});
export const firstSetGround = new Mesh(groundGeometry, groundMaterial);
const textureLoader = new TextureLoader(loadingManager);

textureLoader.load("textures/fieldTexture.jpg", (map) => {
  map.wrapS = TextureLoader.RepeatWrapping;
  map.wrapT = TextureLoader.RepeatWrapping;
  map.anisotropy = 16;
  map.repeat.set(6, 6);
  groundMaterial.map = map;
  groundMaterial.needsUpdate = true;
});
firstSetGround.rotation.x = Math.PI * - 0.5;

export const secondSetGround = firstSetGround.clone();
secondSetGround.position.x = 15;
export const firstGameGround = firstSetGround.clone();
firstGameGround.position.z = 10;
export const secondGameGround = firstSetGround.clone();
secondGameGround.position.z = 10;
secondGameGround.position.x = 15;
