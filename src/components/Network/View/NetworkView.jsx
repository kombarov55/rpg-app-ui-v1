import React, {useEffect} from "react";
import {connect} from "react-redux";
import NetworkItem from "../NetworkItem";
import {
    gameCreationView,
    gameView,
    networkCreationView, networkEditView,
    networkSelectionView,
    subnetworkCreationView,
    subnetworkView
} from "../../../Views";
import {
    changeView,
    setActiveGame,
    setActiveSubnetwork,
    setGames, setNetworks,
    setSubnetworks, updateGameForm, updateNetworkForm
} from "../../../data-layer/ActionCreators";
import AddSubnetworkItem from "../AddSubnetworkItem";
import AddGameItem from "../AddGameItem";
import Globals from "../../../util/Globals";
import GameItem from "../GameItem";
import {get, httpDelete} from "../../../util/Http";
import {deleteNetworkUrl, gameBySubnetworkId} from "../../../util/Parameters";
import Btn from "../../Common/Btn";
import DefaultFormValues from "../../../data-layer/DefaultFormValues";

function mapStateToProps(state, props) {
    return {
        activeNetwork: state.activeNetwork,
        subnetworks: state.subnetworks,
        games: state.games,
        growl: state.growl,
        networks: state.networks
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        changeView: view => dispatch(changeView(view)),
        setSubnetworks: subnetworks => dispatch(setSubnetworks(subnetworks)),
        setActiveSubnetwork: subnetwork => dispatch(setActiveSubnetwork(subnetwork)),
        setActiveGame: game => dispatch(setActiveGame(game)),
        setGames: games => dispatch(setGames(games)),
        setNetworks: networks => dispatch(setNetworks(networks)),
        updateNetworkForm: fieldNameToValue => dispatch(updateNetworkForm(fieldNameToValue)),
        updateGameForm: fieldNameToValue => dispatch(updateGameForm(fieldNameToValue))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(function (props) {

    function onSubnetworkClicked(subnetwork) {
        props.setActiveSubnetwork(subnetwork)
        get(gameBySubnetworkId(props.activeNetwork.id, subnetwork.id), rs => props.setGames(rs))
        props.changeView(subnetworkView)
    }

    function onGameClicked(game) {
        props.setActiveGame(game)
        props.changeView(gameView)
    }

    function onAddGameClicked() {
        Globals.creatingGameByNetwork = true
        props.updateGameForm(DefaultFormValues.gameForm)
        props.changeView(gameCreationView)
    }

    function onEditClicked() {
        props.updateNetworkForm(props.activeNetwork)
        props.changeView(networkEditView)
    }

    function onDeleteClicked() {
        const toDelete = window.confirm("Удалить сеть?")
        if (toDelete) {
            httpDelete(deleteNetworkUrl(props.activeNetwork.id), () => {
                props.growl.show({severity: "info", summary: "Сеть архивирована."})
                props.setNetworks(props.networks.filter(it => it.id !== props.activeNetwork.id))
                props.changeView(networkSelectionView)
            })
        }
    }

    return (
        <div className={"network-selection-view"}>
            <div className={"network-info"}>
                <img className={"network-info-img"}
                     src={props.activeNetwork.imgSrc}
                />
                <div className={"network-name"}>{props.activeNetwork.title}</div>
                <div className={"network-description"}>{props.activeNetwork.description}</div>
            </div>
            <div className={"subnetworks-label"}>
                Подсети:
            </div>

            <div className={"subnetwork-view-horizontal"}>
                {
                    props.subnetworks.map(subnetwork => (
                        <NetworkItem
                            key={subnetwork.id}
                            title={subnetwork.title}
                            imgSrc={subnetwork.imgSrc}
                            onClick={() => onSubnetworkClicked(subnetwork)}
                        />
                    ))
                }
                <AddSubnetworkItem onClick={() => props.changeView(subnetworkCreationView)}/>

            </div>

            <div className={"games-label"}>
                Игры:
            </div>
            <div className={"games-view-horizontal"}>
                {
                    props.games.map(game => (
                        <GameItem
                            key={game.id}
                            onClick={() => onGameClicked(game)}
                            imgSrc={game.imgSrc}
                            title={game.title}
                        />
                    ))
                }
                <AddGameItem onClick={() => onAddGameClicked()}/>
            </div>
            <Btn text={"Редактировать"}
                 onClick={() => onEditClicked()}
            />
            <Btn text={"Удалить"}
                 onClick={() => onDeleteClicked()}
            />
        </div>
    )
})