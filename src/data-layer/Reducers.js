import {
    ADD_ANNOUNCEMENT,
    ADD_COMMENT,
    TOGGLE_FAVORITE_ANNOUNCEMENT,
    ADD_USER_ACCOUNT,
    CHANGE_VIEW,
    CLEAR_ANNOUNCEMENT_FORM,
    CLEAR_COMMENTS,
    DEC_ANNOUNCEMENT_FIELD,
    DELETE_ANNOUNCEMENT,
    DELETE_COMMENT,
    EDIT_ANNOUNCEMENT_FORM,
    INC_ANNOUNCEMENT_FIELD,
    RESTORE_ANNOUNCEMENT,
    RESTORE_COMMENT,
    TOGGLE_SIDEBAR,
    UPDATE_ANNOUNCEMENT,
    UPDATE_COMMENT_FORM,
    ADD_CONVERSATIONS,
    SET_ACTIVE_CONVERSATION,
    SET_MSGS,
    UPDATE_MESSAGE_FORM,
    ADD_MESSAGES,
    TOGGLE_RESPOND_ANNOUNCEMENT,
    SET_GROWL,
    SHOW_GROWL,
    UPDATE_NETWORK_FORM,
    SET_NETWORKS,
    SET_ACTIVE_NETWORK,
    UPDATE_SUBNETWORK_FORM,
    SET_SUBNETWORKS,
    SET_ACTIVE_SUBNETWORK,
    UPDATE_GAME_FORM,
    SET_GAMES,
    SET_ACTIVE_GAME,
    UPDATE_QUESTIONNAIRE_TEMPLATE_FORM,
    UPDATE_QUESTIONNAIRE_TEMPLATE_ITEM_FORM,
    UPDATE_SKILL_FORM,
    SET_SKILLS,
    UPDATE_ACTIVE_GAME, UPDATE_CURRENCY_FORM
} from "./ActionTypes";
import {initialState} from "./Store";
import MergeLists from "../util/MergeLists";

export function rootReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_USER_ACCOUNT:
            return Object.assign({}, state, {
                userAccount: action.payload.userAccount
            })

        case CHANGE_VIEW:
            return Object.assign({}, state, {
                currentView: action.payload.nextView
            })

        case TOGGLE_SIDEBAR:
            return Object.assign({}, state, {
                sidebarVisible: !state.sidebarVisible
            })

        case SET_GROWL:
            return Object.assign({}, state, {
                growl: action.payload.growl
        })

        case ADD_ANNOUNCEMENT:
            return Object.assign({}, state, {
                announcements: state.announcements.concat(action.payload.announcement)
            })

        case UPDATE_ANNOUNCEMENT:
            const {announcementIdToUpdate, fieldNameToValue} = action.payload
            const prevAnnouncement = state.announcements.find(it => it.id === announcementIdToUpdate)
            const updatedAnnouncement = Object.assign({}, prevAnnouncement, fieldNameToValue)
            const updatedAnnouncements = state.announcements.splice(
                state.announcements.findIndex(it => it.id === announcementIdToUpdate),
                1,
                updatedAnnouncement
            );

            return Object.assign({}, state, {
                announcements: updatedAnnouncements
            })

        case INC_ANNOUNCEMENT_FIELD:
            const announcementIdToInc = action.payload.announcementId
            const fieldName = action.payload.fieldName

            const prevAnnouncementToInc = state.announcements.find(it => {
                return it.id === announcementIdToInc
            })

            const incrementedValue = prevAnnouncementToInc[fieldName] += 1

            const updatedAnnouncementToInc = Object.assign({}, prevAnnouncementToInc, {fieldName, incrementedValue})

            const updatedAnnouncementsToInc = state.announcements.slice()
            const indexOfUpdated = state.announcements.findIndex(it => it.id === announcementIdToInc);
            updatedAnnouncementsToInc[indexOfUpdated] = updatedAnnouncementToInc

            return Object.assign({}, state, {
                announcements: updatedAnnouncementsToInc
            })

        case DEC_ANNOUNCEMENT_FIELD:
            return handleDecAnnouncementField(state, action)


        case EDIT_ANNOUNCEMENT_FORM:
            const updatedFields = action.payload;

            const prevForm = state.announcementForm
            const editedForm = Object.assign({}, prevForm, updatedFields)
            return Object.assign({}, state, {
                announcementForm: editedForm
            })

        case CLEAR_ANNOUNCEMENT_FORM:
            return Object.assign({}, state, {
                announcementForm: {
                    anonymous: false,
                    commentsEnabled: true
                }
            })

        case DELETE_ANNOUNCEMENT:
            return handleDeleteAnnouncement(state, action)

        case RESTORE_ANNOUNCEMENT:
            return handleRestoreAnnouncement(state, action)

        case UPDATE_COMMENT_FORM:
            const updatedCommentFields = action.payload;

            const prevComment = state.commentForm
            const updatedComment = Object.assign({}, prevComment, updatedCommentFields)
            return Object.assign({}, state, {
                commentForm: updatedComment
            })

        case CLEAR_COMMENTS:
            return Object.assign({}, state, {
                comments: state.comments.filter(it => it.announcementId !== action.payload.announcementId)
            })

        case ADD_COMMENT:
            return Object.assign({}, state, {
                comments: state.comments.concat(action.payload)
            })

        case DELETE_COMMENT:
            return handleDeleteComment(state, action)

        case RESTORE_COMMENT:
            return handleRestoreComment(state, action)

        case TOGGLE_FAVORITE_ANNOUNCEMENT:
            return handleToggleFavoriteAnnouncement(state, action)

        case TOGGLE_RESPOND_ANNOUNCEMENT:
            return handleToggleRespondAnnouncement(state, action)

        case ADD_CONVERSATIONS:
            return Object.assign({}, state, {
                conversations: MergeLists(action.payload.conversations, state.conversations)
            })

        case SET_ACTIVE_CONVERSATION:
            return Object.assign({}, state, {
                activeConversation: action.payload.conversation
            })

        case SET_MSGS:
            return Object.assign({}, state, {
                msgs: action.payload.msgs
            })

        case UPDATE_MESSAGE_FORM:
            return Object.assign({}, state, {
                messageForm: Object.assign({}, state.messageForm, action.payload.fieldNameToValue)
            })

        case ADD_MESSAGES:
            return Object.assign({}, state, {
                msgs: action.payload.msgs.concat(...state.msgs)
            })

        case UPDATE_NETWORK_FORM:
            return Object.assign({}, state, {
                networkForm: Object.assign({}, state.networkForm, action.payload.fieldNameToValue)
            })

        case SET_NETWORKS:
            return Object.assign({}, state, {
                networks: action.payload.networks
            })

        case SET_ACTIVE_NETWORK:
            return Object.assign({}, state, {
                activeNetwork: action.payload.activeNetwork
            })

        case UPDATE_SUBNETWORK_FORM:
            return Object.assign({}, state, {
                subnetworkForm: Object.assign({}, state.subnetworkForm, action.payload.fieldNameToValue)
            })

        case SET_SUBNETWORKS:
            return Object.assign({}, state, {
                subnetworks: action.payload.subnetworks
            })

        case SET_ACTIVE_SUBNETWORK:
            return Object.assign({}, state, {
                activeSubnetwork: action.payload.activeSubnetwork
            })

        case UPDATE_GAME_FORM:
            return Object.assign({}, state, {
                gameForm: Object.assign({}, state.gameForm, action.payload.fieldNameToValue)
            })

        case SET_GAMES:
            return Object.assign({}, state, {
                games: action.payload.games
            })

        case SET_ACTIVE_GAME:
            return Object.assign({}, state, {
                activeGame: action.payload.activeGame
            })

        case UPDATE_ACTIVE_GAME:
            return Object.assign({}, state, {
                activeGame: Object.assign({}, state.activeGame, action.payload.fieldNameToValue)
            })

        case UPDATE_QUESTIONNAIRE_TEMPLATE_FORM:
            return Object.assign({}, state, {
                questionnaireTemplateForm: Object.assign({}, state.questionnaireTemplateForm, action.payload.fieldNameToValue)
            })

        case UPDATE_QUESTIONNAIRE_TEMPLATE_ITEM_FORM:
            return Object.assign({}, state, {
                questionnaireTemplateItemForm: Object.assign({}, state.questionnaireTemplateItemForm, action.payload.fieldNameToValue)
            })

        case UPDATE_SKILL_FORM:
            return Object.assign({}, state, {
                skillForm: Object.assign({}, state.skillForm, action.payload.fieldNameToValue)
            })

        case SET_SKILLS:
            return Object.assign({}, state, {
                skills: action.payload.skills
            })

        case UPDATE_CURRENCY_FORM:
            return Object.assign({}, state, {
                currencyForm: Object.assign({}, state.currencyForm, action.payload.fieldNameToValue)
            })

        default:
            return state;
    }
}

function handleDeleteComment(state, action) {
    const {commentId} = action.payload

    const indexOfDeleted = state.comments.findIndex(it => it.id === commentId);

    const commentToDelete = state.comments[indexOfDeleted]
    const deletedComment = Object.assign({}, commentToDelete, {
        deleted: true
    })

    const updatedComments = state.comments.slice()
    updatedComments[indexOfDeleted] = deletedComment

    return Object.assign({}, state, {
        comments: updatedComments
    })
}

function handleRestoreComment(state, action) {
    const commentId = action.payload.commentId
    const indexOfRestored = state.comments.findIndex(it => it.id === commentId)

    const commentToRestore = state.comments[indexOfRestored]
    const restoredComment = Object.assign({}, commentToRestore, {
        deleted: false
    })

    const updatedComments = state.comments.slice()
    updatedComments[indexOfRestored] = restoredComment

    return Object.assign({}, state, {
        comments: updatedComments
    })
}

function handleDeleteAnnouncement(state, action) {
    const announcementId = action.payload.id
    const indexOfDeleted = state.announcements.findIndex(it => it.id === announcementId)

    const announcementToDelete = state.announcements[indexOfDeleted]
    const deletedAnnouncement = Object.assign({}, announcementToDelete, {
        deleted: true
    })

    const deletedAnnouncements = state.announcements.slice()
    deletedAnnouncements[indexOfDeleted] = deletedAnnouncement

    return Object.assign({}, state, {
        announcements: deletedAnnouncements
    })
}

function handleRestoreAnnouncement(state, action) {
    const announcementId = action.payload.announcementId
    const indexOfDeleted = state.announcements.findIndex(it => it.id === announcementId)

    const announcementToDelete = state.announcements[indexOfDeleted]
    const deletedAnnouncement = Object.assign({}, announcementToDelete, {
        deleted: false
    })

    const deletedAnnouncements = state.announcements.slice()
    deletedAnnouncements[indexOfDeleted] = deletedAnnouncement

    return Object.assign({}, state, {
        announcements: deletedAnnouncements
    })
}

function handleDecAnnouncementField(state, action) {
    const announcementId = action.payload.announcementId
    const fieldName = action.payload.fieldName

    const prevAnnouncement = state.announcements.find(it => {
        return it.id === announcementId
    })

    const incrementedValue = prevAnnouncement[fieldName] -= 1

    const updatedAnnouncement = Object.assign({}, prevAnnouncement, {fieldName, incrementedValue})

    const updatedAnnouncements = state.announcements.slice()
    const indexOfUpdated = state.announcements.findIndex(it => it.id === announcementId);
    updatedAnnouncements[indexOfUpdated] = updatedAnnouncement

    return Object.assign({}, state, {
        announcements: updatedAnnouncements
    })
}

function handleToggleFavoriteAnnouncement(state, action) {
    const {announcementId} = action.payload

    const prevFavs = state.userAccount.userAccountPreferences.favAnnouncementIds
    let updatedFavs
    if (!prevFavs.some(it => it === announcementId)) {
        updatedFavs = prevFavs.concat(announcementId)
    } else {
        updatedFavs = prevFavs.filter(it => it !== announcementId)
    }

    return Object.assign({}, state, {
        userAccount: Object.assign({}, state.userAccount, {
            userAccountPreferences: Object.assign({}, state.userAccount.userAccountPreferences, {
                favAnnouncementIds: updatedFavs
            })
        })
    })
}

function handleToggleRespondAnnouncement(state, action) {
    const {announcementId} = action.payload

    const prevResponded = state.userAccount.userAccountPreferences.respondedAnnouncementIds
    let updatedResponded
    if (!prevResponded.some(it => it === announcementId)) {
        updatedResponded = prevResponded.concat(announcementId)
    } else {
        updatedResponded = prevResponded.filter(it => it !== announcementId)
    }

    return Object.assign({}, state, {
        userAccount: Object.assign({}, state.userAccount, {
            userAccountPreferences: Object.assign({}, state.userAccount.userAccountPreferences, {
                respondedAnnouncementIds: updatedResponded
            })
        })
    })
}