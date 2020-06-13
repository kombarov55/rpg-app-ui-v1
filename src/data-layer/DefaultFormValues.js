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
        groupLink: "",
        img: "",
        background: ""
    },
    subnetworkForm: {
        title: "",
        description: "",
        groupLink: "",
        img: "",
        background: ""
    },
    gameForm: {
        title: "",
        description: "",
        img: "",
        background: "",
        currencyInput: "",
        currencies: [],
        conversions: [],
        skillCategories: []
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
    },
    skillCategoryForm: {
        name: "",
        img: "",
        description: "",
        complex: false
    }
}