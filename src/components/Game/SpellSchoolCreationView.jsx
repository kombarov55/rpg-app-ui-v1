import React, {useState} from "react";
import {connect} from "react-redux";
import InputLabel from "../Common/Labels/InputLabel";
import {InputTextarea} from "primereact/inputtextarea";
import Btn from "../Common/Buttons/Btn";
import {changeView, updateSkillCategoryForm, updateSpellSchoolForm} from "../../data-layer/ActionCreators";
import {skillCategoryFormView, spellCreationView} from "../../Views";
import {upload} from "../../util/HttpRequests";
import DefaultFormValues from "../../data-layer/DefaultFormValues";
import AddItemButton from "../Common/Buttons/AddItemButton";
import List from "../Common/Lists/List";
import PriceInput from "../Common/Input/PriceInput";
import AddSchoolLvlForm from "./AddSchoolLvlForm";
import priceCombinationToString from "../../util/priceCombinationToString";
import SmallDeletableListItem from "../Common/ListElements/SmallDeletableListItem";
import ExpandableListItemWithBullets from "../Common/ListElements/ExpandableListItemWithBullets";

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

    function onSchoolLvlFormSubmitted(schoolLvl) {
        props.updateForm({
            schoolLvls: props.form.schoolLvls.concat(schoolLvl)
        })
        setAddSchoolVisible(false)
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
            <input value={props.form.minSpellCountToUpgrade}
                   onChange={e => props.updateForm({minSpellCountToUpgrade: e.target.value})}
            />

            <InputLabel text={"Варианты покупки школы: "}/>
            <List noItemsText={"Пусто"}
                  values={
                      props.form.purchasePriceCombinations.map(priceCombination =>
                          <SmallDeletableListItem
                              text={priceCombinationToString(priceCombination)}
                              onDelete={() => props.updateForm({
                                  purchasePriceCombinations: props.form.purchasePriceCombinations.filter(it => it !== priceCombination)
                              })}
                          />
                      )}
            />
            <PriceInput currencies={["Серебро", "Золото", "Опыт"]}
                        onSubmit={priceCombination => props.updateForm({
                            purchasePriceCombinations: props.form.purchasePriceCombinations.concat([priceCombination])
                        })}
            />

            <InputLabel text={"Круги заклинаний:"}/>
            <List noItemsText={"Нет кругов заклинаний"}
                  values={props.form.schoolLvls.map((schoolLvl, i) =>
                      <ExpandableListItemWithBullets
                          name={(i + 1) + " круг:"}
                          description={"Заклинания:"}
                          bullets={schoolLvl.spells.map(spell => spell.name)}
                      />)}
            />

            {
                addSchoolVisible &&
                <AddSchoolLvlForm
                    lvl={props.form.schoolLvls.length + 1}
                    onSubmit={form => onSchoolLvlFormSubmitted(form)}
                />
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