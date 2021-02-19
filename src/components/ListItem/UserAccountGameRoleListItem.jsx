import React from "react";
import ListItem from "../Common/ListElements/ListItem";

export default function ({title, role, onEditClicked}) {
    return (
        <ListItem text={`${title}: ${role}`}
                  onEdit={() => onEditClicked()}
        />
    )
}