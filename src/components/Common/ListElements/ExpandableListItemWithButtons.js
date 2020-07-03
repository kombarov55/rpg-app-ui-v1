import React from "react";
import BulletList from "../Lists/BulletList";
import ExpandableListItem from "./ExpandableListItem";
import Btn from "../Buttons/Btn";

export default class ExpandableListItemWithButtons extends React.Component {

    render() {
        return (
            <ExpandableListItem
                img={this.props.img}
                name={this.props.name}
                expandableElements={[
                    <div style={descriptionStyle}>{this.props.description}</div>,
                    <Btn text={"Подробнее"}/>
                ]}
            />
        )
    }
}

const descriptionStyle = {
    fontSize: "1.5vmax",
    margin: " 0.5vmax 0 1vmax 0"
}