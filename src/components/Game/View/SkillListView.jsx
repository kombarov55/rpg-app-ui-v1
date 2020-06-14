import React from "react";
import {connect} from "react-redux";
import Label from "../../Common/Label";
import SkillItem from "../../QuestionnaireTemplateCreation/SkillItem";
import Btn from "../../Common/Btn";
import {changeView, updateSkillForm} from "../../../data-layer/ActionCreators";
import {gameView, skillCategoryFormView, skillCreationView, skillEditView} from "../../../Views";
import DefaultFormValues from "../../../data-layer/DefaultFormValues";
import AddItemButton from "../../Common/AddItemButton";

function mapStateToProps(state, props) {
    return {
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        updateSkillForm: skill => dispatch(updateSkillForm(skill)),
        changeView: view => dispatch(changeView(view))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(function (props) {

    function onAddSkillCategoryClicked() {
        props.changeView(skillCategoryFormView)
    }

    function onBackClicked() {
        props.changeView(gameView)
    }

    return (
        <div className={"skills-view"}>
            <Label text={"Категории навыков"}/>
            <AddItemButton text={"Добавить категорию навыков"}
                           onClick={() => onAddSkillCategoryClicked()}
            />
                <Btn
                    text={"Назад"}
                    onClick={() => onBackClicked()}
                />
        </div>
    )
})