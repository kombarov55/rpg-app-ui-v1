import React from "react";
import {connect} from "react-redux";
import QuestionnaireItemForm from "../QuestionnaireItemForm";
import QuestionnaireAddItemButton from "../QuestionnaireAddItemButton";
import QuestionnaireItem from "../QuestionnaireItem";
import SkillpointsDistributionForm from "../SkillpointsDistributionForm";
import SkillItem from "../SkillItem";
import QuestionnaireAddSkillButton from "../QuestionnaireAddSkillButton";
import {changeView, updateQuestionnaireForm} from "../../../data-layer/ActionCreators";
import QuestionnaireItemType from "../../../data-layer/enums/QuestionnaireItemType";
import SkillItemForm from "../../Game/View/SkillCreationView";
import Btn from "../../Common/Btn";
import {post} from "../../../util/Http";
import {questionnaireUrl} from "../../../util/Parameters";
import {InputTextarea} from "primereact/inputtextarea";
import {gameView} from "../../../Views";
import DefaultFormValues from "../../../data-layer/DefaultFormValues";


function mapStateToProps(state, props) {
    return {
        questionnaireForm: state.questionnaireForm,
        activeGame: state.activeGame,
        growl: state.growl
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        updateQuestionnaireForm: fieldNameToValue => dispatch(updateQuestionnaireForm(fieldNameToValue)),
        changeView: view => dispatch(changeView(view))
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

    function onQuestionnaireSaveClicked() {
        const form = Object.assign({}, props.questionnaireForm, {
            gameId: props.activeGame.id
        })

        post(questionnaireUrl, form, () => {
            props.growl.show({severity: "info", summary: "Шаблон анкеты создан"})
            props.updateQuestionnaireForm(DefaultFormValues.questionnaireForm)
            props.changeView(gameView)
        })
    }

    return (
        <div className={"questionnaire-creation-view"}>
            <div className={"questionnaire-creation-view-label"}>Название анкеты:</div>
            <input className={"questionnaire-creation-view-input"}
                   value={props.questionnaireForm.name}
                   onChange={e => props.updateQuestionnaireForm({name: e.target.value})}
            />

            <div className={"questionnaire-creation-view-label"}>Описание анкеты:</div>
            <InputTextarea className={"questionnaire-creation-view-input"}
                           autoResize={true}
                           value={props.questionnaireForm.description}
                           onChange={e => props.updateQuestionnaireForm({description: e.target.value})}
            />

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
                            upgradeCosts={skill.upgradeCosts}
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

            <Btn text={"Сохранить анкету"}
                 onClick={() => onQuestionnaireSaveClicked()}
            />

        </div>
    )
})