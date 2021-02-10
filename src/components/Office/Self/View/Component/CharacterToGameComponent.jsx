import React from "react";
import List from "../../../../Common/Lists/List";
import GameCharacterRoleListItem from "../../../../ListItem/GameCharacterRoleListItem";

export default function ({gamesToCharacters}) {
    return (
        <List title={"Роли персонажей:"}>
            {
                gamesToCharacters?.map(({game, characters}) =>
                    <List title={game.name}>
                        {
                            characters?.map(character => <GameCharacterRoleListItem character={character}/>)
                        }
                    </List>
                )
            }
        </List>
    )
}