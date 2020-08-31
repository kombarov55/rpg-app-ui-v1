export default function (viewName, params) {
    let url = "/" + viewName
    if (params !== undefined) {
        url += JSON.stringify(params)
    }

    window.history.pushState("", viewName, url)
}