import ArithmeticModify from "./ArithmeticModify";

export default function(skill, initialAmount, equippedItems) {
    return equippedItems.flatMap(v => v.skillInfluences)
        .filter(v => v.skill.id === skill.id)
        .reduce((result, skillInfluence) => {
            const {modifier, amount} = skillInfluence

            return ArithmeticModify(result, modifier, amount)
        }, initialAmount)
}