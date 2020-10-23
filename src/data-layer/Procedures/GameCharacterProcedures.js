import {post} from "../../util/Http";
import {upgradeSkillUrl} from "../../util/Parameters";

export default {
    upgradeSkill: (gameCharacterId, skillId, chosenPrice, then) => post(upgradeSkillUrl, {
        characterId: gameCharacterId,
        skillId: skillId,
        chosenPrice: chosenPrice
    }, () => then())
}