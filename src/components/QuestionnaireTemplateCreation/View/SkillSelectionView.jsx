import React from "react";
import {connect} from "react-redux";
import SkillItem from "../SkillItem";
import {changeView, updateQuestionnaireTemplateForm} from "../../../data-layer/ActionCreators";
import {questionnaireTemplateCreationView} from "../../../Views";

function mapStateToProps(state, props) {
    return {
        skills: state.activeGame.skills,
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

        props.changeView(questionnaireTemplateCreationView)
    }

    return (
        <div className={"list"}>
            {props.skills.filter(it =>
                !props.questionnaireTemplateForm.skills.some(addedSkill =>
                    addedSkill.name === it.name)).map(skill =>
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
        </div>
    )
})