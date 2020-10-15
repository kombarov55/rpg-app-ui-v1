/**
 * @param amounts: [name: String, amount: Int]
 * @returns {*}
 */
export default function (amounts) {
    return amounts
        .map(amount => amount.name + ": " + amount.amount)
        .join(" + ")
}