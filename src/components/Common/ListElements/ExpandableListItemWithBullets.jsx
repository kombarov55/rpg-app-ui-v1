import React from "react";
import BulletList from "../Lists/BulletList";
import ExpandableListItem from "./ExpandableListItem";

export default class ExpandableListItemWithBullets extends React.Component {

    render() {
        return (
            <ExpandableListItem
                img={this.props.img}
                name={this.props.name}
                expandableElements={[
                    <div style={descriptionStyle}>{this.props.description}</div>,
                    <BulletList values={this.props.bullets}/>
                ]}
            />
        )
    }
}

const descriptionStyle = {
    fontSize: "1.5vmax",
    margin: " 0.5vmax 0 1vmax 0"
}