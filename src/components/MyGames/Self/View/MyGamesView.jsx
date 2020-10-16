import React from "react";
import Carousel from "../../../Common/Lists/Carousel";
import {get} from "../../../../util/Http";
import {allGamesUrl} from "../../../../util/Parameters";
import {connect} from "react-redux"
import {changeView, setActiveGame} from "../../../../data-layer/ActionCreators";
import {gameView} from "../../../../Views";

export default connect(
    state => ({}),
    null,
    (stateProps, dispatchProps, ownProps) => {
        const {dispatch} = dispatchProps

        return {
            ...stateProps,
            ...ownProps,

            toGameView: game => {
                dispatch(setActiveGame(game))
                dispatch(changeView(gameView))
            }
        }
    }
)(class MyGamesView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            games: []
        }

        get(allGamesUrl, rs => this.setState({games: rs}))

    }

    render() {
        return (
            <div>
                <Carousel items={this.state.games}
                          imgKey={"img"}
                          titleKey={"name"}
                          onSelected={game => this.props.toGameView(game)}
                />
            </div>
        )
    }
})