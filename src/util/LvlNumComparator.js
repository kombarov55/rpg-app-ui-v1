export default function (x1, x2, propName = "lvlNum") {
    const lvl1 = x1[propName]
    const lvl2 = x2[propName]

    if (lvl1 > lvl2) {
        return 1
    }

    if (lvl1 < lvl2) {
        return -1
    } else {
        return 0
    }
}