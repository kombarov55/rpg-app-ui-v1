export default function(x, defaultValue) {
    return x == null || x === "" ? defaultValue : x
}