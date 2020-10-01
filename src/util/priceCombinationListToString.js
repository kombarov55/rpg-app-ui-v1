export default function (priceCombination) {
    if (priceCombination.length == 0) {
        return "Бесплатно!"
    }

    return priceCombination
        .map(price =>
            price
                .map(currencyNameToAmount => currencyNameToAmount.name + ": " + currencyNameToAmount.amount)
                .join(" + "))
        .join(" или ")
}