import React from "react";
import {connect} from "react-redux"
import FormViewStyle from "../../../../styles/FormViewStyle";
import {get, post} from "../../../../util/Http";
import {
    getCharactersByUserIdUrl,
    killCharacterUrl,
    makeCharacterActiveUrl,
    officeViewUrl,
    reviveCharacterUrl
} from "../../../../util/Parameters";
import Globals from "../../../../util/Globals";
import Btn from "../../../Common/Buttons/Btn";
import Popup from "../../../../util/Popup";
import {changeView, setActiveCharacter, setActiveGame} from "../../../../data-layer/ActionCreators";
import CharacterStatus from "../../../../data-layer/enums/CharacterStatus";
import {characterListView} from "../../../../Views";
import UserAccountView from "./Component/UserAccountView";
import UserAccountGameRolesComponent from "./Component/UserAccountGameRolesComponent";
import Stubs from "../../../../stubs/Stubs";
import CharacterToGameComponent from "./Component/CharacterToGameComponent";

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


        this.state = Stubs.officeView

        get(officeViewUrl, rs => this.setState(rs))
    }

    render() {
        return (
            <div style={FormViewStyle}>
                <UserAccountView userAccount={this.state.userAccount}/>
                <UserAccountGameRolesComponent userAccountGameRoleDtoList={this.state.userAccount?.rolesInGames}/>
                <CharacterToGameComponent gamesToCharacters={this.state.gamesToCharacters} />

                {/*<List title={"Мои персонажи:"}*/}
                {/*      noItemsText={"Пусто.."}*/}
                {/*      values={this.groupCharactersByGame(this.state.characters).map(({game, characters}) =>*/}
                {/*          <List title={`${game.name}:`}*/}
                {/*                values={characters.sort((c1, c2) => CharacterStatus.compare(c1.status, c2.status))*/}
                {/*                    .map(character =>*/}
                {/*                        <ExpandableListItem name={character.name}*/}
                {/*                                            alwaysExpand={true}*/}
                {/*                                            expandableElements={[*/}
                {/*                                                <div>{`Игра: ${character.game.name}`}</div>,*/}
                {/*                                                <div>{`Гражданин страны: ${character.country.name}`}</div>,*/}
                {/*                                                <div>{`Статус: ${CharacterStatus.getLabel(character.status)}`}</div>,*/}
                {/*                                                <div>{`Дата смены статуса: ${FormatDate(new Date(character.statusChangeDate))}`}</div>,*/}
                {/*                                                ...(character.status !== CharacterStatus.DEAD ? [*/}
                {/*                                                    this.toCharacterListViewButton(game, character)*/}
                {/*                                                ] : []),*/}
                {/*                                                this.killCharacterButton(game, character)*/}
                {/*                                            ].filter(v => v != null)}*/}
                {/*                                            key={character.id}*/}
                {/*                        />*/}
                {/*                    )}*/}
                {/*          />*/}
                {/*      )}*/}
                {/*/>*/}
            </div>
        )
    }

    toCharacterListViewButton(game, character) {
        return (
            <Btn text={"Выбрать"}
                 onClick={() => {
                     post(makeCharacterActiveUrl, {characterId: character.id, gameId: game.id}, () =>
                         this.props.toCharacterListView(game, character)
                     )
                 }}
            />
        )
    }

    killCharacterButton(game, character) {
        if (character.status === CharacterStatus.DEAD) {
            return (
                <Btn
                    text={"Оживить персонажа"}
                    onClick={() => {
                        post(reviveCharacterUrl, {characterId: character.id}, () =>
                            get(getCharactersByUserIdUrl(Globals.userId), rs => {
                                this.setState({characters: rs})
                                Popup.success(`Вы оживили персонажа!`)
                            })
                        )
                    }
                    }
                />
            )
        } else {
            return (

                <Btn text={"Убить персонажа"} onClick={() => {
                    if (window.confirm("Вы действительно хотите убить персонажа?")) {
                        post(killCharacterUrl, {characterId: character.id, gameId: character.game.id}, () =>
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
        return this.props.userAccount.gameToActiveCharacter.some(({activeCharacter}) => activeCharacter?.id === character.id)
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