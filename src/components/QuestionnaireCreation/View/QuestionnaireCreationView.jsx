import React from "react";
import {connect} from "react-redux";
import QuestionnaireItemForm from "../QuestionnaireItemForm";
import QuestionnaireAddItemButton from "../QuestionnaireAddItemButton";
import QuestionnaireItem from "../QuestionnaireItem";
import SkillpointsDistributionForm from "../SkillpointsDistributionForm";
import SkillItem from "../SkillItem";
import QuestionnaireAddSkillButton from "../QuestionnaireAddSkillButton";
import {updateQuestionnaireForm} from "../../../data-layer/ActionCreators";
import QuestionnaireItemType from "../../../data-layer/enums/QuestionnaireItemType";
import SkillItemForm from "../SkillItemForm";


function mapStateToProps(state, props) {
    return {
        questionnaireForm: state.questionnaireForm,
        activeGame: state.activeGame
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        updateQuestionnaireForm: fieldNameToValue => dispatch(updateQuestionnaireForm(fieldNameToValue))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(function (props) {

    function onQuestionnaireItemDeleteClicked(name) {
        props.updateQuestionnaireForm({questionnaireItems: props.questionnaireForm.questionnaireItems.filter(it => it.name !== name)})
    }

    function onSkillDeleteClicked(name) {
        props.updateQuestionnaireForm({skills: props.questionnaireForm.skills.filter(it => it.name !== name)})
    }

    function onSkillClicked(name) {
        const item = props.questionnaireForm.skills.find(it => it.name === name)
        if (item != null) {
            item.expand = !item.expand
        }

        props.updateQuestionnaireForm({skills: props.questionnaireForm.skills})
    }

    return (
        <div className={"questionnaire-creation-view"}>
            <div className={"questionnaire-creation-view-label"}>Пункты анкеты</div>
            {
                props.questionnaireForm.questionnaireItems.map(it =>
                    <QuestionnaireItem
                        key={it.name}
                        name={it.name}
                        type={QuestionnaireItemType.getValueByName(it.type)}
                        listValues={it.listValues}
                        onDelete={() => onQuestionnaireItemDeleteClicked(it.name)}
                    />
                )
            }

            {props.questionnaireForm.itemFormVisible && <QuestionnaireItemForm/>}

            <QuestionnaireAddItemButton onClick={() => props.updateQuestionnaireForm({itemFormVisible: true})}/>

            <div className={"questionnaire-creation-view-label"}>Распределение навыков</div>
            <SkillpointsDistributionForm
                skillTypes={props.activeGame.skillTypes}
            />

            {
                props.questionnaireForm.skills.length === 0 ? "Нет навыков" :
                    props.questionnaireForm.skills.map(skill =>
                        <SkillItem
                            name={skill.name}
                            type={skill.type}
                            imgSrc={"https://gamepedia.cursecdn.com/dota2_gamepedia/7/7a/Strength_attribute_symbol.png?version=d8564cc61841b6a816a9b1e6fd528f91"}
                            description={skill.description}
                            maxValue={skill.maxValue}
                            upgradeCosts={skill.upgradeCosts.map(skillCost =>
                                skillCost.costs.map(({currencyName, amount}) =>
                                    amount + " " + currencyName).join(", "))}
                            expand={skill.expand}
                            onClick={() => onSkillClicked(skill.name)}
                            onDelete={() => onSkillDeleteClicked(skill.name)}
                        />)
            }
            {
                props.questionnaireForm.skillFormVisible &&

                <SkillItemForm
                    skillTypes={props.activeGame.skillTypes}
                    currencies={props.activeGame.currencies}
                />
            }

            <QuestionnaireAddSkillButton
                onClick={() => props.updateQuestionnaireForm({skillFormVisible: true})}
            />

        </div>
    )
})