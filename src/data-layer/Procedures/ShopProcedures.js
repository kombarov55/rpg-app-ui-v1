import {post} from "../../util/Http";
import {purchaseFromGameShopUrl} from "../../util/Parameters";
import Popup from "../../util/Popup";

export default {
    purchaseFromGameShop: (buyerBalanceId, price, buyerCharacterId, gameId, merchandiseId, then) => post(purchaseFromGameShopUrl, {
        buyerBalanceId: buyerBalanceId,
        price: price,
        buyerCharacterId: buyerCharacterId,
        gameId: gameId,
        merchandiseId: merchandiseId
    }, () => then(), rs => Popup.error(rs.message))
}