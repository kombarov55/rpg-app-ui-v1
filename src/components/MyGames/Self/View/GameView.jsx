import React from "react";
import {connect} from "react-redux"
import {get} from "../../../../util/Http";
import {gameByIdUrl} from "../../../../util/Parameters";
import {changeView, setActiveGame} from "../../../../data-layer/ActionCreators";
import ViewInfo from "../../../Common/Constructions/ViewInfo";
import Btn from "../../../Common/Buttons/Btn";
import {myGamesView} from "../../../../Views";
import FormViewStyle from "../../../../styles/FormViewStyle";

export default connect(
    state => ({
        game: state.activeGame
    }),
    null,
    (stateProps, dispatchProps, ownProps) => {
        const {dispatch} = dispatchProps

        return {
            ...stateProps,
            ...ownProps,

            setActiveGame: game => dispatch(setActiveGame(game)),
            back: () => dispatch(changeView(myGamesView))
        }
    }
)(class GameView extends React.Component {

    constructor(props) {
        super(props);

        get(gameByIdUrl(this.props.game.id), rs => this.props.setActiveGame(rs))
    }

    render() {
        return (
            <div style={FormViewStyle}>
                <ViewInfo img={this.props.game.img}
                          name={this.props.game.title}
                          description={this.props.game.imgSrc}
                />

                <Btn text={"Назад"} onClick={() => this.props.back()}/>
            </div>
        )
    }
})