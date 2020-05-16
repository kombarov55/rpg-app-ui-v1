import React from "react";
import {connect} from "react-redux";
import SkillItem from "../SkillItem";
import {changeView, updateQuestionnaireForm} from "../../../data-layer/ActionCreators";
import {questionnaireCreationView} from "../../../Views";

function mapStateToProps(state, props) {
    return {
        skills: state.activeGame.skills,
        questionnaireForm: state.questionnaireForm
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        updateQuestionnaireForm: fieldNameToValue => dispatch(updateQuestionnaireForm(fieldNameToValue)),
        changeView: view => dispatch(changeView(view))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(function (props) {

    function onSkillClicked(skill) {
        props.updateQuestionnaireForm({
            skills: props.questionnaireForm.skills.concat(skill)
        })

        props.changeView(questionnaireCreationView)
    }

    return (
        <div className={"list"}>
            {props.skills.filter(it =>
                !props.questionnaireForm.skills.some(addedSkill =>
                    addedSkill.name === it.name)).map(skill =>
                <SkillItem
                    name={skill.name}
                    type={skill.type}
                    imgSrc={"https://gamepedia.cursecdn.com/dota2_gamepedia/7/7a/Strength_attribute_symbol.png?version=d8564cc61841b6a816a9b1e6fd528f91"}
                    description={"Чем она выше - тем сильнее ваш персонаж"}
                    onClick={() => onSkillClicked(skill)}
                    expand={skill.expand}
                    maxValue={100}
                    upgradeCosts={skill.upgradeCosts}
                />
            )}
        </div>
    )
})