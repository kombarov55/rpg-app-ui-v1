import React, {useState} from "react";
import {connect} from "react-redux";
import InputLabel from "../Common/InputLabel";
import {InputTextarea} from "primereact/inputtextarea";
import {SelectButton} from "primereact/selectbutton";
import {changeView, updateActiveGame, updateGameForm, updateSkillCategoryForm} from "../../data-layer/ActionCreators";
import {post, upload} from "../../util/Http";
import {saveSkillCategory, uploadServerUrl, uploadUrl} from "../../util/Parameters";
import {useForm} from "react-hook-form";
import {gameCreationView, gameEditView, gameView, skillCreationView, spellSchoolCreationView} from "../../Views";
import Globals from "../../util/Globals";
import SkillCategoryFormMode from "../../data-layer/enums/SkillCategoryFormMode";
import NoItemsLabel from "../Common/NoItemsLabel";
import SkillItem from "../QuestionnaireTemplateCreation/SkillItem";
import AddItemButton from "../Common/AddItemButton";
import HorizontalListItem from "../Common/HorizontalListItem";
import List from "../Common/List";
import ListItemExpand from "./ListItemExpand";
import nonNullList from "../../util/nonNullList";
import priceListToString from "../../util/priceCombinationListToString";
import DefaultFormValues from "../../data-layer/DefaultFormValues";

const formStyle = {
    width: "90%",
    alignSelf: "center"
}

function mapStateToProps(state) {
    return {
        skillCategoryForm: state.skillCategoryForm,
        activeGame: state.activeGame,
        growl: state.growl
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateSkillCategoryForm: fieldNameToValue => dispatch(updateSkillCategoryForm(fieldNameToValue)),
        updateGameForm: fieldNameToValue => dispatch(updateGameForm(fieldNameToValue)),
        changeView: view => dispatch(changeView(view)),
        updateActiveGame: fieldNameToValue => dispatch(updateActiveGame(fieldNameToValue))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(function (props) {

    function onSaveClicked() {
        post(saveSkillCategory(props.activeGame.id), props.skillCategoryForm, rs => {
            props.updateActiveGame({skillCategories: props.activeGame.skillCategories.concat(props.skillCategoryForm)})
            props.updateSkillCategoryForm(DefaultFormValues.skillCategoryForm)
            props.growl.show({severity: "info", summary: "Категория создана."})
        }, () => props.growl.show({
            severity: "info",
            summary: "Ошибка при создании категории навыка. Обратитесь к администратору."
        }))

        props.changeView(gameView)
    }

    function onAddSkillClicked() {
        props.changeView(skillCreationView)
    }

    function onAddSpellSchoolClicked() {
        props.changeView(spellSchoolCreationView)
    }

    const {register, errors, handleSubmit} = useForm()

    return (
        <form style={formStyle}
              onSubmit={handleSubmit(onSaveClicked)}>
            <InputLabel text={"Название категории"}/>
            <input
                name={"name"}
                ref={register({required: true})}
                value={props.skillCategoryForm.name}
                onChange={e => props.updateSkillCategoryForm({name: e.target.value})}/>
            <div className={"error-label"}>{errors.name && "Введите название"}</div>

            <InputLabel text={"Картинка:"}/>
            <input type={"file"}
                   name={"img"}
                   ref={register({required: true})}
                   onChange={e => upload(
                       uploadUrl,
                       e.target.files[0],
                       rs => props.updateSkillCategoryForm({img: uploadServerUrl + "/" + rs.data.filename}))}
            />
            <div className={"error-label"}>{errors.img && "Загрузите картинку"}</div>

            <InputLabel text={"Описание:"}/>
            <InputTextarea autoResize={true}
                           name={"description"}
                           ref={register({required: true})}
                           value={props.skillCategoryForm.description}
                           onChange={e => props.updateSkillCategoryForm({description: e.target.value})}
            />

            <InputLabel text={"Тип:"}/>
            <SelectButton
                options={[
                    {label: "Простой", value: false},
                    {label: "Сложный", value: true}
                ]}
                value={props.skillCategoryForm.complex}
                onChange={e => props.updateSkillCategoryForm({complex: e.target.value})}
            />
            {!props.skillCategoryForm.complex ?
                <>
                    <InputLabel text={"Навыки:"}/>
                    <List noItemsText={"Нет навыков"}
                          values={props.skillCategoryForm.skills.map(skill =>
                              <ListItemExpand name={skill.name}
                                              img={skill.img}
                                              description={skill.description}
                                              bullets={nonNullList(
                                                  skill.skillUpgrades.length !== 0 ?
                                                      "Максимальный уровень: " + skill.skillUpgrades.length :
                                                      null,

                                                  "Стоимость покупки: " + priceListToString(skill.prices)
                                              )}
                              />)}
                    />
                    <AddItemButton text={"Добавить навык"} onClick={() => onAddSkillClicked()}/>
                </> :
                <>
                    <InputLabel text={"Школы заклинаний:"}/>
                    <div className={"list"}>
                        {
                            props.skillCategoryForm.spellSchools.length === 0 ?
                                <NoItemsLabel text={"Нет школ заклинаний"}/> :
                                props.skillCategoryForm.spellSchools.map(school =>
                                    <ListItemExpand
                                        name={school.name}
                                        img={school.img}
                                        description={school.description}
                                    />)
                        }
                    </div>
                    <AddItemButton text={"Добавить школу заклинаний"} onClick={() => onAddSpellSchoolClicked()}/>
                </>
            }

            <input type={"submit"}
                   className={"network-creation-save-button"}
                   value={"Сохранить"}
            />
        </form>
    )
})