import React from "react";
import {connect} from "react-redux";
import QuestionnaireTemplateItemForm from "../QuestionnaireTemplateItemForm";
import QuestionnaireTemplateAddItemButton from "../QuestionnaireTemplateAddItemButton";
import QuestionnaireTemplateItem from "../QuestionnaireTemplateItem";
import SkillpointsDistributionForm from "../SkillpointsDistributionForm";
import SkillItem from "../SkillItem";
import QuestionnaireTemplateAddSkillButton from "../QuestionnaireTemplateAddSkillButton";
import {changeView, setActiveGame, updateQuestionnaireTemplateForm} from "../../../data-layer/ActionCreators";
import QuestionnaireTemplateItemType from "../../../data-layer/enums/QuestionnaireTemplateItemType";
import Btn from "../../Common/Buttons/Btn";
import {post} from "../../../util/Http";
import {questionnaireTemplateUrl} from "../../../util/Parameters";
import {InputTextarea} from "primereact/inputtextarea";
import {gameView, skillSelectionView} from "../../../Views";
import DefaultFormValues from "../../../data-layer/DefaultFormValues";
import Preload from "../../../util/Preload";


function mapStateToProps(state, props) {
    return {
        questionnaireTemplateForm: state.questionnaireTemplateForm,
        activeGame: state.activeGame,
        growl: state.growl
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        updateQuestionnaireTemplateForm: fieldNameToValue => dispatch(updateQuestionnaireTemplateForm(fieldNameToValue)),
        changeView: view => dispatch(changeView(view)),
        setActiveGame: game => dispatch(setActiveGame(game))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(function (props) {

    function onQuestionnaireTemplateItemDeleteClicked(name) {
        props.updateQuestionnaireTemplateForm({questionnaireTemplateItems: props.questionnaireTemplateForm.questionnaireTemplateItems.filter(it => it.name !== name)})
    }

    function onSkillDeleteClicked(name) {
        props.updateQuestionnaireTemplateForm({skills: props.questionnaireTemplateForm.skills.filter(it => it.name !== name)})
    }

    function onSkillClicked(name) {
        const item = props.questionnaireTemplateForm.skills.find(it => it.name === name)
        if (item != null) {
            item.expand = !item.expand
        }

        props.updateQuestionnaireTemplateForm({skills: props.questionnaireTemplateForm.skills})
    }

    function onQuestionnaireTemplateSaveClicked() {
        const form = Object.assign({}, props.questionnaireTemplateForm, {
            gameId: props.activeGame.id
        })

        post(questionnaireTemplateUrl, form, rs => {
            props.growl.show({severity: "info", summary: "Шаблон анкеты создан"})
            props.updateQuestionnaireTemplateForm(DefaultFormValues.questionnaireTemplateForm)

            props.setActiveGame(Object.assign({}, props.activeGame, {
                questionnaireTemplates: props.activeGame.questionnaireTemplates.concat(rs)
            }))
            props.changeView(gameView)
        })
    }

    function onBackClicked() {
        props.changeView(gameView)
    }

    function onAddSkillClicked() {
        Preload.skillSelectionView(props.activeGame.id)
        props.changeView(skillSelectionView)
    }

    return (
        <div className={"questionnaire-creation-view"}>
            <div className={"questionnaire-creation-view-label"}>Название анкеты:</div>
            <input className={"questionnaire-creation-view-input"}
                   value={props.questionnaireTemplateForm.name}
                   onChange={e => props.updateQuestionnaireTemplateForm({name: e.target.value})}
            />

            <div className={"questionnaire-creation-view-label"}>Описание анкеты:</div>
            <InputTextarea className={"questionnaire-creation-view-input"}
                           autoResize={true}
                           value={props.questionnaireTemplateForm.description}
                           onChange={e => props.updateQuestionnaireTemplateForm({description: e.target.value})}
            />

            <div className={"questionnaire-creation-view-label"}>Пункты анкеты</div>
            {
                props.questionnaireTemplateForm.questionnaireTemplateItems.map(it =>
                    <QuestionnaireTemplateItem
                        key={it.name}
                        name={it.name}
                        type={QuestionnaireTemplateItemType.getValueByName(it.type)}
                        listValues={it.listValues}
                        onDelete={() => onQuestionnaireTemplateItemDeleteClicked(it.name)}
                    />
                )
            }

            {props.questionnaireTemplateForm.itemFormVisible && <QuestionnaireTemplateItemForm/>}

            <QuestionnaireTemplateAddItemButton onClick={() => props.updateQuestionnaireTemplateForm({itemFormVisible: true})}/>

            <div className={"questionnaire-creation-view-label"}>Распределение навыков:</div>
            <SkillpointsDistributionForm
                skillTypes={props.activeGame.skillTypes}
            />

            <div className={"questionnaire-creation-view-label"}>Навыки:</div>

            {props.questionnaireTemplateForm.skills.map(skill =>
                <SkillItem
                    name={skill.name}
                    type={skill.type}
                    imgSrc={"https://gamepedia.cursecdn.com/dota2_gamepedia/7/7a/Strength_attribute_symbol.png?version=d8564cc61841b6a816a9b1e6fd528f91"}
                    description={skill.description}
                    maxValue={skill.maxValue}
                    upgradeCosts={skill.upgradeCosts}
                    expand={skill.expand}
                    onClick={() => onSkillClicked(skill.name)}
                    onDelete={() => onSkillDeleteClicked(skill.name)}
                />
            )}

            <QuestionnaireTemplateAddSkillButton
                onClick={() => onAddSkillClicked()}
            />

            <Btn text={"Сохранить анкету"} onClick={() => onQuestionnaireTemplateSaveClicked()}/>
            <Btn text={"Назад"} onClick={() => onBackClicked()}/>

        </div>
    )
})