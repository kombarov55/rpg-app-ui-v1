import React from "react";
import ExpandableListItemStyle from "../../../../styles/ExpandableListItemStyle";
import CheckButton from "../../../Common/Buttons/CheckButton";

export default class SkillUpgradeComponent extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div style={ExpandableListItemStyle.containerStyle}>
                <div style={ExpandableListItemStyle.innerHorizontalStyle}>
                    <div style={ExpandableListItemStyle.imgAndNameStyle}>
                        <div style={ExpandableListItemStyle.nameStyle}>{this.props.name}</div>
                    </div>
                </div>
                {this.props.description}
                {this.props.isButtonVisible &&
                <CheckButton uncheckedText={"Выбрать"}
                             checkedText={"Выбрано"}
                             onClick={isChecked => this.props.onClick(isChecked)}
                />
                }

            </div>
        )
    }
}