import {get} from "./Http";
import {
    conversionsByGameIdUrl,
    currenciesByGameIdUrl,
    gameByNetworkId,
    gameBySubnetworkId,
    gamesUrl,
    gameUrl,
    getRecipesByGameId,
    merchandiseUrl,
    networkUrl,
    organizationByGameIdUrl,
    questionnaireTemplateByIdUrl,
    shortSkillsByGameIdUrl,
    subnetworkUrl
} from "./Parameters";
import {
    setActiveGame,
    setAvailableMerchandise,
    setConversions,
    setCurrencies,
    setGames,
    setNetworks,
    setOrganizations,
    setRecipes,
    setSkills,
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
        get(getRecipesByGameId(gameId), rs => window.store.dispatch(setRecipes(rs)))
        get(merchandiseUrl(gameId), rs => window.store.dispatch(setAvailableMerchandise(rs)))
        get(shortSkillsByGameIdUrl(gameId), rs => window.store.dispatch(setSkills(rs)))
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