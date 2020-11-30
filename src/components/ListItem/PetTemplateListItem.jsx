import React from "react";
import ExpandableListItemWithBullets from "../Common/ListElements/ExpandableListItemWithBullets";
import SkillInfluenceToString from "../../util/SkillInfluenceToString";

export default function ({petTemplate, onEditClicked, onDeleteClicked}) {
    return (
        <ExpandableListItemWithBullets img={petTemplate.img}
                                       name={petTemplate.name}
                                       description={petTemplate.description}
                                       bullets={petTemplate.upgrades.map(petUpgrade =>
                                           `${petUpgrade.lvl} уровень: ${petUpgrade.skillInfluences.map(v => SkillInfluenceToString(v)).join(", ")}`
                                       )}
                                       onEditClicked={() => onEditClicked()}
                                       onDeleteClicked={() => onDeleteClicked()}
                                       alwaysExpand={true}
        />
    )
}