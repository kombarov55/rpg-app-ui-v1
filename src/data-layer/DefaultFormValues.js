import QuestionnaireItemType from "./enums/QuestionnaireItemType";

export default {
    gameForm: {
        title: "",
        description: "",
        currencyInput: "",
        skillTypeInput: "",
        currencies: [],
        skillTypes: ["Общие", "Боевые", "Магические", "Прочие"]
    },
    questionnaireForm: {
        itemFormVisible: false,
        skillFormVisible: false,
        questionnaireItems: [],
        skillPointsDistribution: [],
        skills: []
    },
    questionnaireItemForm: {
        name: "",
        type: QuestionnaireItemType.STRING.name,
        listInput: "",
        listValues: []
    },
    skillForm: {
        name: "",
        type: "",
        currenciesForUpgrade: [],
        maxValue: 1,
        skillCosts: []
    }
}