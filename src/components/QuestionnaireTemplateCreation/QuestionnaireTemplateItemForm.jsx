import React from "react";
import {connect} from "react-redux";
import {SelectButton} from "primereact/selectbutton";
import {updateQuestionnaireTemplateForm, updateQuestionnaireTemplateItemForm} from "../../data-layer/ActionCreators";
import ListInput from "../Common/Input/ListInput";
import DefaultFormValues from "../../data-layer/DefaultFormValues";
import QuestionnaireTemplateItemType from "../../data-layer/enums/QuestionnaireTemplateItemType";

function mapStateToProps(state, props) {
    return {
        questionnaireTemplateForm: state.questionnaireTemplateForm,
        questionnaireTemplateItemForm: state.questionnaireTemplateItemForm
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        updateQuestionnaireTemplateForm: fieldNameToValue => dispatch(updateQuestionnaireTemplateForm(fieldNameToValue)),
        updateQuestionnaireTemplateItemForm: fieldNameToValue => dispatch(updateQuestionnaireTemplateItemForm(fieldNameToValue))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(function (props) {

    function onAddListItemClicked(value) {
        if (value !== "") {
            props.updateQuestionnaireTemplateItemForm({
                listValues: props.questionnaireTemplateItemForm.listValues.filter(it => it !== value).concat(value),
                listInput: ""
            })
        }
    }

    function onDeleteListItemClicked(value) {
        props.updateQuestionnaireTemplateItemForm({
            listValues: props.questionnaireTemplateItemForm.listValues.filter(it => it !== value),
        })
    }

    function onSaveClicked() {
        props.updateQuestionnaireTemplateForm({
            questionnaireTemplateItems: props.questionnaireTemplateForm.questionnaireTemplateItems.concat(props.questionnaireTemplateItemForm),
            itemFormVisible: false
        })
        props.updateQuestionnaireTemplateItemForm(DefaultFormValues.questionnaireTemplateItemForm)

    }

    return (
        <div className={"questionnaire-creation-item-form"}>
            <div className={"questionnaire-creation-item-form-label"}>Название пункта:</div>
            <input className={"questionnaire-item-name-input"}
                   value={props.questionnaireTemplateItemForm.name}
                   onChange={e => props.updateQuestionnaireTemplateItemForm({name: e.target.value})}
            />

            <div className={"questionnaire-creation-item-form-label"}>Тип:</div>
            <SelectButton value={props.questionnaireTemplateItemForm.type}
                          onChange={e => props.updateQuestionnaireTemplateItemForm({type: e.target.value})}
                          options={[
                              {label: QuestionnaireTemplateItemType.STRING.value, value: QuestionnaireTemplateItemType.STRING.name},
                              {label: QuestionnaireTemplateItemType.NUMERIC.value, value: QuestionnaireTemplateItemType.NUMERIC.name},
                              {label: QuestionnaireTemplateItemType.GRAPHIC.value, value: QuestionnaireTemplateItemType.GRAPHIC.name},
                              {label: QuestionnaireTemplateItemType.LIST.value, value: QuestionnaireTemplateItemType.LIST.name}
                          ]}/>
            <div className={"questionnaire-creation-item-form-label"}>Элемент списка:</div>
            {props.questionnaireTemplateItemForm.type === QuestionnaireTemplateItemType.LIST.name &&
            <ListInput
                value={props.questionnaireTemplateItemForm.listInput}
                onChange={e => props.updateQuestionnaireTemplateItemForm({listInput: e.target.value})}
                onSubmit={value => onAddListItemClicked(value)}
                onDelete={value => onDeleteListItemClicked(value)}
                values={props.questionnaireTemplateItemForm.listValues}
            />
            }


            {/*<div className={"questionnaire-input-horizontal"}>*/}
            {/*    <input className={"questionnaire-item-list-input"}*/}
            {/*           */}
            {/*           */}
            {/*    <i className={"pi pi-plus-circle"}*/}
            {/*       style={{"fontSize": "5vmax"}}*/}
            {/*    />*/}
            {/*</div>*/}
            {/*<QuestionnaireInputList/>*/}

            <div className={"questionnaire-creation-item-form-disclaimer"}>
                <div className={"questionnaire-creation-item-form-disclaimer-text"}>
                    Будьте внимательны! Это отобразится в листе персонажа
                </div>
                <i className={"pi pi-exclamation-circle"}
                   style={{"fontSize": "5vmax"}}/>
            </div>
            <div className={"mobile-button save-questionnaire-button"}
                 onClick={() => onSaveClicked()}>
                Сохранить
            </div>
        </div>
    )
})