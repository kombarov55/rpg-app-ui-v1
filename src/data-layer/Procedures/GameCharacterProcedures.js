import {post} from "../../util/Http";
import {purchaseSkillUrl, upgradeSkillUrl} from "../../util/Parameters";

export default {
    upgradeSkill: (gameCharacterId, skillId, chosenPrice, then) => post(upgradeSkillUrl, {
        characterId: gameCharacterId,
        skillId: skillId,
        chosenPrice: chosenPrice
    }, () => then()),
    purchaseSkill: (gameCharacterId, skillId, chosenPrice, then) => post(purchaseSkillUrl, {
        characterId: gameCharacterId,
        skillId: skillId,
        chosenPrice: chosenPrice
    }, () => then())
}