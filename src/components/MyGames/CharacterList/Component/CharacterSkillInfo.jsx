import List from "../../../Common/Lists/List";
import React from "react";
import CornerListItem from "../../../Common/ListElements/CornerListItem";
import ArithmeticModifiers from "../../../../data-layer/enums/ArithmeticModifiers";

export default function ({learnedSkills, equippedItems}) {
    return (
        <List values={learnedSkills.map(({skill, amount}) =>
            <CornerListItem
                left={skill.name}
                right={calculateSkillSkillInfluence(skill, amount, equippedItems)}
            />
        )}
        />
    )
}

function calculateSkillSkillInfluence(skill, amount, equippedItems) {
    return equippedItems.flatMap(v => v.skillInfluences)
        .filter(v => v.skill.id === skill.id)
        .reduce((result, skillInfluence) => {
            const modifier = skillInfluence.modifier.name
            const modifyAmount = skillInfluence.amount

            if (modifier === ArithmeticModifiers.PLUS) {
                return result + modifyAmount
            }
            if (modifier === ArithmeticModifiers.MINUS) {
                return result - modifyAmount
            }
            if (modifier === ArithmeticModifiers.MULTIPLY) {
                return result * modifyAmount
            }
            if (modifier === ArithmeticModifiers.DIVIDE) {
                return result / modifyAmount
            }
        }, amount)
}