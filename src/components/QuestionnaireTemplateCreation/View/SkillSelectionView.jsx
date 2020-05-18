import React from "react";
import {connect} from "react-redux";
import SkillItem from "../SkillItem";
import {changeView, updateQuestionnaireTemplateForm} from "../../../data-layer/ActionCreators";
import {questionnaireTemplateCreationView, questionnaireTemplateEditView} from "../../../Views";
import Globals from "../../../util/Globals";
import QuestionnaireTemplateFormMode from "../../../data-layer/enums/QuestionnaireTemplateFormMode";
import Btn from "../../Common/Btn";

function mapStateToProps(state, props) {
    return {
        skills: state.skills,
        questionnaireTemplateForm: state.questionnaireTemplateForm
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        updateQuestionnaireTemplateForm: fieldNameToValue => dispatch(updateQuestionnaireTemplateForm(fieldNameToValue)),
        changeView: view => dispatch(changeView(view))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(function (props) {

    function onSkillClicked(skill) {
        props.updateQuestionnaireTemplateForm({
            skills: props.questionnaireTemplateForm.skills.concat(skill)
        })

        props.changeView(Globals.questionnaireTemplateFormMode === QuestionnaireTemplateFormMode.CREATE ?
            questionnaireTemplateCreationView :
            questionnaireTemplateEditView
        )
    }

    function onBackClicked() {
        props.changeView(Globals.questionnaireTemplateFormMode === QuestionnaireTemplateFormMode.CREATE ?
            questionnaireTemplateCreationView :
            questionnaireTemplateEditView
        )
    }

    return (
        <div className={"list"}>
            {props.skills.filter(it => props.questionnaireTemplateForm.skills.every(addedSkill => it.name !== addedSkill.name))
                .map(skill =>
                    <SkillItem
                        name={skill.name}
                        type={skill.type}
                        imgSrc={"https://gamepedia.cursecdn.com/dota2_gamepedia/7/7a/Strength_attribute_symbol.png?version=d8564cc61841b6a816a9b1e6fd528f91"}
                        description={skill.description}
                        onClick={() => onSkillClicked(skill)}
                        expand={skill.expand}
                        maxValue={100}
                        upgradeCosts={skill.upgradeCosts}
                    />
                )}
                <Btn text={"Назад"}
                     onClick={() => onBackClicked()}
                />
        </div>
    )
})