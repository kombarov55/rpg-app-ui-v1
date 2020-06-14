import React, {useState} from "react";
import {connect} from "react-redux";
import InputLabel from "../Common/InputLabel";
import {InputTextarea} from "primereact/inputtextarea";
import {SelectButton} from "primereact/selectbutton";
import {changeView, updateGameForm, updateSkillCategoryForm} from "../../data-layer/ActionCreators";
import {upload} from "../../util/Http";
import {uploadServerUrl, uploadUrl} from "../../util/Parameters";
import {useForm} from "react-hook-form";
import {gameCreationView, gameEditView} from "../../Views";
import Globals from "../../util/Globals";
import SkillCategoryFormMode from "../../data-layer/enums/SkillCategoryFormMode";
import NoItemsLabel from "../Common/NoItemsLabel";
import SkillItem from "../QuestionnaireTemplateCreation/SkillItem";
import AddItemButton from "../Common/AddItemButton";
import HorizontalListItem from "../Common/HorizontalListItem";

const formStyle = {
    width: "90%",
    alignSelf: "center"
}

function mapStateToProps(state) {
    return {
        gameForm: state.gameForm
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateGameForm: fieldNameToValue => dispatch(updateGameForm(fieldNameToValue)),
        changeView: view => dispatch(changeView(view))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(function (props) {

    function onSkillCategoryFormSubmit() {
        props.updateGameForm({skillCategories: props.gameForm.skillCategories.concat(form)})
        props.changeView(Globals.skillCategoryFormMode === SkillCategoryFormMode.CREATE ?
            gameCreationView :
            gameEditView
        )
    }

    const [form, setForm] = useState({
        name: "",
        img: "",
        description: "",
        complex: false,

        skills: [],

        spellSchools: []
    })

    const [skillForm, setSkillForm] = useState({
        name: "",
        img: "",
        description: "",
        price: 0,
        upgradable: false
    })

    const {register, errors, handleSubmit} = useForm()

    return (
        <form style={formStyle}
              onSubmit={handleSubmit(onSkillCategoryFormSubmit)}>
            <InputLabel text={"Название категории"}/>
            <input
                name={"name"}
                ref={register({required: true})}
                value={form.name}
                onChange={e => setForm(Object.assign({}, form, {name: e.target.value}))}/>
            <div className={"error-label"}>{errors.name && "Введите название"}</div>

            <InputLabel text={"Картинка:"}/>
            <input type={"file"}
                   name={"img"}
                   ref={register({required: true})}
                   onChange={e => upload(
                       uploadUrl,
                       e.target.files[0],
                       rs => setForm(Object.assign({}, form, {img: uploadServerUrl + "/" + rs.data.filename})))}
            />
            <div className={"error-label"}>{errors.img && "Загрузите картинку"}</div>

            <InputLabel text={"Описание:"}/>
            <InputTextarea autoResize={true}
                           name={"description"}
                           ref={register({required: true})}
                           value={form.description}
                           onChange={e => setForm(Object.assign({}, form, {description: e.target.value}))}
            />

            <InputLabel text={"Тип:"}/>
            <SelectButton
                options={[
                    {label: "Простой", value: false},
                    {label: "Сложный", value: true}
                ]}
                value={form.complex}
                onChange={e => setForm(Object.assign({}, form, {complex: e.target.value}))}
            />
            {!form.complex ?
                <>
                    <InputLabel text={"Навыки:"}/>
                    <div className={"list"}>
                        {
                            form.skills.length === 0 ?
                                <NoItemsLabel text={"Нет навыков"}/> :
                                form.skills.map(skill =>
                                    <SkillItem
                                        name={skill.name}
                                        type={form.name}
                                        description={skill.description}
                                        imgSrc={skill.img}
                                    />
                                )
                        }
                    </div>
                    <AddItemButton text={"Добавить навык"}/>
                </> :
                <>
                  <InputLabel text={"Школы заклинаний:"}/>
                  <div className={"list"}>
                      {
                          form.spellSchools.length === 0 ?
                              <NoItemsLabel text={"Нет школ заклинаний"}/> :
                              form.spellSchools.map(school => <HorizontalListItem/>)
                      }
                  </div>
                    <AddItemButton text={"Добавить школу заклинаний"}/>
                </>
            }

            <input type={"submit"}
                   className={"network-creation-save-button"}
                   value={"Сохранить"}
            />
        </form>
    )
})