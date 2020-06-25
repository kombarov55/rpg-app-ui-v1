export default function (priceCombination) {
    return priceCombination
        .map(price =>
            price
                .map(currencyNameToAmount => currencyNameToAmount.name + ": " + currencyNameToAmount.amount)
                .join(" + "))
        .join(" или ")
}