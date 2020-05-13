import React from "react";
import {connect} from "react-redux";
import {updateQuestionnaireForm} from "../../data-layer/ActionCreators";
import isNumeric from "../../util/IsNumeric";
import IsNumeric from "../../util/IsNumeric";

function mapStateToProps(state, props) {
    return {
        questionnaireForm: state.questionnaireForm
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        updateQuestionnaireForm: fieldNameToValue => dispatch(updateQuestionnaireForm(fieldNameToValue))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(function (props) {
    function distributeSkillPoint(name, value) {
        let updatedList = props.questionnaireForm.skillPointsDistribution.slice()

        const prevItem = updatedList.find(it => it.skillType === name)

        if (prevItem == null) {
            updatedList = updatedList.concat({
                skillType: name,
                maxValue: parseInt(value)
            })
        } else {
            prevItem.maxValue = parseInt(value)
        }

        props.updateQuestionnaireForm({skillPointsDistribution: updatedList})
    }

    return (
        <div className={"questionnaire-creation-skillpoints-distribution-vertical"}>
            {props.skillTypes.map(name =>
                <div key={name} className={"questionnaire-creation-skillpoints-distribution-entry"}>
                    <div className={"questionnaire-creation-skillpoints-distribution-name"}>
                        {name}
                    </div>
                    <input className={"questionnaire-creation-skillpoints-distribution-value"}
                           onChange={e => distributeSkillPoint(name, e.target.value)}
                    />
                </div>
            )}


            {/*<div className={"questionnaire-creation-skillpoints-distribution-entry"}>*/}
            {/*    <div className={"questionnaire-creation-skillpoints-distribution-name"}>*/}
            {/*        Боевые:*/}
            {/*    </div>*/}
            {/*    <input className={"questionnaire-creation-skillpoints-distribution-value"}/>*/}
            {/*</div>*/}
            {/*<div className={"questionnaire-creation-skillpoints-distribution-entry"}>*/}
            {/*    <div className={"questionnaire-creation-skillpoints-distribution-name"}>*/}
            {/*        Магические:*/}
            {/*    </div>*/}
            {/*    <input className={"questionnaire-creation-skillpoints-distribution-value"}/>*/}
            {/*</div>*/}
            {/*<div className={"questionnaire-creation-skillpoints-distribution-entry"}>*/}
            {/*    <div className={"questionnaire-creation-skillpoints-distribution-name"}>*/}
            {/*        Прочие:*/}
            {/*    </div>*/}
            {/*    <input className={"questionnaire-creation-skillpoints-distribution-value"}/>*/}
            {/*</div>*/}
        </div>
    )
})