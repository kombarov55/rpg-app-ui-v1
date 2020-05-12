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
        questionnaireItems: []
    },
    questionnaireItemForm: {
        name: "",
        type: QuestionnaireItemType.STRING.name,
        listInput: "",
        listValues: []
    }
}