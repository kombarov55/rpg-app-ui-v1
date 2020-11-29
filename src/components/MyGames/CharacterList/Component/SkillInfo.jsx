import List from "../../../Common/Lists/List";
import React from "react";
import CornerListItem from "../../../Common/ListElements/CornerListItem";
import CalculateSkillInfluence from "../../../../util/CalculateSkillInfluence";

export default function ({skillToLvlList, equippedItems}) {
    console.log({skillToLvlList: skillToLvlList})

    return (
        <List values={skillToLvlList.map(({skill, amount}) =>
            <CornerListItem
                left={skill.name}
                right={CalculateSkillInfluence(skill, amount, equippedItems)}
            />
        )}
        />
    )
}