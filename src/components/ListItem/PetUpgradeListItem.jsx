import React from "react";
import ExpandableListItemWithBullets from "../Common/ListElements/ExpandableListItemWithBullets";
import SkillInfluenceToString from "../../util/SkillInfluenceToString";
import AmountsToString from "../../util/AmountsToString";

export default function ({petUpgrade, isDeleteVisible, onEditClicked, onDeleteClicked}) {

    console.log(petUpgrade.prices)

    return (
        <ExpandableListItemWithBullets name={`${petUpgrade.lvl} Уровень:`}
                                       description={petUpgrade.description}
                                       isDeleteVisible={isDeleteVisible}
                                       onEditClicked={() => onEditClicked()}
                                       onDeleteClicked={() => onDeleteClicked()}
                                       bullets={[
                                           petUpgrade.skillInfluences.map(v => SkillInfluenceToString(v)).join(", "),
                                           petUpgrade.prices.map(v => AmountsToString(v)).join(" или ")
                                       ]}
                                       alwaysExpand={true}
        />
    )
}