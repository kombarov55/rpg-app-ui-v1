import {rootUrl} from "./RootUrl";

export const loginUrl = rootUrl + "/login"

export const userAccountUrl = (userId) => rootUrl + "/user/" + userId
export const allUsersShortUrl = rootUrl + "/user/short"
export const toggleFavAnnouncementUrl = (userId) => userAccountUrl(userId) + "/toggleFavAnnouncement"
export const toggleRespondAnnouncementUrl = (userId) => userAccountUrl(userId) + "/toggleRespAnnouncement"

export const announcementUrl = rootUrl + "/announcement"
export const restoreAnnouncementUrl = announcementId => announcementUrl + "/" + announcementId + "/restore"

export const uploadServerUrl = "https://www.novemis.ru:8084"

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

export const saveGameUrl = `${rootUrl}/game/`
export const openGamesUrl = rootUrl + "/game/open"
export const allGamesUrl = rootUrl + "/game"
export const gameByIdUrl = (gameId) => rootUrl + "/game/" + gameId
export const gameByNetworkId = networkId => networkUrl + "/" + networkId + "/game"
export const gameBySubnetworkId = (networkId, subnetworkId) => subnetworkUrl(networkId) + "/" + subnetworkId + "/game"
export const editGameByNetworkId = (networkId, gameId) => gameByNetworkId(networkId) + "/" + gameId
export const editGamebySubnetworkId = (networkId, subnetworkId, gameId) => gameBySubnetworkId(networkId, subnetworkId) + "/" + gameId
export const deleteGameUrl = gameId => rootUrl + "/game/" + gameId
export const patchSettingsUrl = gameId => `${rootUrl}/game/${gameId}/settings`
export const gameSettingsUrl = gameId => `${rootUrl}/game/${gameId}/settings`

export const skillsByGameIdUrl = gameId => rootUrl + "/game/" + gameId + "/skill"
export const shortSkillsByGameIdUrl = gameId => rootUrl + "/game/" + gameId + "/skill/short"

export const currenciesByGameIdUrl = gameId => rootUrl + "/game/" + gameId + "/currency"

export const conversionsByGameIdUrl = gameId => rootUrl + "/game/" + gameId + "/conversion"

export const saveCurrencyUrl = gameId => rootUrl + "/game/" + gameId + "/currency"
export const updateCurrencyUrl = (gameId, currencyId) => rootUrl + "/game/" + gameId + "/currency/" + currencyId

export const saveSkillCategoryUrl = gameId => rootUrl + "/game/" + gameId + "/skillCategory"
export const skillCategoryUrl = skillCategoryId => rootUrl + "/skillCategory/" + skillCategoryId
export const findAllSkillCategoriesShortByGameId = gameId => rootUrl + "/game/" + gameId + "/skillCategory/short"
export const findAllSkillCategoriesByGameIdAndDestinationUrl = (gameId, destination) => rootUrl + "/game/" + gameId + "/skillCategory/filter?destination=" + destination

export const saveSkillUrl = skillCategoryId => rootUrl + "/skillCategory/" + skillCategoryId + "/skill"
export const skillByIdUrl = id => rootUrl + "/skill/" + id
export const findSkillsByGameIdAndDestination = (gameId, destination) => `${rootUrl}/game/${gameId}/skill/short/find?destination=${destination}`
export const findSkillByNameUrl = (gameId, name) => `${rootUrl}/game/${gameId}/skill/findByName?name=${name}`

export const itemCategoryUrl = gameId => rootUrl + "/game/" + gameId + "/itemCategory"
export const itemCategoryByIdUrl = (gameId, itemCategoryId) => rootUrl + "/game/" + gameId + "/itemCategory/" + itemCategoryId

export const itemTypeUrl = gameId => rootUrl + "/game/" + gameId + "/itemType"
export const itemTypeByIdUrl = (gameId, itemTypeId) => rootUrl + "/game/" + gameId + "/itemType/" + itemTypeId

export const itemTemplateUrl = gameId => rootUrl + "/game/" + gameId + "/itemTemplate"
export const itemTemplateByIdUrl = (gameId, itemTemplateId) => rootUrl + "/game/" + gameId + "/itemTemplate/" + itemTemplateId
export const itemTemplateByGameIdAndDestination = (gameId, destination) => rootUrl + "/game/" + gameId + "/itemTemplate/filter?destination=" + destination
export const itemTemplateByGameIdAndName = (gameId, name) => `${rootUrl}/game/${gameId}/itemTemplate/filterByName?name=${name}`
export const findCraftableItemTemplatesByGameIdAndNameUrl = (gameId, name) => `${rootUrl}/game/${gameId}/itemTemplate/filterByName?name=${name}&canBeCrafted=true`
export const findUsableInCraftItemTemplatesByGameIdAndNameUrl = (gameId, name) => `${rootUrl}/game/${gameId}/itemTemplate/filterByName?name=${name}&canBeUsedInCraft=true`
export const getItemsUrl = characterId => `${rootUrl}/character/${characterId}/items/short`

export const organizationByGameIdUrl = gameId => rootUrl + "/game/" + gameId + "/organization"
export const organizationUrl = id => rootUrl + "/organization/" + id
export const findOrganizationsShortByGameIdUrl = gameId => `${rootUrl}/game/${gameId}/organization/short`
export const organizationByGameIdAndTypeUrl = (id, type) => rootUrl + "/game/" + id + "/organization/filter?type=" + type
export const organizationByGameIdAndIdUrl = (gameId, id) => rootUrl + "/game/" + gameId + "/organization/" + id
export const organizationHeadUrl = (organizationId, headId) => rootUrl + "/organization/" + organizationId + "/head/" + headId
export const findOrganizationByGameIdAndNameUrl = (gameId, name) => `${rootUrl}/game/${gameId}/organization/filterByName?name=${name}`
export const getOrganizationByIdUrl = id => `${rootUrl}/organization/${id}`
export const findOverdueCreditsUrl = organizationId => `${rootUrl}/organization/${organizationId}/credit/overdue`

export const addOrganizationShopUrl = organizationUrl => rootUrl + "/organization/" + organizationUrl + "/shop"
export const removeOrganizationShopUrl = (organizationUrl, shopId) => rootUrl + "/organization/" + organizationUrl + "/shop/" + shopId

export const addCreditOfferUrl = organizationId => rootUrl + "/organization/" + organizationId + "/credit-offer"
export const removeCreditOfferUrl = creditOfferId => `${rootUrl}/credit-offer/${creditOfferId}`

export const addOwnedMerchandiseUrl = (organizationId, merchandiseId, amount) => rootUrl + "/organization/" + organizationId + "/ownedMerchandise/" + merchandiseId + "?amount=" + amount

export const addItemForSaleForGameUrl = gameId => rootUrl + "/game/" + gameId + "/itemForSale"
export const removeItemForSaleForGameUrl = (gameId, itemForSaleId) => rootUrl + "/game/" + gameId + "/itemForSale/" + itemForSaleId

export const addSpellSchoolUrl = skillCategoryId => rootUrl + "/skillCategory/" + skillCategoryId + "/spellSchool"
export const editSpellSchoolUrl = id => rootUrl + "/spellSchool/" + id
export const findAvailableSpells = (gameId, characterId) => `${rootUrl}/game/${gameId}/spell/available?characterId=${characterId}`

export const addSchoolLvlToSpellSchoolUrl = spellSchoolId => rootUrl + "/spellSchool/" + spellSchoolId + "/schoolLvl"
export const schoolLvlByIdUrl = id => `${rootUrl}/schoolLvl/${id}`

export const addSpellUrl = schoolLvlId => rootUrl + "/schoolLvl/" + schoolLvlId + "/spell"
export const editSpellUrl = spellId => rootUrl + "/spell/" + spellId
export const deleteSpellUrl = spellId => rootUrl + "/spell/" + spellId
export const findSpellByName = (spellSchoolId, name) => `${rootUrl}/spellSchool/${spellSchoolId}/spell/findByName?name=${name}`

export const addSpellPurchaseOptionUrl = schoolLvl => rootUrl + "/schoolLvl/" + schoolLvl + "/spellPurchaseOption"
export const editSpellPurchaseOption = spellPurchaseOptionId => rootUrl + "/spellPurchaseOption/" + spellPurchaseOptionId
export const deleteSpellPurchaseOption = spellPurchaseOptionId => rootUrl + "/spellPurchaseOption/" + spellPurchaseOptionId

export const addSkillUpgradeUrl = skillId => rootUrl + "/skill/" + skillId + "/skillUpgrade"
export const editSkillUpgradeUrl = skillUpgradeId => rootUrl + "/skillUpgrade/" + skillUpgradeId
export const deleteSkillUpgrade = skillUpgradeId => rootUrl + "/skillUpgrade/" + skillUpgradeId

export const getRecipesByGameId = gameId => rootUrl + "/game/" + gameId + "/recipe"
export const saveRecipeUrl = gameId => rootUrl + "/game/" + gameId + "/recipe"
export const deleteRecipeUrl = id => rootUrl + "/recipe/" + id

export const findQuestionnaireTemplatesByGameId = gameId => rootUrl + "/game/" + gameId + "/questionnaireTemplate"
export const questionnaireTemplateByIdUrl = id => rootUrl + "/questionnaireTemplate/" + id
export const saveQuestionnaireTemplateUrl = gameId => rootUrl + "/game/" + gameId + "/questionnaireTemplate"
export const deleteQuestionnaireTemplateUrl = id => rootUrl + "/questionnaireTemplate/" + id
export const editQuestionnaireTemplateUrl = id => rootUrl + "/questionnaireTemplate/" + id

export const saveQuestionnaireTemplateFieldUrl = questionnaireTemplateId => rootUrl + "/questionnaireTemplate/" + questionnaireTemplateId + "/field"
export const editQuestionnaireTemplateFieldUrl = id => rootUrl + "/field/" + id
export const deleteQuestionnaireTemplateFieldUrl = id => rootUrl + "/field/" + id

export const saveSkillCategoryToPointsUrl = questionnaireTemplateId => rootUrl + "/questionnaireTemplate/" + questionnaireTemplateId + "/skillCategoryToPoints"
export const deleteSkillCategoryToPointsUrl = id => rootUrl + "/skillCategoryToPoints/" + id

export const findAllQuestionnairesByGameIdUrl = gameId => rootUrl + "/game/" + gameId + "/questionnaire"
export const saveQuestionnaireUrl = (gameId, questionnaireTemplateId) => rootUrl + "/game/" + gameId + "/questionnaireTemplate/" + questionnaireTemplateId + "/questionnaire"
export const getQuestionnaireById = id => rootUrl + "/questionnaire/" + id

export const notificationUrl = rootUrl + "/notification"

export const getCharacterByIdUrl = id => rootUrl + "/character/" + id
export const getCharactersByUserIdUrl = userId => `${rootUrl}/userAccount/${userId}/character`
export const getCharactersByGameIdAndUserIdUrl = (userId, gameId) => `${rootUrl}/userAccount/${userId}/game/${gameId}/character`
export const findCharacterByNameUrl = (gameId, name) => `${rootUrl}/game/${gameId}/character/filter?name=${name}`
export const getCharacterBalances = id => `${rootUrl}/character/${id}/balances`

export const shopByIdUrl = id => `${rootUrl}/shop/${id}`

export const findPendingCreditRequestsByOrganizationId = organizationId => `${rootUrl}/organization/${organizationId}/credit-request/pending`

export const approveQuestionnaireUrl = rootUrl + "/questionnaire/approve.do"
export const clarifyQuestionnaireUrl = rootUrl + "/questionnaire/clarify.do"
export const archiveQuestionnaireUrl = rootUrl + "/questionnaire/archive.do"

export const makeCharacterActiveUrl = `${rootUrl}/userAccount/makeCharacterActive.do`
export const killCharacterUrl = `${rootUrl}/userAccount/killCharacter.do`
export const reviveCharacterUrl = `${rootUrl}/userAccount/reviveCharacter.do`

export const transferUrl = `${rootUrl}/balance/transfer.do`
export const adminTransferUrl = `${rootUrl}/balance/adminTransfer.do`
export const convertUrl = `${rootUrl}/balance/convert.do`

export const upgradeSkillUrl = `${rootUrl}/gameCharacter/upgradeSkill.do`
export const purchaseSkillUrl = `${rootUrl}/gameCharacter/purchaseSkill.do`
export const purchaseSpellUrl = `${rootUrl}/gameCharacter/purchaseSpell.do`
export const disposeCharacterItemUrl = `${rootUrl}/gameCharacter/disposeItem.do`
export const equipItemUrl = `${rootUrl}/gameCharacter/equipItem.do`
export const unequipItemUrl = `${rootUrl}/gameCharacter/unequipItem.do`
export const upgradeItemUrl = `${rootUrl}/gameCharacter/upgradeItem.do`

export const purchaseFromShopUrl = `${rootUrl}/shop/purchase.do`
export const setItemForSaleUrl = `${rootUrl}/shop/setItemForSale.do`

export const purchaseFromGameUrl = `${rootUrl}/game/purchaseItem.do`
export const setItemForSaleInGameUrl = `${rootUrl}/game/addItemForSale.do`
export const transferItemUrl = `${rootUrl}/game/transferItem.do`

export const disposeOrganizationItemUrl = `${rootUrl}/organization/disposeItem.do`
export const equipOrganizationItemUrl = `${rootUrl}/organization/equipItem.do`
export const unequipOrganizationItemUrl = `${rootUrl}/organization/unequipItem.do`

export const submitCreditRequestUrl = `${rootUrl}/credit/submitCreditRequest.do`
export const approveCreditRequest = `${rootUrl}/credit/approveCreditRequest.do`
export const rejectCreditRequest = `${rootUrl}/credit/rejectCreditRequest.do`
export const creditPaymentUrl = `${rootUrl}/credit/creditPayment.do`

export const performCraftingUrl = `${rootUrl}/craft/performCrafting.do`