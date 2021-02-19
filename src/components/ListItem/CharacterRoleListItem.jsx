import React from "react";
import ExpandableListItemWithBullets from "../Common/ListElements/ExpandableListItemWithBullets";

export default function ({characterDto, onEditClicked}) {
    const {name, img, game, role} = characterDto

    return (
        <ExpandableListItemWithBullets img={img}
                                       name={name}
                                       description={game.name}
                                       bullets={[
                                           role
                                       ]}
                                       alwaysExpand={true}
                                       onEditClicked={() => onEditClicked()}
        />
    )
}