import React from "react";
import {connect} from "react-redux";
import {SelectButton} from "primereact/selectbutton";
import QuestionnaireInputList from "./QuestionnaireInputList";
import Btn from "../Common/Btn";
import {updateQuestionnaireForm, updateQuestionnaireItemForm} from "../../data-layer/ActionCreators";
import ListInput from "../Common/ListInput";
import DefaultFormValues from "../../data-layer/DefaultFormValues";
import QuestionnaireItemType from "../../data-layer/enums/QuestionnaireItemType";

function mapStateToProps(state, props) {
    return {
        questionnaireForm: state.questionnaireForm,
        questionnaireItemForm: state.questionnaireItemForm
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        updateQuestionnaireForm: fieldNameToValue => dispatch(updateQuestionnaireForm(fieldNameToValue)),
        updateQuestionnaireItemForm: fieldNameToValue => dispatch(updateQuestionnaireItemForm(fieldNameToValue))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(function (props) {

    function onAddListItemClicked(value) {
        if (value !== "") {
            props.updateQuestionnaireItemForm({
                listValues: props.questionnaireItemForm.listValues.filter(it => it !== value).concat(value),
                listInput: ""
            })
        }
    }

    function onDeleteListItemClicked(value) {
        props.updateQuestionnaireItemForm({
            listValues: props.questionnaireItemForm.listValues.filter(it => it !== value),
        })
    }

    function onSaveClicked() {
        props.updateQuestionnaireForm({
            questionnaireItems: props.questionnaireForm.questionnaireItems.concat(props.questionnaireItemForm),
            itemFormVisible: false
        })
        props.updateQuestionnaireItemForm(DefaultFormValues.questionnaireItemForm)

    }

    return (
        <div className={"questionnaire-creation-item-form"}>
            <div className={"questionnaire-creation-item-form-label"}>Название пункта:</div>
            <input className={"questionnaire-item-name-input"}
                   value={props.questionnaireItemForm.name}
                   onChange={e => props.updateQuestionnaireItemForm({name: e.target.value})}
            />

            <div className={"questionnaire-creation-item-form-label"}>Тип:</div>
            <SelectButton value={props.questionnaireItemForm.type}
                          onChange={e => props.updateQuestionnaireItemForm({type: e.target.value})}
                          options={[
                              {label: QuestionnaireItemType.STRING.value, value: QuestionnaireItemType.STRING.name},
                              {label: QuestionnaireItemType.NUMERIC.value, value: QuestionnaireItemType.NUMERIC.name},
                              {label: QuestionnaireItemType.GRAPHIC.value, value: QuestionnaireItemType.GRAPHIC.name},
                              {label: QuestionnaireItemType.LIST.value, value: QuestionnaireItemType.LIST.name}
                          ]}/>
            <div className={"questionnaire-creation-item-form-label"}>Элемент списка:</div>
            {props.questionnaireItemForm.type === QuestionnaireItemType.LIST.name &&
            <ListInput
                value={props.questionnaireItemForm.listInput}
                onChange={e => props.updateQuestionnaireItemForm({listInput: e.target.value})}
                onSubmit={value => onAddListItemClicked(value)}
                onDelete={value => onDeleteListItemClicked(value)}
                values={props.questionnaireItemForm.listValues}
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