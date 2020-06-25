export default function (price) {
    return price
        .map(currencyNameToAmount => currencyNameToAmount.name + ": " + currencyNameToAmount.amount)
        .join(" + ")
}