import {get} from "./Http";
import {gamesUrl, gameUrl, networkUrl, skillsByGameIdUrl} from "./Parameters";
import {setActiveGame, setGames, setNetworks, setSkills} from "../data-layer/ActionCreators";


export default {
    networks: () => {
        get(networkUrl, rs => window.store.dispatch(setNetworks(rs)))
    },

    games: () => {
        get(gamesUrl, rs => window.store.dispatch(setGames(rs)))
    },

    game: gameId => {
        get(gameUrl(gameId), rs => window.store.dispatch(setActiveGame(rs)))
    },

    skills: gameId => {
        get(skillsByGameIdUrl(gameId), rs => window.store.dispatch(setSkills(rs)))
    }
}