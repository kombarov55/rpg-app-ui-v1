import {GameTypes} from "./enums/GameType";
import {Sex} from "./enums/Sex";
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
    UPDATE_ACTIVE_GAME,
    UPDATE_CURRENCY_FORM,
    UPDATE_CONVERSION_FORM,
    SET_CURRENCIES,
    SET_CONVERSIONS, UPDATE_SKILL_CATEGORY_FORM, FILTER_LIST, APPEND_ELEMENT, UPDATE_SPELL_SCHOOL_FORM
} from "./ActionTypes";
import {announcementView} from "../Views";

export function changeView(nextView = announcementView, params = {}) {
    return {
        type: CHANGE_VIEW,
        payload: {
            nextView: nextView,
            params: params
        }
    }
}

export function toggleSidebar() {
    return {
        type: TOGGLE_SIDEBAR
    }
}

export function setGrowl(growl) {
    return {
        type: SET_GROWL,
        payload: {
            growl: growl
        }
    }
}

export function addAnnouncement(announcement) {
    return {
        type: ADD_ANNOUNCEMENT,
        payload: {
            announcement: announcement
        }
    }
}

export function addAnnouncementDeprecated(
    id = "",
    authorFullName,
    imgSrc,
    creationDate = new Date().getTime(),
    title = "",
    gameType = GameTypes.LS,
    sex = Sex.FEMALE,
    minAge = 6,
    maxAge = 99,
    description = "",
    anonymous = false,
    commentsEnabled = true,
    uploadUid = "",
    commentsCount = 0
) {
    return {
        type: ADD_ANNOUNCEMENT,
        payload: {
            id: id,
            authorFullName: authorFullName,
            imgSrc: imgSrc,
            creationDate: creationDate,
            title: title,
            gameType: gameType,
            sex: sex,
            minAge: minAge,
            maxAge: maxAge,
            description: description,
            anonymous: anonymous,
            commentsEnabled: commentsEnabled,
            uploadUid: uploadUid,
            commentsCount: commentsCount
        }
    }
}

export function restoreAnnouncement(annoucementId) {
    return {
        type: RESTORE_ANNOUNCEMENT,
        payload: {
            announcementId: annoucementId
        }
    }
}

export function updateAnnouncement(announcementId, fieldNameToValue) {
    return {
        type: UPDATE_ANNOUNCEMENT,
        payload: {
            announcementId: announcementId,
            fieldNameToValue: fieldNameToValue
        }
    }
}

export function incAnnouncementField(announcementId, fieldName) {
    return {
        type: INC_ANNOUNCEMENT_FIELD,
        payload: {
            announcementId: announcementId,
            fieldName: fieldName
        }
    }
}

export function decAnnouncementField(announcementId, fieldName) {
    return {
        type: DEC_ANNOUNCEMENT_FIELD,
        payload: {
            announcementId: announcementId,
            fieldName: fieldName
        }
    }
}

export function updateAnnoncementForm(obj) {
    return {
        type: EDIT_ANNOUNCEMENT_FORM,
        payload: obj
    }
}

export function clearAnnouncementForm() {
    return {
        type: CLEAR_ANNOUNCEMENT_FORM
    }
}

export function deleteAnnouncement(id) {
    return {
        type: DELETE_ANNOUNCEMENT,
        payload: {
            id: id
        }
    }
}

export function updateCommentForm(obj) {
    return {
        type: UPDATE_COMMENT_FORM,
        payload: obj
    }
}

export function clearComments(announcementId) {
    return {
        type: CLEAR_COMMENTS,
        payload: {
            announcementId: announcementId
        }
    }
}

export function addComment(comment) {
    return {
        type: ADD_COMMENT,
        payload: comment
    }
}

export function deleteComments(commentId) {
    return {
        type: DELETE_COMMENT,
        payload: {
            commentId: commentId
        }
    }
}

export function restoreComponent(commentId) {
    return {
        type: RESTORE_COMMENT,
        payload: {
            commentId: commentId
        }
    }
}

export function addUserAccount(userAccount) {
    return {
        type: ADD_USER_ACCOUNT,
        payload: {
            userAccount: userAccount
        }
    }
}

export function toggleFavoriteAnnouncement(announcementId) {
    return {
        type: TOGGLE_FAVORITE_ANNOUNCEMENT,
        payload: {
            announcementId: announcementId
        }
    }
}

export function toggleRespondAnnouncement(announcementId) {
    return {
        type: TOGGLE_RESPOND_ANNOUNCEMENT,
        payload: {
            announcementId: announcementId
        }
    }
}

export function addConversations(conversations) {
    return {
        type: ADD_CONVERSATIONS,
        payload: {
            conversations: conversations
        }
    }
}

export function setActiveConversation(conversation) {
    return {
        type: SET_ACTIVE_CONVERSATION,
        payload: {
            conversation: conversation
        }
    }
}

export function setMsgs(msgs) {
    return {
        type: SET_MSGS,
        payload: {
            msgs: msgs
        }
    }
}

export function updateMsgForm(fieldNameToValue) {
    return {
        type: UPDATE_MESSAGE_FORM,
        payload: {
            fieldNameToValue: fieldNameToValue
        }
    }
}

export function addMsgs(msgs) {
    return {
        type: ADD_MESSAGES,
        payload: {
            msgs: msgs
        }
    }
}

export function updateNetworkForm(fieldNameToValue) {
    return {
        type: UPDATE_NETWORK_FORM,
        payload: {
            fieldNameToValue: fieldNameToValue
        }
    }
}

export function setNetworks(networks) {
    return {
        type: SET_NETWORKS,
        payload: {
            networks: networks
        }
    }
}

export function setActiveNetwork(network) {
    return {
        type: SET_ACTIVE_NETWORK,
        payload: {
            activeNetwork: network
        }
    }
}

export function updateSubnetworkForm(fieldNameToValue) {
    return {
        type: UPDATE_SUBNETWORK_FORM,
        payload: {
            fieldNameToValue: fieldNameToValue
        }
    }
}

export function setSubnetworks(subnetworks) {
    return {
        type: SET_SUBNETWORKS,
        payload: {
            subnetworks: subnetworks
        }
    }
}

export function setActiveSubnetwork(subnetwork) {
    return {
        type: SET_ACTIVE_SUBNETWORK,
        payload: {
            activeSubnetwork: subnetwork
        }
    }
}

export function updateGameForm(fieldNameToValue) {
    return {
        type: UPDATE_GAME_FORM,
        payload: {
            fieldNameToValue: fieldNameToValue
        }
    }
}

export function setGames(games) {
    return {
        type: SET_GAMES,
        payload: {
            games: games
        }
    }
}

export function setActiveGame(game) {
    return {
        type: SET_ACTIVE_GAME,
        payload: {
            activeGame: game
        }
    }
}

export function updateActiveGame(fieldNameToValue) {
    return {
        type: UPDATE_ACTIVE_GAME,
        payload: {
            fieldNameToValue: fieldNameToValue
        }
    }
}

export function updateQuestionnaireTemplateForm(fieldNameToValue) {
    return {
        type: UPDATE_QUESTIONNAIRE_TEMPLATE_FORM,
        payload: {
            fieldNameToValue: fieldNameToValue
        }
    }
}

export function updateQuestionnaireTemplateItemForm(fieldNameToValue) {
    return {
        type: UPDATE_QUESTIONNAIRE_TEMPLATE_ITEM_FORM,
        payload: {
            fieldNameToValue: fieldNameToValue
        }
    }
}

export function updateSkillForm(fieldNameToValue) {
    return {
        type: UPDATE_SKILL_FORM,
        payload: {
            fieldNameToValue: fieldNameToValue
        }
    }
}

export function updateCurrencyForm(fieldNameToValue) {
    return {
        type: UPDATE_CURRENCY_FORM,
        payload: {
            fieldNameToValue: fieldNameToValue
        }
    }
}

export function updateConversionForm(fieldNameToValue) {
    return {
        type: UPDATE_CONVERSION_FORM,
        payload: {
            fieldNameToValue: fieldNameToValue
        }
    }
}

export function setCurrencies(currencies) {
    return {
        type: SET_CURRENCIES,
        payload: {
            currencies: currencies
        }
    }
}

export function setConversions(conversions) {
    return {
        type: SET_CONVERSIONS,
        payload: {
            conversions: conversions
        }
    }
}

export function updateSkillCategoryForm(fieldNameToValue) {
    return {
        type: UPDATE_SKILL_CATEGORY_FORM,
        payload: {
            fieldNameToValue: fieldNameToValue
        }
    }
}

export function filterList(stateObjectName, propertyName, predicate) {
    return {
        type: FILTER_LIST,
        payload: {
            stateObjectName: stateObjectName,
            propertyName: propertyName,
            predicate: predicate
        }
    }
}

export function appendElement(stateObjectName, propertyName, element) {
    return {
        type: APPEND_ELEMENT,
        payload: {
            stateObjectName: stateObjectName,
            propertyName: propertyName,
            element: element
        }
    }
}

export function updateSpellSchoolForm(fieldNameToValue) {
    return {
        type: UPDATE_SPELL_SCHOOL_FORM,
        payload: {
            fieldNameToValue: fieldNameToValue
        }
    }
}