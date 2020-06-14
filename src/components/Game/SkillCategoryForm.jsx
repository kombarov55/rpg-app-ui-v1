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
        complex: false
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

            <SelectButton
                options={[
                    {label: "Простой", value: false},
                    {label: "Сложный", value: true}
                ]}
                value={form.complex}
                onChange={e => setForm(Object.assign({}, form, {complex: e.target.value}))}
            />
            <input type={"submit"}
                   className={"network-creation-save-button"}
                   value={"Сохранить"}
            />
        </form>
    )
})