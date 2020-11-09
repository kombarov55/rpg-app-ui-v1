import getOrDefault from "./getOrDefault";

export default function(state) {
    return getOrDefault(state.userAccount.gameToActiveCharacter.find(it => it.game.id === state.activeGame.id), {activeCharacter: {}}).activeCharacter
}