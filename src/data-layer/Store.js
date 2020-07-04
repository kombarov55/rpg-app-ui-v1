import {createStore} from "redux";
import {rootReducer} from "./Reducers";
import {
    announcementView, shopView,
    skillCategoryFormView,
    skillCreationView,
    spellCreationView,
    spellSchoolCreationView
} from "../Views";
import DefaultFormValues from "./DefaultFormValues";

export const initialState = {
    sidebarVisible: false,
    growl: null,

    currentView: shopView,
    changeViewParams: {},

    userAccount: {

    },
    announcements: [],
    comments: [],
    conversations: [],

    activeConversation: null,
    activeNetwork: null,
    activeSubnetwork: null,
    activeGame: null,
    msgs: [],
    networks: [],
    subnetworks: [],
    games: [],
    currencies: [],
    conversions: [],

    announcementForm: DefaultFormValues.announcement,

    commentForm: DefaultFormValues.comment,
    messageForm: DefaultFormValues.message,

    networkForm: DefaultFormValues.networkForm,
    subnetworkForm: DefaultFormValues.subnetworkForm,
    gameForm: DefaultFormValues.gameForm,
    questionnaireTemplateForm: DefaultFormValues.questionnaireTemplateForm,
    questionnaireTemplateItemForm: DefaultFormValues.questionnaireTemplateItemForm,
    skillForm: DefaultFormValues.skillForm,
    currencyForm: DefaultFormValues.currencyForm,
    conversionForm: DefaultFormValues.conversionForm,
    skillCategoryForm: DefaultFormValues.skillCategoryForm,
    spellSchoolForm: DefaultFormValues.spellSchoolForm
}

export const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

window.store = store