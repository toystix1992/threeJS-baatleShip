import * as THREE from "three"
import { loadingManager } from "../helpers/loadingManager"

const groundGeometry = new THREE.PlaneGeometry(20, 20)
const groundMaterial = new THREE.MeshStandardMaterial({
  roughness: 0.8,
  metalness: 0.4,
})
const ground = new THREE.Mesh(groundGeometry, groundMaterial)
const textureLoader = new THREE.TextureLoader(loadingManager)

textureLoader.load("textures/fieldTexture.jpg", (map) => {
  map.wrapS = THREE.RepeatWrapping
  map.wrapT = THREE.RepeatWrapping
  map.anisotropy = 16
  map.repeat.set(6, 6)
  groundMaterial.map = map
  groundMaterial.needsUpdate = true
})

export default ground
