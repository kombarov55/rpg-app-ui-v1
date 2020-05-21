import QuestionnaireTemplateItemType from "./enums/QuestionnaireTemplateItemType";

export default {
    announcement: {
        anonymous: false,
        commentsEnabled: true
    },
    comment: {
        text: ""
    },
    message: {
        text: ""
    },
    networkForm: {
        title: "",
        description: "",
        img: "",
        background: ""
    },
    subnetworkForm: {
        title: "",
        description: "",
        img: "",
        background: ""
    },
    gameForm: {
        title: "",
        description: "",
        img: "",
        background: "",
        currencyInput: "",
        skillTypeInput: "",
        currencies: [],
        conversions: [],
        skillTypes: ["Общие", "Боевые", "Магические", "Прочие"]
    },
    questionnaireTemplateForm: {
        name: "",
        description: "",
        gameId: "",
        itemFormVisible: false,
        skillFormVisible: false,
        questionnaireTemplateItems: [],
        skillPointsDistribution: [],
        skills: []
    },
    questionnaireTemplateItemForm: {
        name: "",
        type: QuestionnaireTemplateItemType.STRING.name,
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
    },

    currencyForm: {
        name: "",
        priceInActivityPoints: ""
    },
    conversionForm: {
        currency1: "",
        currency2: "",
        conversionPrice1to2: 0,
        conversionPrice2to1: 0
    }
}