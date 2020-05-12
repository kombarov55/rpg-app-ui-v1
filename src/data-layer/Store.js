import {createStore} from "redux";
import {rootReducer} from "./Reducers";
import {
    announcementView, gameCreationView, gameEditView,
    gameView, networkCreationView,
    networkSelectionView,
    questionnaireCreationView,
    questionnaireRulesView
} from "../Views";
import DefaultFormValues from "./DefaultFormValues";

export const initialState = {
    sidebarVisible: false,
    growl: null,
    currentView: questionnaireCreationView,
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

    announcementForm: {
        anonymous: false,
        commentsEnabled: true
    },

    commentForm: {
        text: ""
    },
    messageForm: {
        text: ""
    },

    networkForm: {
        title: "",
        description: ""
    },
    subnetworkForm: {
        title: "",
        description: ""
    },
    gameForm: DefaultFormValues.gameForm,
    questionnaireForm: DefaultFormValues.questionnaireForm,
    questionnaireItemForm: DefaultFormValues.questionnaireItemForm
}

export const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

window.store = store