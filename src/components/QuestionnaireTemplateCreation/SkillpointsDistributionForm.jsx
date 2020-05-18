import React from "react";
import {connect} from "react-redux";
import {updateQuestionnaireTemplateForm} from "../../data-layer/ActionCreators";

function mapStateToProps(state, props) {
    return {
        questionnaireTemplateForm: state.questionnaireTemplateForm
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        updateQuestionnaireTemplateForm: fieldNameToValue => dispatch(updateQuestionnaireTemplateForm(fieldNameToValue))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(function (props) {
    function value(name) {
        const item = props.questionnaireTemplateForm.skillPointsDistribution
            .find(it => it.skillType === name)

        if (item != null) {
            return item.maxValue
        } else {
            return ""
        }
    }

    function distributeSkillPoint(name, value) {
        let updatedList = props.questionnaireTemplateForm.skillPointsDistribution.slice()

        const prevItem = updatedList.find(it => it.skillType === name)
        if (prevItem == null) {
            updatedList = updatedList.concat({
                skillType: name,
                maxValue: value === "" || window.isNaN(value) ?
                    "" :
                    parseInt(value)
            })
        } else {
            const prevValue = prevItem.maxValue
            prevItem.maxValue =
                value === "" ?
                    "" :
                    window.isNaN(value) ?
                        prevValue :
                        parseInt(value)
        }

        props.updateQuestionnaireTemplateForm({skillPointsDistribution: updatedList})
    }

    return (
        <div className={"questionnaire-creation-skillpoints-distribution-vertical"}>
            {props.skillTypes.map(name =>
                <div key={name} className={"questionnaire-creation-skillpoints-distribution-entry"}>
                    <div className={"questionnaire-creation-skillpoints-distribution-name"}>{name}:</div>
                    <input className={"questionnaire-creation-skillpoints-distribution-value"}
                           value={value(name)}
                           onChange={e => distributeSkillPoint(name, e.target.value)}
                    />
                </div>
            )}
        </div>
    )
})