import React from "react";
import {connect} from "react-redux";
import NetworkItem from "../../NetworkItem";
import {
    adminGameView,
    adminPageView,
    gameCreationView,
    networkEditView,
    subnetworkCreationView,
    subnetworkView
} from "../../../../Views";
import {
    changeView,
    setActiveGame,
    setActiveSubnetwork,
    setGames,
    setNetworks,
    setSubnetworks,
    updateGameForm,
    updateNetworkForm
} from "../../../../data-layer/ActionCreators";
import AddSubnetworkItem from "../AddSubnetworkItem";
import AddGameItem from "../../../AdminGame/Self/Component/AddGameItemComponent";
import Globals from "../../../../util/Globals";
import GameItem from "../../GameItem";
import {httpDelete} from "../../../../util/Http";
import {deleteNetworkUrl} from "../../../../util/Parameters";
import Btn from "../../../Common/Buttons/Btn";
import DefaultFormValues from "../../../../data-layer/DefaultFormValues";
import Preload from "../../../../util/Preload";
import GameCreationMode from "../../../../data-layer/enums/GameCreationMode";
import Label from "../../../Common/Labels/Label";
import Popup from "../../../../util/Popup";

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
        Preload.subnetworkView(props.activeNetwork.id, subnetwork.id)
        props.changeView(subnetworkView)
    }

    function onGameClicked(game) {
        Globals.gameCreationMode = GameCreationMode.BY_NETWORK
        props.setActiveGame(game)
        props.changeView(adminGameView)
    }

    function onAddGameClicked() {
        Globals.gameCreationMode = GameCreationMode.BY_NETWORK
        props.updateGameForm(DefaultFormValues.gameForm)
        props.changeView(gameCreationView)
    }

    function onAddSubnetworkClicked() {
        props.changeView(subnetworkCreationView)
    }

    function onEditClicked() {
        props.updateNetworkForm(props.activeNetwork)
        props.changeView(networkEditView)
    }

    function onDeleteClicked() {
        const toDelete = window.confirm("Удалить сеть?")
        if (toDelete) {
            httpDelete(deleteNetworkUrl(props.activeNetwork.id), () => {
                Popup.info("Сеть архивирована.")
                props.setNetworks(props.networks.filter(it => it.id !== props.activeNetwork.id))
                props.changeView(adminPageView)
            })
        }
    }

    function onBackClicked() {
        Preload.adminPageView()
        Globals.gameCreationMode = GameCreationMode.OPEN
        props.changeView(adminPageView)
    }

    return (
        <div className={"network-selection-view"}>
            <div className={"network-info"}>
                <img className={"network-info-img"}
                     src={props.activeNetwork.imgSrc}
                />
                <div className={"network-name"}>{props.activeNetwork.title}</div>
                <div className={"network-description"}>{props.activeNetwork.description}</div>
                <div className={"network-description"}><a href={props.activeNetwork.groupLink}>Ссылка на группу</a></div>
            </div>
            <Btn text={"Редактировать"}
                 onClick={() => onEditClicked()}
            />
            <Btn text={"Удалить"}
                 onClick={() => onDeleteClicked()}
            />
            <Label text={"Подсети:"}/>

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
                <AddSubnetworkItem onClick={() => onAddSubnetworkClicked()}/>

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
            <Btn text={"Назад"}
                 onClick={() => onBackClicked()}
            />
        </div>
    )
})