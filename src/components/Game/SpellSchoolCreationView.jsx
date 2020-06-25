import React, {useState} from "react";
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
import PriceInput from "../Common/PriceInput";
import AddSchoolLvlForm from "./AddSchoolLvlForm";
import priceCombinationToString from "../../util/priceCombinationToString";
import ListItemSmall from "../Common/ListItemSmall";

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

    function onBackClicked() {
        props.changeView(skillCategoryFormView)
    }

    const [addSchoolVisible, setAddSchoolVisible] = useState(false)

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

            <InputLabel text={"Мин. заклинаний для перехода на сл. круг: "}/>
            <input/>

            <InputLabel text={"Варианты покупки школы: "}/>
            <List noItemsText={"Пусто"}
                  values={
                      props.form.purchasePriceCombinations.map(priceCombination =>
                          <ListItemSmall left={priceCombinationToString(priceCombination)}/>
                      )}
            />
            <PriceInput currencies={["Серебро", "Золото", "Опыт"]}
                        onSubmit={priceCombination => props.updateForm({
                            purchasePriceCombinations: props.form.purchasePriceCombinations.concat([priceCombination])
                        })}
            />

            <InputLabel text={"Круги заклинаний:"}/>
            <List noItemsText={"Нет кругов заклинаний"}/>

            {
                addSchoolVisible && <AddSchoolLvlForm/>
            }

            {
                !addSchoolVisible &&
                <AddItemButton text={"Добавить круг заклинаний"}
                               onClick={() => setAddSchoolVisible(true)}
                />}


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