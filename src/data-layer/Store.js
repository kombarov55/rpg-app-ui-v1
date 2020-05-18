import {createStore} from "redux";
import {rootReducer} from "./Reducers";
import {announcementView} from "../Views";
import DefaultFormValues from "./DefaultFormValues";

export const initialState = {
    sidebarVisible: false,
    growl: null,
    currentView: announcementView,
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
    skills: [],

    announcementForm: DefaultFormValues.announcement,

    commentForm: DefaultFormValues.comment,
    messageForm: DefaultFormValues.message,

    networkForm: DefaultFormValues.network,
    subnetworkForm: DefaultFormValues.subnetwork,
    gameForm: DefaultFormValues.gameForm,
    questionnaireTemplateForm: DefaultFormValues.questionnaireTemplateForm,
    questionnaireTemplateItemForm: DefaultFormValues.questionnaireTemplateItemForm,
    skillForm: DefaultFormValues.skillForm,
    currencyForm: DefaultFormValues.currencyForm
}

export const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

window.store = store