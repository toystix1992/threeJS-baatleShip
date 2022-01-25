import {LoadingManager} from "three";
import { setPropertyToStorage } from "./localStorage";

const loadingManager = new LoadingManager(() => {
  setPropertyToStorage("loading", false);
});

loadingManager.onStart = () => {
  setPropertyToStorage("loading", true);
};

export { loadingManager };
