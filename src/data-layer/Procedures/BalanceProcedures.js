import {post} from "../../util/Http";
import {adminTransferUrl} from "../../util/Parameters";

export default {
    adminTransfer: (to, currency, amount, destinationId, destinationType, then) => post(adminTransferUrl, {
        to: to,
        currency: currency,
        amount: amount,
        destinationId: destinationId,
        destinationType: destinationType
    }, () => then())
}