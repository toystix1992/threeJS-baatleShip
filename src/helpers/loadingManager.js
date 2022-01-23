import * as THREE from "three"
import { setPropertyToStorage, getPropertyFromStorage } from "./localStorage"

const loadingManager = new THREE.LoadingManager(() => {
  setPropertyToStorage("loading", false)
})

loadingManager.onStart = (url, loaded, itemsTotal) => {
  setPropertyToStorage("loading", true)
}

export { loadingManager }
