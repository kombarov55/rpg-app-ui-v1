import React from "react";
import ExpandableListItem from "../../../Common/ListElements/ExpandableListItem";
import SkillInfluenceToString from "../../../../util/SkillInfluenceToString";
import Btn from "../../../Common/Buttons/Btn";

export default class extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <ExpandableListItem name={`${this.props.upgrade.lvlNum} Уровень:`}
                                description={`Повышение навыков: ${this.props.upgrade.skillInfluences.map(skillInfluence => SkillInfluenceToString(skillInfluence))}`}
                                expandableElements={[
                                    <div>
                                        {
                                            !this.props.isUpgraded &&
                                            <Btn text={"Прокачать"}/>
                                        }
                                    </div>
                                ]}
                                alwaysExpand={true}
            />
        )
    }
}