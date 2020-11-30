import React from "react";
import ExpandableListItem from "./ExpandableListItem";
import GreyButton from "../Buttons/GreyButton";
import Icon from "../Input/Icon";

export default class ExpandableListItemWithButtons extends React.Component {

    render() {
        return (
            <ExpandableListItem
                img={this.props.img}
                name={this.props.name}
                isDeleteVisible={this.props.isDeleteVisible}
                onDeleteClicked={this.props.onDeleteClicked}
                onEditClicked={this.props.onEditClicked}
                expandableElements={[
                    <div style={descriptionStyle}>{this.props.description}</div>,
                    <GreyButton text={"Подробнее"} onClick={() => this.props.onDetailsClicked()}/>
                ]}
            />
        )
    }
}

const descriptionStyle = {
    fontSize: "1.5vmax",
    margin: " 0.5vmax 0 1vmax 0"
}