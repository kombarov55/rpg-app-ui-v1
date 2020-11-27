import {allUsersShortUrl, announcementUrl, loginUrl, notificationUrl, userAccountUrl} from "./Parameters";
import {store} from "../data-layer/Store";
import {addAnnouncement, addUserAccount, setUserAccounts} from "../data-layer/ActionCreators";
import {get, postWithoutAuth} from "./Http";
import Globals from "./Globals";
import Popup from "./Popup";
import NotificationSeverity from "../data-layer/enums/NotificationSeverity";

function loadAnnouncements() {
    get(announcementUrl, xs => xs.forEach(x => store.dispatch(addAnnouncement(x))))
}

function startNotificationPolling() {
    setInterval(() => get(notificationUrl, rs => {
        rs.forEach(notification => {
            switch (notification.severity) {
                case NotificationSeverity.GOOD:
                    Popup.success(notification.text)
                    break
                case NotificationSeverity.NORMAL:
                    Popup.info(notification.text)
                    break
                case NotificationSeverity.BAD:
                    Popup.error(notification.text)
                    break
                default:
                    Popup.info(notification.text)
                    break
            }
        })
    }), 15000)

}

export function onStartup() {
    console.log(window.location)

    const urlSearchParams = new URLSearchParams(window.location.search);
    const userId = urlSearchParams.get("user_id")
    Globals.userId = userId == null ? "33167934" : userId

    postWithoutAuth(loginUrl, {login: Globals.userId}, rs => {
        Globals.authToken = rs.token

        get(userAccountUrl(Globals.userId), rs => {
            store.dispatch(addUserAccount(rs))
            loadAnnouncements()
            Popup.success(`Привет, ${rs.firstName}!`)
        })

        get(allUsersShortUrl, rs => store.dispatch(setUserAccounts(rs)))

        startNotificationPolling()
    })
}