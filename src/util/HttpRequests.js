import {post, httpDelete} from "./Http";
import {announcementUrl} from "./Parameters";
import Globals from "./Globals";

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