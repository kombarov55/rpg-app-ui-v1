import {createStore} from "redux";
import {rootReducer} from "./Reducers";
import {announcementView} from "../Views";
import DefaultFormValues from "./DefaultFormValues";
import Stubs from "../stubs/Stubs";

export const initialState = {
    sidebarVisible: false,
    growl: null,

    currentView: announcementView,
    changeViewParams: {},

    userAccount: {

    },

    userAccounts: [],
    announcements: [],
    comments: [],
    conversations: [],

    activeConversation: null,
    activeNetwork: null,
    activeSubnetwork: null,
    activeGame: null,
    activeOrganization: null,
    activeSkillCategory: null,
    activeSpellSchool: null,
    activeSchoolLvl: null,
    activeSkill: null,
    activeQuestionnaireTemplate: null,
    activeUserAccount: null,
    activeQuestionnaire: null,
    activeCharacter: null,
    activeShop: null,

    msgs: [],
    networks: [],
    subnetworks: [],
    games: [],
    currencies: [],
    conversions: [],
    organizations: Stubs.organizations,
    recipes: [],
    skills: [],
    questionnaireTemplates: [],

    availableItemsForSale: [],

    announcementForm: DefaultFormValues.announcement,

    commentForm: DefaultFormValues.comment,
    messageForm: DefaultFormValues.message,

    networkForm: DefaultFormValues.networkForm,
    subnetworkForm: DefaultFormValues.subnetworkForm,
    gameForm: DefaultFormValues.gameForm,
    skillForm: DefaultFormValues.skillForm,
    currencyForm: DefaultFormValues.currencyForm,
    conversionForm: DefaultFormValues.conversionForm,
    skillCategoryForm: DefaultFormValues.skillCategoryForm,
    spellSchoolForm: DefaultFormValues.spellSchoolForm
}

export const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

window.store = store