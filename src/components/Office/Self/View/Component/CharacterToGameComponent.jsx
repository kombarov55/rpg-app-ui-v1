import React from "react";
import List from "../../../../Common/Lists/List";
import CharacterStatus from "../../../../../data-layer/enums/CharacterStatus";
import FormatDate from "../../../../../util/FormatDate";
import ExpandableListItem from "../../../../Common/ListElements/ExpandableListItem";
import Btn from "../../../../Common/Buttons/Btn";

export default function ({characters = [], onCharacterListClicked, onReviveClicked, onKillClicked}) {

    function toCharacterListViewButton(game, character) {
        return (
            <Btn text={"Выбрать"} onClick={() => onCharacterListClicked(game, character)}/>
        )
    }

    function killCharacterButton(game, character) {
        if (character.status === CharacterStatus.DEAD) {
            return (
                <Btn text={"Оживить персонажа"} onClick={() => onReviveClicked(character)}/>
            )
        } else {
            return (
                <Btn text={"Убить персонажа"} onClick={() => onKillClicked(character)}/>
            )
        }
    }

    return (
        <List title={"Мои персонажи:"}
              noItemsText={"Пусто.."}
              values={groupCharactersByGame(characters).map(({game, characters}) =>
                  <List title={`${game.name}:`}
                        values={characters.sort((c1, c2) => CharacterStatus.compare(c1.status, c2.status))
                            .map(character =>
                                <ExpandableListItem name={character.name}
                                                    alwaysExpand={true}
                                                    expandableElements={[
                                                        <div>{character.role}</div>,
                                                        <div>{`Гражданин страны: ${character.country.name}`}</div>,
                                                        <div>{`Статус: ${CharacterStatus.getLabel(character.status)}`}</div>,
                                                        <div>{`Дата смены статуса: ${FormatDate(new Date(character.statusChangeDate))}`}</div>,
                                                        ...(character.status !== CharacterStatus.DEAD ? [
                                                            toCharacterListViewButton(game, character)
                                                        ] : []),
                                                        killCharacterButton(game, character)
                                                    ].filter(v => v != null)}
                                                    key={character.id}
                                />
                            )}
                  />
              )}
        />
    )
}

function groupCharactersByGame(characters) {
    return characters.reduce((resultList, character) => {
        const stored = resultList.find(v => v.game.id === character.game.id)
        if (stored == null) {
            return resultList.concat({
                game: character.game,
                characters: [character]
            })
        } else {
            return resultList.filter(v => v.game.id !== stored.game.id).concat({
                game: stored.game,
                characters: stored.characters.concat(character)
            })
        }
    }, [])
}