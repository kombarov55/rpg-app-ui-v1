import React from "react";
import BulletList from "../Lists/BulletList";
import ExpandableListItem from "./ExpandableListItem";
import Btn from "../Buttons/Btn";
import GreyButton from "../Buttons/GreyButton";
import Icon from "../Input/Icon";

export default class ExpandableListItemWithButtons extends React.Component {

    render() {
        return (
            <ExpandableListItem
                img={this.props.img}
                name={this.props.name}
                upperButtons={[
                    <Icon className={"pi pi-pencil"} onClick={() => alert("clicked")}/>,
                    <Icon className={"pi pi-times"} onClick={() => alert("clicked")}/>
                ]}
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