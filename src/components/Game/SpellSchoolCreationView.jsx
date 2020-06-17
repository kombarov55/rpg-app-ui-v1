import React from "react";
import {connect} from "react-redux";
import InputLabel from "../Common/InputLabel";
import {InputTextarea} from "primereact/inputtextarea";
import Btn from "../Common/Btn";
import {changeView, updateSkillCategoryForm, updateSpellSchoolForm} from "../../data-layer/ActionCreators";
import {skillCategoryFormView, spellCreationView} from "../../Views";
import {upload} from "../../util/HttpRequests";
import DefaultFormValues from "../../data-layer/DefaultFormValues";
import AddItemButton from "../Common/AddItemButton";
import List from "../Common/List";
import InnerFormStyle from "../../styles/InnerFormStyle";
import CenterPlusButton from "../Common/CenterPlusButton";

function mapStateToProps(state) {
    return {
        form: state.spellSchoolForm,
        parentForm: state.skillCategoryForm
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeView: view => dispatch(changeView(view)),
        updateForm: fieldNameToValue => dispatch(updateSpellSchoolForm(fieldNameToValue)),
        updateParentForm: fieldNameToValue => dispatch(updateSkillCategoryForm(fieldNameToValue))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(function (props) {

    function onSaveClicked() {
        props.updateParentForm({spellSchools: props.parentForm.spellSchools.concat(props.form)})
        props.updateForm(DefaultFormValues.spellSchoolForm)
        props.changeView(skillCategoryFormView)
    }

    function onAddSpellClicked() {
        props.changeView(spellCreationView)
    }

    function onBackClicked() {
        props.changeView(skillCategoryFormView)
    }

    return (
        <div style={style}>
            <InputLabel text={"Название:"}/>
            <input name={"name"}
                   value={props.form.name}
                   onChange={e => props.updateForm({name: e.target.value})}
            />

            <InputLabel text={"Картинка:"}/>
            <input
                type={"file"}
                name={"img"}
                onChange={e => upload(e.target.files[0], filename => props.updateForm({img: filename}))}
            />

            <InputLabel text={"Описание:"}/>
            <InputTextarea autoResize={true}
                           name={"description"}
                           value={props.form.description}
                           onChange={e => props.updateForm({description: e.target.value})}
            />

            <InputLabel text={"Круги заклинаний:"}/>
            <List noItemsText={"Нет кругов заклинаний"}/>
            <div style={InnerFormStyle}>
                <InputLabel text={"1 круг:"}/>
                <InputLabel text={"Заклинания:"}/>
                <List noItemsText={"Нет заклинаний"}/>
                <CenterPlusButton onClick={() => onAddSpellClicked()} />

                <InputLabel text={"Стоимость заклинаний:"}/>
            </div>
            <AddItemButton text={"Добавить круг заклинаний"}/>

            <Btn text={"Сохранить"} onClick={() => onSaveClicked()}/>
            <Btn text={"Назад"} onClick={() => onBackClicked()}/>
        </div>
    )
})

const style = {
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",

    width: "90%"
}