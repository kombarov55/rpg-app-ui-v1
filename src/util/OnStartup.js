import {announcementUrl, loginUrl, userAccountUrl} from "./Parameters";
import {store} from "../data-layer/Store";
import {addAnnouncement, addUserAccount} from "../data-layer/ActionCreators";
import {get, postWithoutAuth} from "./Http";
import Globals from "./Globals";

function loadAnnouncements() {
    get(announcementUrl, xs => xs.forEach(x => store.dispatch(addAnnouncement(x))))
}

export function onStartup() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const userId = urlSearchParams.get("user_id")
    Globals.userId = userId == null ? "33167934" : userId

    postWithoutAuth(loginUrl, {login: Globals.userId}, rs => {
        Globals.authToken = rs.token

        get(userAccountUrl(Globals.userId), rs => {
            store.dispatch(addUserAccount(rs))
            loadAnnouncements()
        })
    })
}