import {post, httpDelete} from "./Http";
import {announcementUrl, uploadServerUrl, uploadUrl} from "./Parameters";
import Globals from "./Globals";
import axios from "axios"

export async function createAnnouncement(
    title,
    gameType,
    sex,
    minAge,
    maxAge,
    description,
    anonymous,
    commentsEnabled,
    uploadUid,

    onSuccess
) {
    const body = {
        authorId: Globals.userId,
        creationDate: new Date().getTime(),
        title: title,
        gameType: gameType,
        sex: sex,
        minAge: minAge,
        maxAge: maxAge,
        description: description,
        anonymous: anonymous,
        commentsEnabled: commentsEnabled,
        uploadUid: uploadUid
    }

    return post(announcementUrl, body, onSuccess)
}

export async function deleteAnnouncementFromServer(id) {
    return httpDelete(announcementUrl + "/" + id)
}

export function upload(eventFile, filenameConsumer) {
    const formData = new FormData()
    formData.append("file", eventFile)

    axios.post(uploadUrl, formData, {
        headers: {
            "content-type": "multipart/form-data"
        }
    }).then(rs => filenameConsumer(uploadServerUrl + "/" + rs.data.filename))
}