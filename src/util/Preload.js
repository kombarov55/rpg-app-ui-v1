import {get} from "./Http";
import {
    gameByNetworkId,
    gameBySubnetworkId,
    gamesUrl,
    gameUrl,
    networkUrl,
    skillsByGameIdUrl,
    subnetworkUrl
} from "./Parameters";
import {setActiveGame, setGames, setNetworks, setSkills, setSubnetworks} from "../data-layer/ActionCreators";


export default {
    adminPageView: () => {
        get(networkUrl, rs => window.store.dispatch(setNetworks(rs)))
        get(gamesUrl, rs => window.store.dispatch(setGames(rs)))
    },

    networkView: networkId => {
        get(subnetworkUrl(networkId), rs => window.store.dispatch(setSubnetworks(rs)))
        get(gameByNetworkId(networkId), rs => window.store.dispatch(setGames(rs)))
    },

    subnetworkView: (networkId, subnetworkId) => {
        get(gameBySubnetworkId(networkId, subnetworkId), rs => window.store.dispatch(setGames(rs)))
    },

    game: gameId => {
        get(gameUrl(gameId), rs => window.store.dispatch(setActiveGame(rs)))
    },

    skills: gameId => {
        get(skillsByGameIdUrl(gameId), rs => window.store.dispatch(setSkills(rs)))
    }
}