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
        name: "",
        description: "",
        gameId: "",
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
        description: "",
        type: "",
        currenciesForUpgrade: [],
        upgradeOptions: [],
        upgradeOptionForm: {
            currencies: []
        },
        upgradeOptionFormVisible: false,
        maxValue: 1,
        upgradeCosts: []
    }
}