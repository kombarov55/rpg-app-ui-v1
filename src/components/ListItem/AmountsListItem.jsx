import React from "react";
import ListItem from "../Common/ListElements/ListItem";
import AmountsToString from "../../util/AmountsToString";

export default function ({amounts, onDeleteClicked}) {
    return (
        <ListItem text={AmountsToString(amounts)}
                  onDelete={() => onDeleteClicked()}
                  alwaysExpand={true}
        />
    )
}