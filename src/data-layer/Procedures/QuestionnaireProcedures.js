import {post} from "../../util/Http";
import {approveQuestionnaireUrl, archiveQuestionnaireUrl, clarifyQuestionnaireUrl} from "../../util/Parameters";

export default {

    approve: (questionnaireId, onSuccess = () => {}) => {
        post(approveQuestionnaireUrl, {questionnaireId: questionnaireId}, _ => onSuccess())
    },

    clarify: (questionnaireId, onSuccess = () => {}) => {
        post(clarifyQuestionnaireUrl, {questionnaireId: questionnaireId}, _ => onSuccess())
    },

    archive: (questionnaireId, onSuccess = () => {}) => {
        post(archiveQuestionnaireUrl, {questionnaireId: questionnaireId}, _ => onSuccess())
    }

}