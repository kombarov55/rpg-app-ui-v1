import List from "../../../Common/Lists/List";
import CornerListItem from "../../../Common/ListElements/CornerListItem";
import React from "react";
import SkillStatsAmountToString from "../../../../util/SkillStatsAmountToString";

export default function ({skillStats}) {
    return (
        <List values={skillStats.map(skillStatsDto =>
            <CornerListItem left={skillStatsDto.skillName}
                            right={SkillStatsAmountToString(skillStatsDto.initialAmount, skillStatsDto.bonusAmount)}
            />
        )}/>
    )
}