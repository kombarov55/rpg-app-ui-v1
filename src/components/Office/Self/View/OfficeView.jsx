import React from "react";
import {connect} from "react-redux"
import FormViewStyle from "../../../../styles/FormViewStyle";
import List from "../../../Common/Lists/List";
import {get} from "../../../../util/Http";
import {getCharactersByUserIdUrl} from "../../../../util/Parameters";
import Globals from "../../../../util/Globals";
import ExpandableListItem from "../../../Common/ListElements/ExpandableListItem";
import Btn from "../../../Common/Buttons/Btn";

export default connect(
    state => ({}),
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
            characters: []
        }

        get(getCharactersByUserIdUrl(Globals.userId), rs => this.setState({characters: rs}))
    }

    render() {
        return (
            <div style={FormViewStyle}>
                <List title={"Мои персонажи:"}
                      noItemsText={"Пусто.."}
                      values={this.state.characters.map(character =>
                          <ExpandableListItem name={character.name}
                                              alwaysExpand={true}
                                              expandableElements={[
                                                  <div>{`Участвует в игре: ${character.game.name}`}</div>,
                                                  <div>{`Гражданин страны: ${character.country.name}`}</div>,
                                                  <Btn text={"Убить персонажа"}/>,
                                                  <Btn text={"Открыть лист персонажа"}/>
                                              ]}
                                              key={character.id}
                          />
                      )}
                />
            </div>
        )
    }
})