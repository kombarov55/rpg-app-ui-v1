import GameCreationMode from "../data-layer/enums/GameCreationMode";
import QuestionnaireTemplateFormMode from "../data-layer/enums/QuestionnaireTemplateFormMode";
import SkillCategoryFormMode from "../data-layer/enums/SkillCategoryFormMode";

export default {
    userId: null,
    authToken: null,
    gameCreationMode: GameCreationMode.OPEN,
    questionnaireTemplateFormMode: QuestionnaireTemplateFormMode.CREATE,
    skillCategoryFormMode: SkillCategoryFormMode.CREATE,
    growl: null
}