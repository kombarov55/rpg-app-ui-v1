import React from "react";
import CornerListItem from "../Common/ListElements/CornerListItem";

export default function ({character}) {
    return (
        <CornerListItem left={character.name} right={character.role}/>
    )
}