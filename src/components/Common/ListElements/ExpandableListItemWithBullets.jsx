import React from "react";
import BulletList from "../Lists/BulletList";
import ExpandableListItem from "./ExpandableListItem";
import ExpandableListItemWithButtons from "./ExpandableListItemWithButtons";
import Icon from "../Input/Icon";
import GreyButton from "../Buttons/GreyButton";

export default class ExpandableListItemWithBullets extends React.Component {

    render() {
        return (
            <ExpandableListItem
                img={this.props.img}
                name={this.props.name}
                upperButtons={[
                    this.props.onEditClicked && <Icon className={"pi pi-pencil"} onClick={() => this.props.onEditClicked()}/>,
                    this.props.onDeleteClicked && <Icon className={"pi pi-times"} onClick={() => this.props.onDeleteClicked()}/>
                ]}
                expandableElements={[
                    <div style={descriptionStyle}>{this.props.description}</div>,
                    <BulletList values={this.props.bullets}/>,
                    this.props.onDetailsClicked && <GreyButton text={"Подробнее"} onClick={() => this.props.onDetailsClicked()}/>
                ]}
                alwaysExpand={this.props.alwaysExpand}
            />
        )
    }
}

const descriptionStyle = {
    fontSize: "1.5vmax",
    margin: " 0.5vmax 0 1vmax 0"
}