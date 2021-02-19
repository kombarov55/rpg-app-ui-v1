import React from "react";
import ExpandableListItemWithBullets from "../Common/ListElements/ExpandableListItemWithBullets";
import ListItem from "../Common/ListElements/ListItem";

export default function ({characterDto, onEditClicked}) {
    const {name, role} = characterDto

    return (
        <ListItem text={`${name}: ${role}`}
                  onEdit={() => onEditClicked()}
        />
    )
}