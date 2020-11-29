import React from "react";
import Btn from "../Common/Buttons/Btn";
import BulletList from "../Common/Lists/BulletList";
import ExpandableListItem from "../Common/ListElements/ExpandableListItem";
import SkillInfluenceToString from "../../util/SkillInfluenceToString";

export default function({item, onUnequip}) {
    return (
        <ExpandableListItem name={item.name}
                            img={item.img}
                            description={item.description}
                            expandableElements={[
                                <BulletList values={[
                                    `${item.skillInfluences.map(v => SkillInfluenceToString(v)).join(", ")} + (${item.upgrades.find(v => v.lvlNum = item.lvl)?.skillInfluences?.map(v => SkillInfluenceToString(v)).join(", ")})`,
                                    item.category,
                                    item.type,
                                    `${item.slots} слотов`,
                                    item.canBeEquipped ? "Можно одеть" : null,
                                    item.canBeCrafted ? "Можно скрафтить" : null,
                                    item.canBeUsedInCraft ? "Можно использовать в крафте" : null,
                                    `${item.lvl} уровень предмета`
                                ]}/>,
                                <Btn text={"Снять"} onClick={() => onUnequip()}/>
                            ]}

                            alwaysExpand={true}
        />
    )
}