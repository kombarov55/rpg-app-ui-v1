import IsNumeric from "./IsNumeric";
import Popup from "./Popup";

export default {
    run: (...validationResults) => {
        return validationResults.every(v => v)
    },

    nonNull: (x, fieldName) => {
        if (x == null) {
            Popup.error(`Пожалуйста, заполните поле ${fieldName}`)
            return false
        }

        return true
    },

    isNumeric: (x, fieldName) => {
        if (!IsNumeric(x)) {
            Popup.error(`${fieldName} должно быть цифрой`)
            return false
        }

        return true
    },

    notEqual(x1, x2, field1Name, field2Name) {
        if (x1 === x2) {
            Popup.error(`${field1Name} и ${field2Name} должны быть разными`)
            return false
        }

        return true
    },

    between: (x, min, max, fieldName) => {
        if (!IsNumeric(x)) {
            Popup.error(`"${fieldName}" должно быть цифрой`)
            return false
        }

        if (x < min || x > max) {
            Popup.error(`"${fieldName}" должно быть между ${min} и ${max}`)
            return false
        }

        return true
    }
}