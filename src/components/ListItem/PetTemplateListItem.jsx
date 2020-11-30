import React from "react";
import SkillInfluenceToString from "../../util/SkillInfluenceToString";
import BulletList from "../Common/Lists/BulletList";
import AmountsToString from "../../util/AmountsToString";
import ExpandableListItem from "../Common/ListElements/ExpandableListItem";

export default function ({petTemplate, onEditClicked, onDeleteClicked}) {
    return (
        <ExpandableListItem img={petTemplate.img}
                            name={petTemplate.name}
                            description={petTemplate.description}
                            expandableElements={[
                                <BulletList title={"Уровни:"}
                                            values={petTemplate.upgrades.map(petUpgrade =>
                                                `${petUpgrade.lvl} уровень: ${petUpgrade.skillInfluences.map(v => SkillInfluenceToString(v)).join(", ")}`
                                            )}
                                />,
                                <BulletList title={"Варианты покупки:"}
                                            values={petTemplate.prices.map(amounts => AmountsToString(amounts))}
                                />
                            ]}
                            onEditClicked={() => onEditClicked()}
                            onDeleteClicked={() => onDeleteClicked()}
                            alwaysExpand={true}
        />
    )
}