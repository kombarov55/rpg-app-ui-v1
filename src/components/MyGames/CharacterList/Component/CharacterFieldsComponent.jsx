import React from "react";
import List from "../../../Common/Lists/List";
import CornerListItem from "../../../Common/ListElements/CornerListItem";

export default function ({fieldNameToValueList}) {
    return (
        <List values={Object.entries(fieldNameToValueList).map(([name, value]) =>
            <CornerListItem left={name} right={value}/>
        )}
        />
    )
}