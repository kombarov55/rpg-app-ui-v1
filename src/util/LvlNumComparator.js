export default function (x1, x2) {
    const lvl1 = x1.lvlNum
    const lvl2 = x2.lvlNum

    if (lvl1 > lvl2) {
        return 1
    }

    if (lvl1 < lvl2) {
        return -1
    } else {
        return 0
    }
}