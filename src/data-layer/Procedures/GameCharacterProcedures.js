import {post} from "../../util/Http";
import {purchaseSkillUrl, purchaseSpellUrl, upgradeSkillUrl} from "../../util/Parameters";

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
    }, () => then()),
    purchaseSpell: (gameCharacterId, skillId, chosenPrice, then) => post(purchaseSpellUrl, {
        characterId: gameCharacterId,
        spellId: skillId,
        chosenPrice: chosenPrice
    }, rs => then(rs))
}