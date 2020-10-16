import React from "react";
import {connect} from "react-redux";
import GameItem from "../../GameItem";
import {
    changeView,
    setActiveGame,
    setSubnetworks,
    updateGameForm,
    updateSubnetworkForm
} from "../../../../data-layer/ActionCreators";
import {adminGameView, gameCreationView, networkView, subnetworkEditView} from "../../../../Views";
import AddGameItem from "../../../AdminGame/Self/Component/AddGameItemComponent";
import Globals from "../../../../util/Globals";
import Btn from "../../../Common/Buttons/Btn";
import {httpDelete} from "../../../../util/Http";
import {deleteSubnetworkUrl} from "../../../../util/Parameters";
import GameCreationMode from "../../../../data-layer/enums/GameCreationMode";
import DefaultFormValues from "../../../../data-layer/DefaultFormValues";
import Popup from "../../../../util/Popup";

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
        setActiveGame: game => dispatch(setActiveGame(game)),
        clearGameForm: () => dispatch(updateGameForm(DefaultFormValues.gameForm))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(function (props) {
    function onGameClicked(game) {
        Globals.gameCreationMode = GameCreationMode.BY_SUBNETWORK
        props.setActiveGame(game)
        props.changeView(adminGameView)
    }

    function onAddGameClicked() {
        Globals.gameCreationMode = GameCreationMode.BY_SUBNETWORK
        props.clearGameForm()
        props.changeView(gameCreationView)
    }

    function onEditClicked() {
        props.updateSubnetworkForm(props.activeSubnetwork)
        props.changeView(subnetworkEditView)
    }

    function onDeleteClicked() {
        if (window.confirm("Удалить подсеть?")) {
            httpDelete(deleteSubnetworkUrl(props.activeNetwork.id, props.activeSubnetwork.id), () => {
                Popup.info("Подсеть архивирована.")
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
                <div className={"network-description"}><a href={props.activeSubnetwork.groupLink}>Ссылка на группу</a></div>
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