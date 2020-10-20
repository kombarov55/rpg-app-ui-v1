import React from "react";
import {connect} from "react-redux";
import Label from "../../Common/Labels/Label";
import NetworkItem from "../NetworkItem";
import {
    adminGameView,
    gameCreationView,
    networkCreationView,
    networkView,
    userAccountDetailsView
} from "../../../Views";
import {
    changeView,
    setActiveGame,
    setActiveNetwork,
    setActiveUserAccount,
    setGames,
    setSubnetworks,
    updateGameForm
} from "../../../data-layer/ActionCreators";
import GameItem from "../GameItem";
import Globals from "../../../util/Globals";
import GameCreationMode from "../../../data-layer/enums/GameCreationMode";
import AddItemButton from "../../Common/Buttons/AddItemButtonCircle";
import Preload from "../../../util/Preload";
import DefaultFormValues from "../../../data-layer/DefaultFormValues";
import List from "../../Common/Lists/List";
import {get} from "../../../util/Http";
import {allUsersShortUrl} from "../../../util/Parameters";
import ExpandableListItemWithBullets from "../../Common/ListElements/ExpandableListItemWithBullets";
import FormViewStyle from "../../../styles/FormViewStyle";

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
        clearGameForm: () => dispatch(updateGameForm(DefaultFormValues.gameForm)),
        setActiveUserAccount: x => dispatch(setActiveUserAccount(x))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)
(class AdminPageView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userAccounts: []
        }

        get(allUsersShortUrl, rs => this.setState({userAccounts: rs}))
    }


    onNetworkClick(network) {
        this.props.setActiveNetwork(network)
        Preload.networkView(network.id)
        this.props.changeView(networkView)
    }

    onAddNetworkClick() {
        this.props.changeView(networkCreationView)
    }

    onGameClick(game) {
        Preload.gameView(game.id)
        this.props.setActiveGame(game)
        Globals.gameCreationMode = GameCreationMode.OPEN
        this.props.changeView(adminGameView)
    }

    onAddGameClick() {
        Globals.gameCreationMode = GameCreationMode.OPEN
        this.props.clearGameForm()
        this.props.changeView(gameCreationView)
    }

    toUserAccountDetailsView(userAccount) {
        this.props.setActiveUserAccount(userAccount)
        this.props.changeView(userAccountDetailsView)
    }

    render() {
        return (
            <div className={"admin-page-view"}>

                <Label text={"Сети:"}/>
                <div className={"horizontal-list"}>
                    {this.props.networks.map(network =>
                        <NetworkItem
                            key={network.id}
                            onClick={() => this.onNetworkClick(network)}
                            imgSrc={network.imgSrc}
                            title={network.title}
                        />
                    )}
                    <AddItemButton onClick={() => this.onAddNetworkClick()}/>
                </div>

                <Label text={"Игры:"}/>
                <div className={"horizontal-list"}>
                    {this.props.games.map(game =>
                        <GameItem
                            title={game.title}
                            imgSrc={game.imgSrc}
                            onClick={() => this.onGameClick(game)}
                        />
                    )}
                    <AddItemButton onClick={() => this.onAddGameClick()}/>
                </div>

                <div style={FormViewStyle}>
                    <List title={"Игроки:"}
                          noItemsText={"Пусто.."}
                          values={this.state.userAccounts.map(userAccount =>
                              <ExpandableListItemWithBullets
                                  img={userAccount.img}
                                  name={userAccount.fullName}
                                  bullets={[
                                      "Роль: " + userAccount.role
                                  ]}
                                  detailsButtonText={"Управление ролями"}
                                  onDetailsClicked={() => this.toUserAccountDetailsView(userAccount)}

                                  alwaysExpand={true}
                                  key={userAccount.id}
                              />
                          )}
                    />
                </div>
            </div>
        )
    }


})