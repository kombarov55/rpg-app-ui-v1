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

    const [visibility, setVisibility] = useState({
        currency: false,
        currencyCombination: false,
        skillUpgrade: false
    })

    function onCurrencyForUpgradeChecked(name, checked) {
        if (checked && !props.skillForm.currenciesForUpgrade.some(it => it === name)) {
            props.updateSkillForm({currenciesForUpgrade: props.skillForm.currenciesForUpgrade.concat(name)})
        } else {
            props.updateSkillForm({currenciesForUpgrade: props.skillForm.currenciesForUpgrade.filter(it => it !== name)})
        }
    }

    function onCurrencyCombinationFormSubmit(data) {
        console.log(data)
        const checkedCurrencyNames = data.filter(it => it.checked).map(it => it.name)

        const combinationExists =
            props
                .skillForm
                .skillUpgradeCurrencyCombinations
                .some(savedCombination => _.isEqual(savedCombination.sort(), checkedCurrencyNames.sort()))

        if (!combinationExists && checkedCurrencyNames.length !== 0) {
            props.updateSkillForm({
                skillUpgradeCurrencyCombinations: props
                    .skillForm
                    .skillUpgradeCurrencyCombinations
                    .concat([checkedCurrencyNames])
            })
        }

        setVisibility(updateObject(visibility, {currencyCombination: false}))
    }

    function onCurrencyCombinationDeleteClicked(currencyNames) {
        props.updateSkillForm({
            skillUpgradeCurrencyCombinations: props
                .skillForm
                .skillUpgradeCurrencyCombinations
                .filter(list => !_.isEqual(list, currencyNames))
        })
    }

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

            <InputLabel text={"Валюты для повышения:"}/>
            <MultiCheckButtonGroup options={["Золото", "Опыт", "Серебро"]}
                                   onChecked={({name, checked}) => onCurrencyForUpgradeChecked(name, checked)}
            />

            <InputLabel text={"Сочетания валют для повышения:"}/>
            <List noItemsText={"нет сочетаний"}
                  values={props.skillForm.skillUpgradeCurrencyCombinations.map(names =>
                      <ListItemSmall
                          left={names.join(" + ")}
                          right={<Icon className={"pi pi-times"}
                                       onClick={() => onCurrencyCombinationDeleteClicked(names)}/>}
                      />
                  )}
            />
            <SkillUpgradeCurrencyCombinationForm
                currencyNames={props.skillForm.currenciesForUpgrade}
                onSubmit={data => onCurrencyCombinationFormSubmit(data)}
            />

            <InputLabel text={"Уровни навыка:"}/>
            <div className={"list"}>
                <NoItemsLabel text={"Нет уровней"}/>
            </div>
            <AddItemButton text={"Добавить"}/>


        </form>
    )
})