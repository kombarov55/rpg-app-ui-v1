import React from "react";
import {connect} from "react-redux"
import FormViewStyle from "../../../../styles/FormViewStyle";
import List from "../../../Common/Lists/List";
import {get, post} from "../../../../util/Http";
import {
    getCharactersByUserIdUrl,
    killCharacterUrl,
    makeCharacterActiveUrl,
    reviveCharacterUrl,
    userAccountUrl
} from "../../../../util/Parameters";
import Globals from "../../../../util/Globals";
import ExpandableListItem from "../../../Common/ListElements/ExpandableListItem";
import Btn from "../../../Common/Buttons/Btn";
import FormTitleLabel from "../../../Common/Labels/FormTitleLabel";
import Popup from "../../../../util/Popup";
import {addUserAccount, changeView, setActiveCharacter, setActiveGame} from "../../../../data-layer/ActionCreators";
import FormatDate from "../../../../util/FormatDate";
import CharacterStatus from "../../../../data-layer/enums/CharacterStatus";
import {characterListView} from "../../../../Views";

export default connect(
    state => ({
        userAccount: state.userAccount
    }),
    null,
    (stateProps, dispatchProps, ownProps) => {
        const {dispatch} = dispatchProps

        return {
            ...stateProps,
            ...ownProps,
            setUserAccount: x => dispatch(addUserAccount(x)),
            toCharacterListView: (game, character) => {
                dispatch(setActiveGame(game))
                dispatch(setActiveCharacter(character))
                dispatch(changeView(characterListView))
            }
        }
    }
)(class OfficeView extends React.Component {

    constructor(props) {
        super(props);


        this.state = {
            characters: [],
            games: []
        }

        get(getCharactersByUserIdUrl(Globals.userId), rs => this.setState({characters: rs}))
    }

    render() {
        return (
            <div style={FormViewStyle}>
                <FormTitleLabel text={"Активные персонажи:"}/>
                {this.props.userAccount.gameToActiveCharacter.map(({game, activeCharacter}) =>
                    <div>
                        {
                            activeCharacter != null ?
                                <List title={`${game.name}:`}
                                      values={[<ExpandableListItem name={activeCharacter.name}/>]}
                                /> :
                                <List title={game.name}
                                      noItemsText={"Нет активного персонажа.."}
                                />
                        }
                    </div>
                )}

                <List title={"Мои персонажи:"}
                      noItemsText={"Пусто.."}
                      values={this.groupCharactersByGame(this.state.characters).map(({game, characters}) =>
                          <List title={`${game.name}:`}
                                values={characters.map(character =>
                                    <ExpandableListItem name={character.name}
                                                        alwaysExpand={true}
                                                        expandableElements={[
                                                            <div>{`Игра: ${character.game.name}`}</div>,
                                                            <div>{`Гражданин страны: ${character.country.name}`}</div>,
                                                            <div>{`Статус: ${CharacterStatus.getLabel(character.status)}`}</div>,
                                                            <div>{`Дата смены статуса: ${FormatDate(new Date(character.statusChangeDate))}`}</div>,
                                                            ...(character.status !== CharacterStatus.DEAD ? [
                                                                this.makeCharacterActiveButton(game, character),
                                                                this.toCharacterListViewButton(game, character)
                                                            ] : []),
                                                            this.killCharacterButton(game, character)
                                                        ].filter(v => v != null)}
                                                        key={character.id}
                                    />
                                )}
                          />
                      )}
                />
            </div>
        )
    }

    makeCharacterActiveButton(game, character) {
        return (
            !this.isCharacterActive(character) &&
            <Btn text={"Сделать активным"} onClick={() => {
                post(makeCharacterActiveUrl, {characterId: character.id, gameId: game.id}, () =>
                    get(userAccountUrl(Globals.userId), rs => {
                        this.props.setUserAccount(rs)
                        Popup.info(`Персонаж теперь активен.`)
                    })
                )
            }}/>
        )
    }

    toCharacterListViewButton(game, character) {
        return (
            <Btn text={"Открыть лист персонажа"}
                 onClick={() => this.props.toCharacterListView(game, character)}
            />
        )
    }

    killCharacterButton(game, character) {
        if (character.status === CharacterStatus.DEAD) {
            return (
                <Btn text={"Оживить персонажа"} onClick={() => {
                    post(reviveCharacterUrl, {characterId: character.id}, () =>
                        get(getCharactersByUserIdUrl(Globals.userId), rs => {
                            this.setState({characters: rs})
                            Popup.success(`Вы оживили персонажа!`)
                        })
                    )
                }}/>
            )
        } else {
            return (
                <Btn text={"Убить персонажа"} onClick={() => {
                    if (window.confirm("Вы действительно хотите убить персонажа?")) {
                        post(killCharacterUrl, {characterId: character.id}, () =>
                            get(getCharactersByUserIdUrl(Globals.userId), rs => {
                                this.setState({characters: rs})
                                Popup.success(`Персонаж успешно убит. Дата смерти: ${new Date()}`)
                            })
                        )
                    }
                }}/>
            )
        }
    }

    isCharacterActive(character) {
        return this.props.userAccount.gameToActiveCharacter.some(({activeCharacter}) => activeCharacter.id === character.id)
    }

    groupCharactersByGame(characters) {
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
})