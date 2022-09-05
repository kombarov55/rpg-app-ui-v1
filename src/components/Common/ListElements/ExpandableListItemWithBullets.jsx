import React from "react";
import BulletList from "../Lists/BulletList";
import ExpandableListItem from "./ExpandableListItem";
import GreyButton from "../Buttons/GreyButton";

/**
 * @props {
 *     img: String,
 *     name: String,
 *     description: String,
 *     bullets: [String]
 * }
 */
export default class ExpandableListItemWithBullets extends React.Component {

    render() {
        return (
            <ExpandableListItem
                img={this.props.img}
                name={this.props.name}
                expandableElements={[
                    <div style={descriptionStyle}>{this.props.description}</div>,
                    <BulletList values={this.props.bullets}/>,
                    this.props.onEdit && <GreyButton text={"Редактировать"} onClick={() => this.props.onEdit()}/>,
                    this.props.onDelete && <GreyButton text={"Удалить"} onClick={() => this.props.onDelete()}/>
                ]}
            />
        )
    }
}

const descriptionStyle = {
    fontSize: "1.5vmax",
    margin: " 0.5vmax 0 1vmax 0"
}