import React from "react";
import BulletList from "../Lists/BulletList";
import ExpandableListItem from "./ExpandableListItem";
import GreyButton from "../Buttons/GreyButton";
import getOrDefault from "../../../util/getOrDefault";

export default function ({img, name, description, bullets, alwaysExpand, isDeleteVisible, onDeleteClicked, onEditClicked, onDetailsClicked, detailsButtonText}) {
    return (
        <ExpandableListItem
            img={img}
            name={name}
            isDeleteVisible={isDeleteVisible}
            onDeleteClicked={onDeleteClicked}
            onEditClicked={onEditClicked}
            expandableElements={[
                <div style={descriptionStyle}>{description}</div>,
                <BulletList values={bullets}/>,
                onDetailsClicked && <GreyButton text={getOrDefault(detailsButtonText, "Подробнее")} onClick={() => onDetailsClicked()}/>
            ]}
            alwaysExpand={alwaysExpand}
        />
    )
}

const descriptionStyle = {
    fontSize: "1.5vmax",
    margin: " 0.5vmax 0 1vmax 0"
}