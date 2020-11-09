import {post} from "../../util/Http";
import {adminTransferUrl, transferUrl} from "../../util/Parameters";
import Popup from "../../util/Popup";

export default {
    adminTransfer: (to, currency, amount, destinationId, destinationType, then) => post(adminTransferUrl, {
        to: to,
        currency: currency,
        amount: amount,
        destinationId: destinationId,
        destinationType: destinationType
    }, () => then()),
    transfer: (from, to, currency, amount, originId, originType, destinationId, destinationType, then) => post(transferUrl, {
        from: from,
        to: to,
        currency: currency,
        originId: originId,
        originType: originType,
        destinationId: destinationId,
        destinationType: destinationType
    }, () => then(), rs => Popup.error(rs.message))
}