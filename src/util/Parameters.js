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

export const saveGameUrl = `${rootUrl}/game/`
export const openGamesUrl = rootUrl + "/game/open"
export const allGamesUrl = rootUrl + "/game"
export const gameByIdUrl = (gameId) => rootUrl + "/game/" + gameId
export const gameByNetworkId = networkId => networkUrl + "/" + networkId + "/game"
export const gameBySubnetworkId = (networkId, subnetworkId) => subnetworkUrl(networkId) + "/" + subnetworkId + "/game"
export const editGameByNetworkId = (networkId, gameId) => gameByNetworkId(networkId) + "/" + gameId
export const editGamebySubnetworkId = (networkId, subnetworkId, gameId) => gameBySubnetworkId(networkId, subnetworkId) + "/" + gameId
export const deleteGameUrl = gameId => rootUrl + "/game/" + gameId

export const skillsByGameIdUrl = gameId => rootUrl + "/game/" + gameId + "/skill"
export const shortSkillsByGameIdUrl = gameId => rootUrl + "/game/" + gameId + "/skill/short"

export const currenciesByGameIdUrl = gameId => rootUrl + "/game/" + gameId + "/currency"

export const conversionsByGameIdUrl = gameId => rootUrl + "/game/" + gameId + "/conversion"

export const saveCurrencyUrl = gameId => rootUrl + "/game/" + gameId + "/currency"
export const updateCurrencyUrl = (gameId, currencyId) => rootUrl + "/game/" + gameId + "/currency/" + currencyId

export const saveSkillCategoryUrl = gameId => rootUrl + "/game/" + gameId + "/skillCategory"
export const skillCategoryUrl = skillCategoryId => rootUrl + "/skillCategory/" + skillCategoryId
export const findAllSkillCategoriesShortByGameId = gameId => rootUrl + "/game/" + gameId + "/skillCategory/short"
export const findAllSkillCategoriesByGameIdUrl = gameId => rootUrl + "/game/" + gameId + "/skillCategory"
export const findAllSkillCategoriesByGameIdAndDestionationUrl = (gameId, destination) => rootUrl + "/game/" + gameId + "/skillCategory/filter?destination=" + destination

export const saveSkillUrl = skillCategoryId => rootUrl + "/skillCategory/" + skillCategoryId + "/skill"
export const skillByIdUrl = id => rootUrl + "/skill/" + id
export const findSkillsByGameIdAndDestination = (gameId, destination) => `${rootUrl}/game/${gameId}/skill/short/find?destination=${destination}`

export const itemCategoryUrl = gameId => rootUrl + "/game/" + gameId + "/itemCategory"
export const itemCategoryByIdUrl = (gameId, itemCategoryId) => rootUrl + "/game/" + gameId + "/itemCategory/" + itemCategoryId

export const itemTypeUrl = gameId => rootUrl + "/game/" + gameId + "/itemType"
export const itemTypeByIdUrl = (gameId, itemTypeId) => rootUrl + "/game/" + gameId + "/itemType/" + itemTypeId

export const itemTemplateUrl = gameId => rootUrl + "/game/" + gameId + "/itemTemplate"
export const itemTemplateByIdUrl = (gameId, itemTemplateId) => rootUrl + "/game/" + gameId + "/itemTemplate/" + itemTemplateId
export const itemTemplateByGameIdAndDestination = (gameId, destination) => rootUrl + "/game/" + gameId + "/itemTemplate/filter?destination=" + destination
export const itemTemplateByGameIdAndName = (gameId, name) => `${rootUrl}/game/${gameId}/itemTemplate/filterByName?name=${name}`
export const getItemsUrl = characterId => `${rootUrl}/character/${characterId}/items/short`

export const organizationByGameIdUrl = gameId => rootUrl + "/game/" + gameId + "/organization"
export const organizationUrl = id => rootUrl + "/organization/" + id
export const findOrganizationsShortByGameIdUrl = gameId => `${rootUrl}/game/${gameId}/organization/short`
export const organizationByGameIdAndTypeUrl = (id, type) => rootUrl + "/game/" + id + "/organization/filter?type=" + type
export const organizationByGameIdAndIdUrl = (gameId, id) => rootUrl + "/game/" + gameId + "/organization/" + id
export const organizationHeadUrl = (organizationId, headId) => rootUrl + "/organization/" + organizationId + "/head/" + headId
export const findOrganizationByGameIdAndNameUrl = (gameId, name) => `${rootUrl}/game/${gameId}/organization/filterByName?name=${name}`
export const getOrganizationByIdUrl = id => `${rootUrl}/organization/${id}`

export const addOrganizationShopUrl = organizationUrl => rootUrl + "/organization/" + organizationUrl + "/shop"
export const removeOrganizationShopUrl = (organizationUrl, shopId) => rootUrl + "/organization/" + organizationUrl + "/shop/" + shopId

export const addCreditOfferUrl = organizationId => rootUrl + "/organization/" + organizationId + "/credit-offer"
export const removeCreditOfferUrl = (organizationId, creditOfferId) => rootUrl + "/organization/" + organizationId + "/credit-offer/" + creditOfferId

export const addBalanceUrl = organizationId => rootUrl + "/organization/" + organizationId + "/balance"

export const addOwnedMerchandiseUrl = (organizationId, merchandiseId, amount) => rootUrl + "/organization/" + organizationId + "/ownedMerchandise/" + merchandiseId + "?amount=" + amount

export const addItemForSaleForGameUrl = gameId => rootUrl + "/game/" + gameId + "/itemForSale"
export const removeItemForSaleForGameUrl = (gameId, itemForSaleId) => rootUrl + "/game/" + gameId + "/itemForSale/" + itemForSaleId

export const addSpellSchoolUrl = skillCategoryId => rootUrl + "/skillCategory/" + skillCategoryId + "/spellSchool"
export const editSpellSchoolUrl = id => rootUrl + "/spellSchool/" + id
export const findSpellSchoolsByGameIdAndDestination = (gameId, destination) => `${rootUrl}/game/${gameId}/skillCategory/findByDestination?destination=${destination}`
export const findAvailableSpells = (gameId, characterId) => `${rootUrl}/game/${gameId}/spell/available?characterId=${characterId}`

export const addSchoolLvlToSpellSchoolUrl = spellSchoolId => rootUrl + "/spellSchool/" + spellSchoolId + "/schoolLvl"

export const addSpellUrl = schoolLvlId => rootUrl + "/schoolLvl/" + schoolLvlId + "/spell"
export const editSpellUrl = spellId => rootUrl + "/spell/" + spellId
export const deleteSpellUrl = spellId => rootUrl + "/spell/" + spellId

export const addSpellPurchaseOptionUrl = schoolLvl => rootUrl + "/schoolLvl/" + schoolLvl + "/spellPurchaseOption"
export const editSpellPurchaseOption = spellPurchaseOptionId => rootUrl + "/spellPurchaseOption/" + spellPurchaseOptionId
export const deleteSpellPurchaseOption = spellPurchaseOptionId => rootUrl + "/spellPurchaseOption/" + spellPurchaseOptionId

export const addSkillUpgradeUrl = skillId => rootUrl + "/skill/" + skillId + "/skillUpgrade"
export const editSkillUpgradeUrl = skillUpgradeId => rootUrl + "/skillUpgrade/" + skillUpgradeId
export const deleteSkillUpgrade = skillUpgradeId => rootUrl + "/skillUpgrade/" + skillUpgradeId

export const getRecipesByGameId = gameId => rootUrl + "/game/" + gameId + "/recipe"
export const saveRecipe = gameId => rootUrl + "/game/" + gameId + "/recipe"
export const updateRecipe = (gameId, recipeId) => rootUrl + "/game/" + gameId + "/recipe/" + recipeId
export const deleteRecipe = id => rootUrl + "/recipe/" + id

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
export const findCharacterByNameUrl = (gameId, name) => `${rootUrl}/game/${gameId}/character/filter?name=${name}`
export const getCharacterBalances = id => `${rootUrl}/character/${id}/balances`

export const shopByIdUrl = id => `${rootUrl}/shop/${id}`

export const approveQuestionnaireUrl = rootUrl + "/questionnaire/approve.do"
export const clarifyQuestionnaireUrl = rootUrl + "/questionnaire/clarify.do"
export const archiveQuestionnaireUrl = rootUrl + "/questionnaire/archive.do"

export const makeCharacterActiveUrl = `${rootUrl}/userAccount/makeCharacterActive.do`
export const killCharacterUrl = `${rootUrl}/userAccount/killCharacter.do`
export const reviveCharacterUrl = `${rootUrl}/userAccount/reviveCharacter.do`

export const transferUrl = `${rootUrl}/balance/transfer.do`
export const adminTransferUrl = `${rootUrl}/balance/adminTransfer.do`

export const upgradeSkillUrl = `${rootUrl}/gameCharacter/upgradeSkill.do`
export const purchaseSkillUrl = `${rootUrl}/gameCharacter/purchaseSkill.do`
export const purchaseSpellUrl = `${rootUrl}/gameCharacter/purchaseSpell.do`
export const disposeItemUrl = `${rootUrl}/gameCharacter/disposeItem.do`

export const purchaseFromShopUrl = `${rootUrl}/shop/purchase.do`
export const purchaseFromGameUrl = `${rootUrl}/game/purchaseItem.do`
export const setItemForSaleUrl = `${rootUrl}/shop/setItemForSale.do`
export const setItemForSaleInGameUrl = `${rootUrl}/game/addItemForSale.do`