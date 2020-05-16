import {get} from "./Http";
import {gameUrl} from "./Parameters";
import {setActiveGame} from "../data-layer/ActionCreators";

export default {
    game: gameId => {
        get(gameUrl(gameId), rs => dispatch(setActiveGame(rs)))
    },

    skills: () => {

    }
}