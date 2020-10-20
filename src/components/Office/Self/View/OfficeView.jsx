import React from "react";
import {connect} from "react-redux"
import FormViewStyle from "../../../../styles/FormViewStyle";
import List from "../../../Common/Lists/List";
import {get} from "../../../../util/Http";
import {getCharactersByUserIdUrl} from "../../../../util/Parameters";
import Globals from "../../../../util/Globals";
import ExpandableListItem from "../../../Common/ListElements/ExpandableListItem";
import Btn from "../../../Common/Buttons/Btn";
import FormTitleLabel from "../../../Common/Labels/FormTitleLabel";

export default connect(
    state => ({
        userAccount: state.userAccount
    }),
    null,
    (stateProps, dispatchProps, ownProps) => {
        const {dispatch} = dispatchProps

        return {
            ...stateProps,
            ...ownProps
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
                                                            this.isCharacterActive(character) ?
                                                                <Btn text={"Активен"}/> :
                                                                <Btn text={"Сделать активным"}/>,
                                                            <Btn text={"Убить персонажа"}/>,
                                                            <Btn text={"Открыть лист персонажа"}/>
                                                        ]}
                                                        key={character.id}
                                    />
                                )}
                          />
                      )}
                />
            </div>
        )
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