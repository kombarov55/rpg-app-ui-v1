import {
    ADD_ANNOUNCEMENT,
    ADD_COMMENT,
    ADD_CONVERSATIONS,
    ADD_MESSAGES,
    ADD_USER_ACCOUNT,
    APPEND_ELEMENT,
    CHANGE_VIEW,
    CLEAR_ANNOUNCEMENT_FORM,
    CLEAR_COMMENTS,
    DEC_ANNOUNCEMENT_FIELD,
    DELETE_ANNOUNCEMENT,
    DELETE_COMMENT,
    EDIT_ANNOUNCEMENT_FORM,
    FILTER_LIST,
    INC_ANNOUNCEMENT_FIELD,
    RESTORE_ANNOUNCEMENT,
    RESTORE_COMMENT,
    SET_ACTIVE_CHARACTER,
    SET_ACTIVE_CONVERSATION,
    SET_ACTIVE_GAME,
    SET_ACTIVE_NETWORK,
    SET_ACTIVE_ORGANIZATION,
    SET_ACTIVE_QUESTIONNAIRE,
    SET_ACTIVE_QUESTIONNAIRE_TEMPLATE,
    SET_ACTIVE_SCHOOL_LVL, SET_ACTIVE_SHOP,
    SET_ACTIVE_SKILL,
    SET_ACTIVE_SKILL_CATEGORY,
    SET_ACTIVE_SPELL_SCHOOL,
    SET_ACTIVE_SUBNETWORK,
    SET_ACTIVE_USER_ACCOUNT,
    SET_AVAILABLE_ITEMS_FOR_SALE,
    SET_CONVERSIONS,
    SET_CURRENCIES,
    SET_GAMES,
    SET_GROWL,
    SET_MSGS,
    SET_NETWORKS,
    SET_ORGANIZATIONS,
    SET_QUESTIONNAIRE_TEMPLATES,
    SET_RECIPES,
    SET_SKILLS,
    SET_SUBNETWORKS,
    SET_USER_ACCOUNTS,
    TOGGLE_FAVORITE_ANNOUNCEMENT,
    TOGGLE_RESPOND_ANNOUNCEMENT,
    TOGGLE_SIDEBAR,
    UPDATE_ACTIVE_GAME,
    UPDATE_ANNOUNCEMENT,
    UPDATE_COMMENT_FORM,
    UPDATE_CONVERSION_FORM,
    UPDATE_CURRENCY_FORM,
    UPDATE_GAME_FORM,
    UPDATE_MESSAGE_FORM,
    UPDATE_NETWORK_FORM,
    UPDATE_SKILL_CATEGORY_FORM,
    UPDATE_SPELL_SCHOOL_FORM,
    UPDATE_SUBNETWORK_FORM
} from "./ActionTypes";
import {initialState} from "./Store";
import MergeLists from "../util/MergeLists";
import ChangeUrl from "../util/ChangeUrl";

export function rootReducer(state = initialState, action) {
    // console.log(action)

    switch (action.type) {
        case ADD_USER_ACCOUNT:
            return Object.assign({}, state, {
                userAccount: action.payload.userAccount
            })

        case SET_USER_ACCOUNTS:
            return Object.assign({}, state, {
                userAccounts: action.payload.userAccounts
            })

        case CHANGE_VIEW:
            return Object.assign({}, state, {
                currentView: action.payload.nextView,
                changeViewParams: action.payload.params
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

        case UPDATE_CURRENCY_FORM:
            return Object.assign({}, state, {
                currencyForm: Object.assign({}, state.currencyForm, action.payload.fieldNameToValue)
            })

        case UPDATE_CONVERSION_FORM:
            return Object.assign({}, state, {
                conversionForm: Object.assign({}, state.conversionForm, action.payload.fieldNameToValue)
            })

        case SET_CURRENCIES:
            return Object.assign({}, state, {
                currencies: action.payload.currencies
            })

        case SET_CONVERSIONS:
            return Object.assign({}, state, {
                conversions: action.payload.conversions
            })

        case UPDATE_SKILL_CATEGORY_FORM:
            return Object.assign({}, state, {
                skillCategoryForm: Object.assign({}, state.skillCategoryForm, action.payload.fieldNameToValue)
            })

        case UPDATE_SPELL_SCHOOL_FORM:
            return Object.assign({}, state, {
                spellSchoolForm: Object.assign({}, state.spellSchoolForm, action.payload.fieldNameToValue)
            })

        case FILTER_LIST:
            return filterList(state, action.payload)

        case APPEND_ELEMENT:
            return appendElement(state, action.payload)

        case SET_ORGANIZATIONS:
            return Object.assign({}, state, {
                organizations: action.payload.organizations
            })

        case SET_ACTIVE_ORGANIZATION:
            return Object.assign({}, state, {
                activeOrganization: action.payload.organization
            })

        case SET_AVAILABLE_ITEMS_FOR_SALE:
            return Object.assign({}, state, {
                availableItemsForSale: action.payload.itemsForSale
            })

        case SET_ACTIVE_SKILL_CATEGORY:
            return Object.assign({}, state, {
                activeSkillCategory: action.payload.skillCategory
            })

        case SET_ACTIVE_SPELL_SCHOOL:
            return Object.assign({}, state, {
                activeSpellSchool: action.payload.spellSchool
            })

        case SET_ACTIVE_SCHOOL_LVL:
            return Object.assign({}, state, {
                activeSchoolLvl: action.payload.schoolLvl
            })

        case SET_ACTIVE_SKILL:
            return Object.assign({}, state, {
                activeSkill: action.payload.skill
            })

        case SET_RECIPES:
            return Object.assign({}, state, {
                recipes: action.payload.x
            })

        case SET_SKILLS:
            return Object.assign({}, state, {
                skills: action.payload.x
            })

        case SET_QUESTIONNAIRE_TEMPLATES:
            return Object.assign({}, state, {
                questionnaireTemplates: action.payload.x
            })

        case SET_ACTIVE_QUESTIONNAIRE_TEMPLATE:
            return Object.assign({}, state, {
                activeQuestionnaireTemplate: action.payload.x
            })

        case SET_ACTIVE_USER_ACCOUNT:
            return Object.assign({}, state, {
                activeUserAccount: action.payload.x
            })

        case SET_ACTIVE_QUESTIONNAIRE:
            return Object.assign({}, state, {
                activeQuestionnaire: action.payload.x
            })

        case SET_ACTIVE_CHARACTER:
            return Object.assign({}, state, {
                activeCharacter: action.payload.x
            })

        case SET_ACTIVE_SHOP:
            return Object.assign({}, state, {
                activeShop: action.payload.x
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

function filterList(state, payload) {
    const {stateObjectName, propertyName, predicate} = payload
    const obj = state[stateObjectName]
    const list = obj[propertyName]
    const filteredList = list.filter(predicate)
    const updatedObj = obj[propertyName] = filteredList

    const updatedState = Object.assign({}, state)

    updatedState[stateObjectName] = updatedObj

    return state
}

function appendElement(state, payload) {
    const {stateObjectName, propertyName, element} = payload
    const obj = state[stateObjectName]
    const list = obj[propertyName]
    const updatedList = list.concat(element)
    const updatedObj = obj[propertyName] = updatedList

    const updatedState = Object.assign({}, state)

    updatedState[stateObjectName] = updatedObj

    return state
}