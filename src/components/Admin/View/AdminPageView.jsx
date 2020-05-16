import React from "react";
import {connect} from "react-redux";
import Label from "../../Common/Label";
import NetworkItem from "../NetworkItem";
import {networkCreationView, networkView} from "../../../Views";
import Btn from "../../Common/Btn";
import {changeView, setActiveNetwork, setGames, setSubnetworks} from "../../../data-layer/ActionCreators";
import {get} from "../../../util/Http";
import {gameByNetworkId, subnetworkUrl} from "../../../util/Parameters";

function mapStateToProps(state, props) {
    return {
        networks: state.networks
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        changeView: view => dispatch(changeView(view)),
        setActiveNetwork: network => dispatch(setActiveNetwork(network)),
        setSubnetworks: subnetworks => dispatch(setSubnetworks(subnetworks)),
        setGames: games => dispatch(setGames(games))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(function (props) {

    function onNetworkClick(network) {
        props.setActiveNetwork(network)
        get(subnetworkUrl(network.id), rs => props.setSubnetworks(rs))
        get(gameByNetworkId(network.id), rs => props.setGames(rs))
        props.changeView(networkView)
    }

    return (
        <div className={"admin-page-view"}>
            <Label text={"Сети"}/>
            <div className={"network-selection-view-horizontal"}>
                {props.networks.map(network =>
                    <NetworkItem
                        key={network.id}
                        onClick={() => onNetworkClick(network)}
                        imgSrc={network.imgSrc}
                        title={network.title}
                    />
                )}
            </div>
            <Btn text={"Добавить сеть"}
                 onClick={() => props.changeView(networkCreationView)}
            />
            <Label text={"Игры"}/>
        </div>
    )
})