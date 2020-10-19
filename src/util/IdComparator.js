export default function(x1, x2) {
    if (x1.id > x2.id) {
        return 1
    } else if (x1.id < x2.id) {
        return -1
    } else {
        return 0
    }
}