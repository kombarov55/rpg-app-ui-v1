import React, {useEffect} from "react";
import {connect} from "react-redux";
import {changeView, setActiveNetwork, setGames, setNetworks, setSubnetworks} from "../../../../data-layer/ActionCreators";
import Btn from "../../../Common/Buttons/Btn";
import {networkCreationView, networkView} from "../../../../Views";
import {get} from "../../../../util/Http";
import {gameByNetworkId, subnetworkUrl} from "../../../../util/Parameters";
import NetworkItem from "../../NetworkItem";

function mapStateToProps(state, props) {
    return {
        networks: state.networks
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        changeView: (view) => dispatch(changeView(view)),
        setSubnetworks: subnetworks => dispatch(setSubnetworks(subnetworks)),
        setGames: games => dispatch(setGames(games)),
        setActiveNetwork: network => dispatch(setActiveNetwork(network))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(function (props) {

    function onItemClick(id) {
        const selectedNetwork = props.networks.find(it => it.id === id);
        props.setActiveNetwork(selectedNetwork)

        get(subnetworkUrl(selectedNetwork.id), rs => {
            props.setSubnetworks(rs)
        })

        get(gameByNetworkId(selectedNetwork.id), rs => {
            props.setGames(rs)
            props.changeView(networkView)
        })
    }

    return (
        <div className={"network-selection-view"}>
            <div className={"network-selection-view-horizontal"}>
                {
                    props.networks.map(network =>
                        <NetworkItem
                            key={network.id}
                            onClick={() => onItemClick(network.id)}
                            imgSrc={network.imgSrc}
                            title={network.title}
                        />
                    )
                }
            </div>
            <Btn text={"Добавить сеть"}
                 onClick={() => props.changeView(networkCreationView)}
            />
        </div>
    )
})