import {get} from "./Http";
import {gameUrl, skillsByGameIdUrl} from "./Parameters";
import {setActiveGame, setSkills} from "../data-layer/ActionCreators";


export default {
    game: gameId => {
        get(gameUrl(gameId), rs => window.store.dispatch(setActiveGame(rs)))
    },

    skills: gameId => {
        get(skillsByGameIdUrl(gameId), rs => window.store.dispatch(setSkills(rs)))
    }
}