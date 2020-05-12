export default function (
    buildUrl,
    onMsgReceived,
    onError = () => alert("error while longpolling")
) {

    function start() {
        console.log("longpoll start")
        const xhr = new XMLHttpRequest()
        xhr.open("GET", buildUrl(), true)
        xhr.send()
        xhr.onload = function() {
            if ((xhr.status + "").startsWith("2")) {
                console.log("longpoll received: ")
                console.log(xhr.responseText)
                onMsgReceived(xhr.responseText)
                start()
            }  else {
                onError()
                start()
            }
        }
    }


    return {
        start: start
    }

}