import {msgLongpollUrl} from "./Parameters";
import Globals from "./Globals";

export default function (
    conversationId,
    lastMsgCreationDate,
    onMsgReceived,
    onError = () => alert("error while longpolling")
) {

    function start(url) {
        console.log("longpoll start")
        const xhr = new XMLHttpRequest()
        xhr.open("GET", url, true)
        xhr.send()
        xhr.onload = function() {
            if ((xhr.status + "").startsWith("2")) {
                console.log("longpoll received: ")
                console.log(xhr.responseText)

                const msgs = JSON.parse(xhr.responseText)
                onMsgReceived(msgs)

                const lastMsgCreationDate = msgs[0].creationDate

                start(msgLongpollUrl(conversationId, lastMsgCreationDate, Globals.userId))
            }  else {
                onError()
            }
        }
    }

    return {
        start: () => start(msgLongpollUrl(conversationId, lastMsgCreationDate, Globals.userId))
    }
}