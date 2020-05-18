import React from "react";
import {connect} from "react-redux";
import Label from "../../Common/Label";
import NetworkItem from "../NetworkItem";
import {gameCreationView, gameView, networkCreationView, networkView} from "../../../Views";
import Btn from "../../Common/Btn";
import {
    changeView,
    setActiveGame,
    setActiveNetwork,
    setGames,
    setSubnetworks, updateGameForm
} from "../../../data-layer/ActionCreators";
import {get} from "../../../util/Http";
import {gameByNetworkId, subnetworkUrl} from "../../../util/Parameters";
import GameItem from "../GameItem";
import Globals from "../../../util/Globals";
import GameCreationMode from "../../../data-layer/enums/GameCreationMode";
import AddItemButton from "../../Common/AddItemButtonCircle";
import Preload from "../../../util/Preload";
import DefaultFormValues from "../../../data-layer/DefaultFormValues";

function mapStateToProps(state, props) {
    return {
        networks: state.networks,
        games: state.games
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        changeView: view => dispatch(changeView(view)),
        setActiveNetwork: network => dispatch(setActiveNetwork(network)),
        setSubnetworks: subnetworks => dispatch(setSubnetworks(subnetworks)),
        setGames: games => dispatch(setGames(games)),
        setActiveGame: game => dispatch(setActiveGame(game)),
        clearGameForm: () => dispatch(updateGameForm(DefaultFormValues.gameForm))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(function (props) {

    function onNetworkClick(network) {
        props.setActiveNetwork(network)
        Preload.networkView(network.id)
        props.changeView(networkView)
    }

    function onAddNetworkClick() {
        props.changeView(networkCreationView)
    }

    function onGameClick(game) {
        props.setActiveGame(game)
        Globals.gameCreationMode = GameCreationMode.OPEN
        props.changeView(gameView)
    }

    function onAddGameClick() {
        Globals.gameCreationMode = GameCreationMode.OPEN
        props.clearGameForm()
        props.changeView(gameCreationView)
    }

    return (
        <div className={"admin-page-view"}>

            <Label text={"Сети:"}/>
            <div className={"horizontal-list"}>
                {props.networks.map(network =>
                    <NetworkItem
                        key={network.id}
                        onClick={() => onNetworkClick(network)}
                        imgSrc={network.imgSrc}
                        title={network.title}
                    />
                )}
                <AddItemButton onClick={() => onAddNetworkClick()}/>
            </div>

            <Label text={"Игры:"}/>
            <div className={"horizontal-list"}>
                {props.games.map(game =>
                    <GameItem
                        title={game.title}
                        imgSrc={game.imgSrc}
                        onClick={() => onGameClick(game)}
                    />
                )}
                <AddItemButton onClick={() => onAddGameClick()}/>
            </div>
        </div>
    )
})