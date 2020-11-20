import IsNumeric from "./IsNumeric";
import Popup from "./Popup";

export default {
    run: (...validationResults) => {
        return validationResults.every(v => v)
    },

    nonNull: (x, errText = "Пожалуйста, заполните все поля") => {
        if (x == null) {
            Popup.error(errText)
            return false
        }

        return true
    },
    isNumeric: (x, errText = "Пожалуйста, заполните все поля") => {
        if (!IsNumeric(x)) {
            Popup.error(errText)
            return false
        }

        return true
    }
}