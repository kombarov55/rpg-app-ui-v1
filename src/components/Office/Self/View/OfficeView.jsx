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
                <CharacterToGameComponent characters={this.state.userAccount?.characters}
                                          onCharacterListClicked={(game, character) => this.onCharacterListClicked(game, character)}
                                          onKillClicked={character => this.onKillClicked(character)}
                                          onReviveClicked={character => this.onReviveClicked(character)}
                />

            </div>
        )
    }

    onCharacterListClicked(game, character) {
        post(makeCharacterActiveUrl, {characterId: character.id, gameId: game.id}, () =>
            this.props.toCharacterListView(game, character)
        )
    }

    onReviveClicked(character) {
        post(reviveCharacterUrl, {characterId: character.id}, () =>
            get(getCharactersByUserIdUrl(Globals.userId), rs => {
                this.setState({characters: rs})
                Popup.success(`Вы оживили персонажа!`)
            })
        )
    }

    onKillClicked(character) {
        if (window.confirm("Вы действительно хотите убить персонажа?")) {
            post(killCharacterUrl, {characterId: character.id, gameId: character.game.id}, () =>
                get(getCharactersByUserIdUrl(Globals.userId), rs => {
                    this.setState({characters: rs})
                    Popup.success(`Персонаж успешно убит. Дата смерти: ${new Date()}`)
                })
            )
        }
    }
})