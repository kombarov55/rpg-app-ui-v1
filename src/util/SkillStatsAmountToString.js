export default function (initialAmount, bonusAmount) {
    if (bonusAmount > 0) {
        return `${initialAmount + bonusAmount} (+${bonusAmount})`
    }

    if (bonusAmount === 0) {
        return initialAmount
    }

    if (bonusAmount < 0) {
        return `${initialAmount + bonusAmount} (-${bonusAmount})`
    }
}