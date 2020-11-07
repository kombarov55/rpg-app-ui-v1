import {post} from "../../util/Http";
import {purchaseFromGameShopUrl} from "../../util/Parameters";

export default {
    purchaseFromGameShop: (buyerBalanceId, price, buyerCharacterId, gameId, merchandiseId, then) => post(purchaseFromGameShopUrl, {
        buyerBalanceId: buyerBalanceId,
        price: price,
        buyerCharacterId: buyerCharacterId,
        gameId: gameId,
        merchandiseId: merchandiseId
    }, () => then())
}