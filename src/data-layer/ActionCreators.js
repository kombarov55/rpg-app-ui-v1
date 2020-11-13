import {GameTypes} from "./enums/GameType";
import {Sex} from "./enums/Sex";
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

export function setUserAccounts(userAccounts) {
    return {
        type: SET_USER_ACCOUNTS,
        payload: {
            userAccounts: userAccounts
        }
    }
}

export function setOrganizations(organizations) {
    return {
        type: SET_ORGANIZATIONS,
        payload: {
            organizations: organizations
        }
    }
}

export function setActiveOrganization(organization) {
    return {
        type: SET_ACTIVE_ORGANIZATION,
        payload: {
            organization: organization
        }
    }
}

export function setAvailableItemsForSale(xs) {
    return {
        type: SET_AVAILABLE_ITEMS_FOR_SALE,
        payload: {
            itemsForSale: xs
        }
    }
}

export function setActiveSkillCategory(x) {
    return {
        type: SET_ACTIVE_SKILL_CATEGORY,
        payload: {
            skillCategory: x
        }
    }
}

export function setActiveSpellSchool(x) {
    return {
        type: SET_ACTIVE_SPELL_SCHOOL,
        payload: {
            spellSchool: x
        }
    }
}

export function setActiveSchoolLvl(x) {
    return {
        type: SET_ACTIVE_SCHOOL_LVL,
        payload: {
            schoolLvl: x
        }
    }
}

export function setActiveSkill(x) {
    return {
        type: SET_ACTIVE_SKILL,
        payload: {
            skill: x
        }
    }
}

export function setRecipes(x) {
    return {
        type: SET_RECIPES,
        payload: {
            x: x
        }
    }
}

export function setSkills(x) {
    return {
        type: SET_SKILLS,
        payload: {
            x: x
        }
    }
}

export function setQuestionnaireTemplates(x) {
    return {
        type: SET_QUESTIONNAIRE_TEMPLATES,
        payload: {
            x: x
        }
    }
}

export function setActiveQuestionnaireTemplate(x) {
    return {
        type: SET_ACTIVE_QUESTIONNAIRE_TEMPLATE,
        payload: {
            x: x
        }
    }
}

export function setActiveUserAccount(x) {
    return {
        type: SET_ACTIVE_USER_ACCOUNT,
        payload: {
            x: x
        }
    }
}

export function setActiveQuestionnaire(x) {
    return {
        type: SET_ACTIVE_QUESTIONNAIRE,
        payload: {
            x: x
        }
    }
}

export function setActiveCharacter(x) {
    return {
        type: SET_ACTIVE_CHARACTER,
        payload: {
            x: x
        }
    }
}

export function setActiveShop(x) {
    return {
        type: SET_ACTIVE_SHOP,
        payload: {
            x: x
        }
    }
}