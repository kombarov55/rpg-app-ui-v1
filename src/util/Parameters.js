import {rootUrl} from "./RootUrl";

export const loginUrl = rootUrl + "/login"

export const userAccountUrl = (userId) => rootUrl + "/user/" + userId
export const allUsersShortUrl = rootUrl + "/user/short"
export const toggleFavAnnouncementUrl = (userId) => userAccountUrl(userId) + "/toggleFavAnnouncement"
export const toggleRespondAnnouncementUrl = (userId) => userAccountUrl(userId) + "/toggleRespAnnouncement"

export const announcementUrl = rootUrl + "/announcement"
export const restoreAnnouncementUrl = announcementId => announcementUrl + "/" + announcementId + "/restore"

export const uploadServerUrl = "http://localhost:8081"

export const uploadUrl = uploadServerUrl + "/uploadfile"

export const createCommentUrl = announcementUrl + "/comment"
export const commentUrl = (announcementId) => announcementUrl + "/" + announcementId + "/comment"
export const deleteCommentUrl = (announcementId, commentId) => announcementUrl + "/" + announcementId + "/comment/" + commentId
export const restoreCommentUrl = (announcementId, commentId) => announcementUrl + "/" + announcementId + "/comment/" + commentId + "/restore"

export const conversationUrl = rootUrl + "/conversation"
export const getAllConversationsUrl = userId => rootUrl + "/conversation/" + userId
export const messageUrl = conversationId => conversationUrl + "/" + conversationId + "/message"
export const getMsgsUrl = (conversationId, page, pageSize) => messageUrl(conversationId) + "?page=" + page + "&pageSize=" + pageSize
export const msgLongpollUrl = (conversationId, lastMsgTimestamp, userId) => messageUrl(conversationId) + "/longpoll?lastMsgTimestamp=" + lastMsgTimestamp + "&myUserId=" + userId

export const networkUrl = rootUrl + "/network"
export const editNetworkUrl = networkId => rootUrl + "/network/" + networkId
export const deleteNetworkUrl = networkId => networkUrl + "/"  + networkId

export const subnetworkUrl = networkId => networkUrl + "/" + networkId + "/subnetwork"
export const editSubnetworkUrl = (networkId, subnetworkId) => subnetworkUrl(networkId) + "/" + subnetworkId
export const deleteSubnetworkUrl = (networkId, subnetworkId) => subnetworkUrl(networkId) + "/" + subnetworkId

export const gamesUrl = rootUrl + "/game"
export const gameUrl = (gameId) => rootUrl + "/game/" + gameId
export const gameByNetworkId = networkId => networkUrl + "/" + networkId + "/game"
export const gameBySubnetworkId = (networkId, subnetworkId) => subnetworkUrl(networkId) + "/" + subnetworkId + "/game"
export const editGameByNetworkId = (networkId, gameId) => gameByNetworkId(networkId) + "/" + gameId
export const editGamebySubnetworkId = (networkId, subnetworkId, gameId) => gameBySubnetworkId(networkId, subnetworkId) + "/" + gameId
export const deleteGameUrl = gameId => rootUrl + "/game/" + gameId

export const questionnaireTemplateUrl = rootUrl + "/questionnaireTemplate"
export const questionnaireTemplateFindByGameIdUrl = gameId => rootUrl + "/game/" + gameId + "/questionnaire"
export const questionnaireTemplateByIdUrl = questionnaireId => questionnaireTemplateUrl + "/" + questionnaireId
export const questionnaireTemplateRestoreUrl = questionnaireId => questionnaireTemplateByIdUrl(questionnaireId) + "/restore"


export const skillsByGameIdUrl = gameId => rootUrl + "/game/" + gameId + "/skill"
export const shortSkillsByGameIdUrl = gameId => rootUrl + "/game/" + gameId + "/skill/short"

export const currenciesByGameIdUrl = gameId => rootUrl + "/game/" + gameId + "/currency"

export const conversionsByGameIdUrl = gameId => rootUrl + "/game/" + gameId + "/conversion"

export const saveCurrencyUrl = gameId => rootUrl + "/game/" + gameId + "/currency"
export const updateCurrencyUrl = (gameId, currencyId) => rootUrl + "/game/" + gameId + "/currency/" + currencyId

export const saveSkillCategoryUrl = gameId => rootUrl + "/game/" + gameId + "/skillCategory"
export const skillCategoryUrl = skillCategoryId => rootUrl + "/skillCategory/" + skillCategoryId

export const saveSkillUrl = skillCategoryId => rootUrl + "/skillCategory/" + skillCategoryId + "/skill"
export const skillByIdUrl = id => rootUrl + "/skill/" + id

export const saveShopUrl = gameId => rootUrl + "/game/" + gameId + "/shop"
export const shopByIdUrl = shopId => rootUrl + "/shop/" + shopId
export const deleteShopUrl = (gameId, shopId) => rootUrl + "/game/" + gameId + "/shop/" + shopId

export const merchandiseCategoryUrl = gameId => rootUrl + "/game/" + gameId + "/merchandiseCategory"
export const merchandiseCategoryByIdUrl = (gameId, merchandiseCategoryId) => rootUrl + "/game/" + gameId + "/merchandiseCategory/" + merchandiseCategoryId

export const merchandiseTypeUrl = gameId => rootUrl + "/game/" + gameId + "/merchandiseType"
export const merchandiseTypeByIdUrl = (gameId, merchandiseTypeId) => rootUrl + "/game/" + gameId + "/merchandiseType/" + merchandiseTypeId

export const merchandiseUrl = gameId => rootUrl + "/game/" + gameId + "/merchandise"
export const merchandiseByIdUrl = (gameId, merchandiseId) => rootUrl + "/game/" + gameId + "/merchandise/" + merchandiseId
export const merchandiseByGameIdAndDestination = (gameId, destination) => rootUrl + "/game/" + gameId + "/merchandise/filter?destination=" + destination

export const saveItemForSaleUrl = (gameId, shopId) => rootUrl + "/game/" + gameId + "/shop/" + shopId + "/itemForSale"
export const updateItemForSaleUrl = (gameId, shopId, id) => rootUrl + "/game/" + gameId + "/shop/" + shopId + "/itemForSale/" + id
export const deleteItemForSaleUrl = (gameId, shopId, id) => rootUrl + "/game/" + gameId + "/shop/" + shopId + "/itemForSale/" + id

export const organizationByGameIdUrl = gameId => rootUrl + "/game/" + gameId + "/organization"
export const organizationUrl = id => rootUrl + "/organization/" + id
export const organizationByGameIdAndIdUrl = (gameId, id) => rootUrl + "/game/" + gameId + "/organization/" + id
export const organizationHeadUrl = (organizationId, headId) => rootUrl + "/organization/" + organizationId + "/head/" + headId

export const addOrganizationShopUrl = organizationUrl => rootUrl + "/organization/" + organizationUrl + "/shop"
export const removeOrganizationShopUrl = (organizationUrl, shopId) => rootUrl + "/organization/" + organizationUrl + "/shop/" + shopId

export const addCreditOfferUrl = organizationId => rootUrl + "/organization/" + organizationId + "/credit-offer"
export const removeCreditOfferUrl = (organizationId, creditOfferId) => rootUrl + "/organization/" + organizationId + "/credit-offer/" + creditOfferId

export const addBalanceUrl = organizationId => rootUrl + "/organization/" + organizationId + "/balance"

export const addOwnedMerchandiseUrl = (organizationId, merchandiseId, amount) => rootUrl + "/organization/" + organizationId + "/ownedMerchandise/" + merchandiseId + "?amount=" + amount