import React, {useEffect} from "react";
import {connect} from "react-redux";
import GameItem from "../../GameItem";
import {changeView, setActiveGame, setSubnetworks, updateSubnetworkForm} from "../../../../data-layer/ActionCreators";
import {gameCreationView, gameView, networkView, subnetworkEditView} from "../../../../Views";
import AddGameItem from "../../../Game/AddGameItem";
import Globals from "../../../../util/Globals";
import Btn from "../../../Common/Btn";
import {httpDelete} from "../../../../util/Http";
import {deleteSubnetworkUrl} from "../../../../util/Parameters";
import GameCreationMode from "../../../../data-layer/enums/GameCreationMode";

function mapStateToProps(state, props) {
    return {
        activeNetwork: state.activeNetwork,
        activeSubnetwork: state.activeSubnetwork,
        games: state.games,
        subnetworks: state.subnetworks,
        growl: state.growl
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        changeView: view => dispatch(changeView(view)),
        setSubnetworks: subnetworks => dispatch(setSubnetworks(subnetworks)),
        updateSubnetworkForm: fieldNameToValue => dispatch(updateSubnetworkForm(fieldNameToValue)),
        setActiveGame: game => dispatch(setActiveGame(game))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(function (props) {
    function onGameClicked(game) {
        Globals.gameCreationMode = GameCreationMode.BY_SUBNETWORK
        props.setActiveGame(game)
        props.changeView(gameView)
    }

    function onAddGameClicked() {
        Globals.gameCreationMode = GameCreationMode.BY_SUBNETWORK
        props.changeView(gameCreationView)
    }

    function onEditClicked() {
        props.updateSubnetworkForm(props.activeSubnetwork)
        props.changeView(subnetworkEditView)
    }

    function onDeleteClicked() {
        if (window.confirm("Удалить подсеть?")) {
            httpDelete(deleteSubnetworkUrl(props.activeNetwork.id, props.activeSubnetwork.id), () => {
                props.growl.show({severity: "info", summary: "Подсеть архивирована."})
                props.setSubnetworks(props.subnetworks.filter(it => it.id !== props.activeSubnetwork.id))
                props.changeView(networkView)
            })
        }
    }

    function onBackClicked() {
        Globals.gameCreationMode = GameCreationMode.BY_NETWORK
        props.changeView(networkView)
    }

    return (
        <div className={"network-selection-view"}>
            <div className={"network-info"}>
                <img className={"network-info-img"} src={props.activeSubnetwork.imgSrc}/>
                <div className={"network-name"}>{props.activeSubnetwork.title}</div>
                <div className={"network-description"}>{props.activeSubnetwork.description}</div>
            </div>

            <Btn text={"Редактировать"}
                 onClick={() => onEditClicked()}
            />

            <Btn text={"Удалить"}
                 onClick={() => onDeleteClicked()}
            />


            <div className={"games-label"}>
                Игры:
            </div>
            <div className={"games-view-horizontal"}>
                {
                    props.games.map(game =>
                        <GameItem
                            key={game.id}
                            imgSrc={game.imgSrc}
                            title={game.title}
                            onClick={() => onGameClicked(game)}
                        />)
                }
                <AddGameItem
                    onClick={() => onAddGameClicked()}
                />
            </div>

            <Btn text={"Назад"}
                 onClick={() => onBackClicked()}
            />
        </div>
    )
})