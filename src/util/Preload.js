import {get} from "./Http";
import {
    conversionsByGameIdUrl,
    currenciesByGameIdUrl,
    gameByNetworkId,
    gameBySubnetworkId,
    gamesUrl,
    gameUrl,
    networkUrl, organizationByGameIdUrl, questionnaireTemplateByIdUrl,
    skillsByGameIdUrl,
    subnetworkUrl
} from "./Parameters";
import {
    setActiveGame, setConversions, setCurrencies,
    setGames,
    setNetworks, setOrganizations,
    setSubnetworks,
    updateQuestionnaireTemplateForm
} from "../data-layer/ActionCreators";


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

    gameView: (gameId) => {
        get(gameUrl(gameId), rs => window.store.dispatch(setActiveGame(rs)))
        get(organizationByGameIdUrl(gameId), rs => window.store.dispatch(setOrganizations(rs)))
    },

    questionnaireTemplateEditView: questionnaireId => {
        get(questionnaireTemplateByIdUrl(questionnaireId), rs => window.store.dispatch(updateQuestionnaireTemplateForm(rs)))
    },

    conversionView: gameId => {
        get(conversionsByGameIdUrl(gameId), rs => window.store.dispatch(setConversions(rs)))
        get(currenciesByGameIdUrl(gameId), rs => window.store.dispatch(setCurrencies(rs)))
    },

    game: gameId => {
        get(gameUrl(gameId), rs => window.store.dispatch(setActiveGame(rs)))
    }

}