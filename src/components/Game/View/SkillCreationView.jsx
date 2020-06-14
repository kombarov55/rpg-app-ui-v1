import React, {useState} from "react";
import {connect} from "react-redux";
import InputLabel from "../../Common/InputLabel";
import {InputTextarea} from "primereact/inputtextarea";
import NoItemsLabel from "../../Common/NoItemsLabel";
import AddItemButton from "../../Common/AddItemButton";
import {appendElement, filterList, updateSkillForm} from "../../../data-layer/ActionCreators";
import {useForm} from "react-hook-form";
import {upload} from "../../../util/Http";
import {uploadServerUrl, uploadUrl} from "../../../util/Parameters";
import updateObject from "../../../util/updateObject";
import SkillUpgradeCurrencyCombinationForm from "../SkillUpgradeCurrencyCombinationForm";
import ListItemSmall from "../../Common/ListItemSmall";
import Icon from "../../Common/Icon";
import MultiCheckButtonGroup from "../../Common/MultiCheckButtonGroup";
import _ from "lodash"
import List from "../../Common/List";
import {InputSwitch} from "primereact/inputswitch";
import SkillUpgradeForm from "../SkillUpgradeForm";

function mapStateToProps(state) {
    return {
        skillForm: state.skillForm,
        activeGame: state.activeGame
    }
}

function mapDispatchToProps(dispatch) {
    return {
        filterList: (propertyName, predicate) => dispatch(filterList("skillForm", propertyName, predicate)),
        appendElement: (propertyName, element) => dispatch(appendElement("skillForm", propertyName, element)),
        updateSkillForm: fieldNameToValue => dispatch(updateSkillForm(fieldNameToValue))
    }
}

const formStyle = {
    alignSelf: "center",
    width: "90%"
}

export default connect(mapStateToProps, mapDispatchToProps)(function (props) {

    const {register, errors, handleSubmit} = useForm()

    return (
        <form style={formStyle}>
            <InputLabel text={"Название:"}/>
            <input
                name={"name"}
                ref={register({required: true})}
                value={props.skillForm.name}
                onChange={e => props.updateSkillForm({name: e.target.value})}
            />
            <div className={"error-label"}>{errors.name && "Введите имя"}</div>

            <InputLabel text={"Картинка:"}/>
            <input
                type={"file"}
                name={"img"}
                ref={register({required: true})}
                onChange={e => upload(uploadUrl, e.target.files[0], rs => props.updateSkillForm({img: uploadServerUrl + "/" + rs.data.filename}))}
            />
            <div className={"error-label"}>{errors.img && "Загрузите картинку"}</div>

            <InputLabel text={"Описание:"}/>
            <InputTextarea autoResize={true}/>

            <InputLabel text={"Стоимость:"}/>
            <input />

            <InputLabel text={"Прокачиваемый?"}/>
            <InputSwitch checked={props.skillForm.upgradable}
                         onChange={e => props.updateSkillForm({upgradable: e.value})}
            />

            {
                props.skillForm.upgradable &&
                <>
                    <InputLabel text={"Уровни навыка:"}/>
                    <List noItemsText={"Нет уровней"}/>
                    <SkillUpgradeForm/>
                    <AddItemButton text={"Добавить"}/>
                </>
            }

        </form>
    )
})