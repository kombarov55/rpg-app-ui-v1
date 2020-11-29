import ArithmeticModifiers from "../data-layer/enums/ArithmeticModifiers";

export default function(initialAmount, modifier, modifyAmount) {
    if (modifier.name === ArithmeticModifiers.PLUS) {
        return initialAmount + modifyAmount
    }
    if (modifier.name === ArithmeticModifiers.MINUS) {
        return initialAmount - modifyAmount
    }
    if (modifier.name === ArithmeticModifiers.MULTIPLY) {
        return initialAmount * modifyAmount
    }
    if (modifier.name === ArithmeticModifiers.DIVIDE) {
        return initialAmount / modifyAmount
    }
}