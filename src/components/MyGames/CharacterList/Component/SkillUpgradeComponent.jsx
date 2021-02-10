import React from "react";
import ExpandableListItem from "../../../Common/ListElements/ExpandableListItem";
import InputLabel from "../../../Common/Labels/InputLabel";
import Btn from "../../../Common/Buttons/Btn";
import AmountsToString from "../../../../util/AmountsToString";

export default class SkillUpgradeComponent extends React.Component {

    render() {
        return (
            <ExpandableListItem name={`${this.props.skillUpgrade.lvlNum} уровень: `}
                                description={this.props.skillUpgrade.description}
                                expandableElements={[
                                    <InputLabel text={"Прокачать: "}/>,
                                    ...(this.props.skillUpgrade.prices.length !== 0 ? (this.props.skillUpgrade.prices.map(amounts =>
                                        <Btn text={AmountsToString(amounts)}
                                             onClick={() => this.props.onUpgradeClicked(amounts)}/>
                                    )) : [
                                        <Btn text={"Бесплатно!"} onClick={() => this.props.onUpgradeClicked([])}/>
                                    ])
                                ]}
                                alwaysExpand={true}

            />
        )
    }
}