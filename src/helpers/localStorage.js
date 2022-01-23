export const setPropertyToStorage = (key, value) => {
    window.localStorage.setItem(key, JSON.stringify(value));
}
export const getPropertyFromStorage = (key) => {
    return JSON.parse(window.localStorage.getItem(key));
}
export const removePropertyFromStorage = (key) => {
    window.localStorage.removeItem(key);
}
