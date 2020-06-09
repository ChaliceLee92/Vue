import Cookies from 'js-cookie'

export function getToken(TokenKey) {
    return Cookies.get(TokenKey)
}

export function setToken(TokenKey, token) {
    return Cookies.set(TokenKey, token)
}

export function removeToken(TokenKey) {
    return Cookies.remove(TokenKey)
}

export function setLocalStorage(key, value) {
    return window.localStorage.setItem(key, value)
}

export function getLocalStorage(key) {
    return window.localStorage.getItem(key)
}

export function RemoveLocalStorage(key) {
    return window.localStorage.removeItem(key)
}

export function ClearLocalStorage() {
    return window.localStorage.clear()
}

export function setSessionStorage(key, value) {
    return window.sessionStorage.setItem(key, value)
}

export function getSessionStorage(key) {
    return window.sessionStorage.getItem(key)
}

export function RemoveSessionStorage(key) {
    return window.sessionStorage.removeItem(key)
}

export function ClearSessionStorage() {
    return window.sessionStorage.clear()
}
