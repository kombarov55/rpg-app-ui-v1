import React from "react";
import BulletList from "../Lists/BulletList";
import ExpandableListItem from "./ExpandableListItem";
import Icon from "../Input/Icon";
import GreyButton from "../Buttons/GreyButton";
import getOrDefault from "../../../util/getOrDefault";

export default class ExpandableListItemWithBullets extends React.Component {

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
                    <BulletList values={this.props.bullets}/>,
                    this.props.onDetailsClicked && <GreyButton text={getOrDefault(this.props.detailsButtonText, "Подробнее")} onClick={() => this.props.onDetailsClicked()}/>
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