import Globals from "./Globals";
import {uploadUrl} from "./Parameters";
import axios from "axios"
import getOrDefault from "./getOrDefault";

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

export function post(url, body, onSuccess, onFailure) {
    const onSuccessCallback = onSuccess == null ? () => {} : onSuccess
    const onFailureCallback = onFailure == null ? () => {} : onFailure

    const xhr = new XMLHttpRequest()
    xhr.open("POST", url, true)
    xhr.setRequestHeader("Authorization", "Bearer " + Globals.authToken)
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send(JSON.stringify(body))

    xhr.onload = function () {
        if (xhr.status === 200) {
            onSuccessCallback(parseResponse(xhr.responseText))
        } else {
            onFailureCallback()
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
            onSuccess(parseResponse(xhr.responseText))
        }
    }
}


export function patch(url, body, onSuccess, onFailure) {
    const onSuccessCallback = getOrDefault(onSuccess, () => {})
    const onFailureCallback = getOrDefault(onFailure, () => {})

    const xhr = new XMLHttpRequest()
    xhr.open("PATCH", url, true)
    xhr.setRequestHeader("Authorization", "Bearer " + Globals.authToken)
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send(JSON.stringify(body))

    xhr.onload = function () {
        if (xhr.status === 200) {
            onSuccessCallback(parseResponse(xhr.responseText))
        } else {
            onFailureCallback()
        }
    }
}

export function put(url, body, onSuccess, onFailure) {
    const onSuccessCallback = getOrDefault(onSuccess, () => {})
    const onFailureCallback = getOrDefault(onFailure, () => {})

    const xhr = new XMLHttpRequest()
    xhr.open("PUT", url, true)
    xhr.setRequestHeader("Authorization", "Bearer " + Globals.authToken)
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send(JSON.stringify(body))

    xhr.onload = function () {
        if (xhr.status === 200) {
            onSuccessCallback(parseResponse(xhr.responseText))
        } else {
            onFailureCallback()
        }
    }
}

export function upload(url, file, onSuccess) {
    const formData = new FormData()
    formData.append("file", file)

    axios.post(url, formData, {
        headers: {
            "content-type": "multipart/form-data"
        }
    }).then(rs => onSuccess(rs))
}

function parseResponse(rs) {
    try {
        return JSON.parse(rs)
    } catch (ignored) {
        return {}
    }
}