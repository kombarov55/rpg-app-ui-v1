import React from "react";
import ExpandableListItemStyle from "../../../../styles/ExpandableListItemStyle";
import CheckButton from "../../../Common/Buttons/CheckButton";

export default class SkillDistributionComponent extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div style={ExpandableListItemStyle.containerStyle}>
                <div style={ExpandableListItemStyle.innerHorizontalStyle}>
                    <div style={ExpandableListItemStyle.imgAndNameStyle}>
                        {
                            this.props.img &&
                            <img style={ExpandableListItemStyle.imgStyle} src={this.props.img}/>
                        }
                        <div style={ExpandableListItemStyle.nameStyle}>{this.props.name}</div>
                    </div>
                    <div style={ExpandableListItemStyle.upperButtonsStyle}>{this.props.upperButtons}</div>
                </div>
                <div>
                    <CheckButton uncheckedText={"Выбрать"}
                                 checkedText={"Выбрано"}
                    />
                </div>
            </div>
        )
    }
}