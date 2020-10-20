import {post} from "../../util/Http";
import {makeCharacterActiveUrl} from "../../util/Parameters";

export default {
    makeCharacterActive: (characterId, gameId, then) => post(makeCharacterActiveUrl, {characterId: characterId, gameId: gameId}, then)
}