export default function(item, arr, predicate = (x1, x2) => x1.id === x2.id) {
    return predicate(item, arr[arr.length - 1])
}