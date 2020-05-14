import Globals from "./Globals";

export function get(url, onSuccess) {
    const xhr = new XMLHttpRequest()
    xhr.open("GET", url, true)
    xhr.setRequestHeader("Authorization", "Bearer " + Globals.authToken)
    xhr.send()
    if (onSuccess != null) {
        xhr.onload = function () {
            onSuccess(parseResponse(xhr.responseText))
        }
    }
}

export function post(url, body, onSuccess) {
    const xhr = new XMLHttpRequest()
    xhr.open("POST", url, true)
    xhr.setRequestHeader("Authorization", "Bearer " + Globals.authToken)
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send(JSON.stringify(body))

    if (onSuccess != null) {
        xhr.onload = function () {
            onSuccess(parseResponse(xhr.responseText))
        }
    }
}

export function httpDelete(url, onSuccess) {
    const xhr = new XMLHttpRequest()
    xhr.open("DELETE", url, true)
    xhr.setRequestHeader("Authorization", "Bearer " + Globals.authToken)
    xhr.send()

    if (onSuccess != null) {
        xhr.onload = function () {
            onSuccess()
        }
    }
}


export function patch(url, body, onSuccess) {
    const xhr = new XMLHttpRequest()
    xhr.open("PATCH", url, true)
    xhr.setRequestHeader("Authorization", "Bearer " + Globals.authToken)
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send(body)

    if (onSuccess != null) {
        xhr.onload = function () {
            onSuccess(parseResponse(xhr.responseText))
        }
    }
}

export function put(url, body, onSuccess) {
    const xhr = new XMLHttpRequest()
    xhr.open("PUT", url, true)
    xhr.setRequestHeader("Authorization", "Bearer " + Globals.authToken)
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send(JSON.stringify(body))

    if (onSuccess != null) {
        xhr.onload = function () {
            onSuccess(parseResponse(xhr.responseText))
        }
    }
}

function parseResponse(rs) {
    try {
        return JSON.parse(rs)
    } catch (ignored) {
        return {}
    }
}