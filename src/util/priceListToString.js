export default function (prices) {
    return prices
        .map(price =>
            price
                .map(currencyNameToAmount => currencyNameToAmount.name + ": " + currencyNameToAmount.amount)
                .join(" + "))
        .join(" или ")
}