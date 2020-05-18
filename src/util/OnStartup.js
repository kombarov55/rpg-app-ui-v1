import {announcementUrl, userAccountUrl} from "./Parameters";
import {store} from "../data-layer/Store";
import {addAnnouncement, addAnnouncementDeprecated, addUserAccount} from "../data-layer/ActionCreators";
import {loginUrl} from "./Parameters";
import {get} from "./Http";
import Globals from "./Globals";

function loadAnnouncements() {
    get(announcementUrl, xs => xs.forEach(x => store.dispatch(addAnnouncement(x))))
}

function saveAuthToken() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const userId = urlSearchParams.get("user_id")
    Globals.userId = userId == null ? "33167934" : userId

    return fetch(loginUrl, {
        method: "POST",
        headers: new Headers({
            'Content-Type': 'application/json;charset=utf-8'
        }),
        body: JSON.stringify({
            login: Globals.userId
        })
    })
        .then(rs => rs.json())
        .then(json => Globals.authToken = json["token"])
}

export function onStartup() {
    saveAuthToken().then(() => {
        get(userAccountUrl(Globals.userId), rs => {
            store.dispatch(addUserAccount(rs))
            loadAnnouncements()
        })

    })


}