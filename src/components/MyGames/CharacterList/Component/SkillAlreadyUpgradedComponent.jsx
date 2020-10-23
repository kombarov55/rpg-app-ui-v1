import React from "react";
import ExpandableListItemWithBullets from "../../../Common/ListElements/ExpandableListItemWithBullets";

export default class UpgradedSkillComponent extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <ExpandableListItemWithBullets
                name={`${this.props.skillUpgrade.lvlNum} уровень:`}
                description={this.props.skillUpgrade.description}
                bullets={["Выучен."]}

                alwaysExpand={true}
            />
        )
    }
}