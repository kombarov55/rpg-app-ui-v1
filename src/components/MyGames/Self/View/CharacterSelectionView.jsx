import React from "react";
import {connect} from "react-redux"
import FormViewStyle from "../../../../styles/FormViewStyle";
import {changeView, setActiveCharacter} from "../../../../data-layer/ActionCreators";
import {get} from "../../../../util/Http";
import {getCharactersByUserIdUrl} from "../../../../util/Parameters";
import Globals from "../../../../util/Globals";
import FormTitleLabel from "../../../Common/Labels/FormTitleLabel";
import Btn from "../../../Common/Buttons/Btn";
import {gameView} from "../../../../Views";

export default connect(
    state => ({
        gameId: state.activeGame.id
    }),
    null,
    (stateProps, dispatchProps, ownProps) => {
        const {dispatch} = dispatchProps

        return {
            ...stateProps,
            ...ownProps,

            toGameView: (character) => {
                dispatch(setActiveCharacter(character))
                dispatch(changeView(gameView))
            }
        }
    }
)(class extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            characters: []
        }

        get(getCharactersByUserIdUrl(Globals.userId, props.gameId), rs => this.setState({characters: rs}))
    }

    render() {
        return (
            <div style={FormViewStyle}>
                <FormTitleLabel text={"Выберите персонажа:"}/>
                {this.state.characters.map(character =>
                    <Btn text={`${character.name}`} onClick={() => this.props.toGameView(character)}/>
                )}
            </div>
        )
    }
})