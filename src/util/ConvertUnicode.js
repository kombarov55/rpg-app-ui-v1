export default function (str) {
    return str.replace(/\\u(\w\w\w\w)/g, function (a, b) {
        var charcode = parseInt(b, 16);
        return String.fromCharCode(charcode);
    });
}