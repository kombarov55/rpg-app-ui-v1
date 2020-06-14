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
import setProperty from "../../../util/setProperty";
import ListItemSmall from "../../Common/ListItemSmall";
import Icon from "../../Common/Icon";
import MultiCheckButtonGroup from "../../Common/MultiCheckButtonGroup";
import EqLists from "../../../util/EqLists";

function mapStateToProps(state) {
    return {
        skillForm: state.skillForm,
        activeGame: state.activeGame
    }
}

function mapDispatchToProps(dispatch) {
    return {
        filterList: (stateObjectName, propertyName, predicate) => dispatch(filterList(stateObjectName, propertyName, predicate)),
        appendElement: (stateObjectName, propertyName, element) => dispatch(appendElement(stateObjectName, propertyName, element)),
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
        if (checked) {
            props.appendElement("skillForm", "currenciesForUpgrade", name)
        } else {
            props.filterList("skillForm", "currenciesForUpgrade", it => it !== name)
        }
    }

    function onAddCurrencyCombinationClicked() {
        setVisibility(updateObject(visibility, {currencyCombination: true}))
    }

    function onCurrencyCombinationFormSubmit(data) {
        const checkedCurrencyNames = Object.keys(data).filter(key => data[key] === true)

        const combinationExists =
            props
                .skillForm
                .skillUpgradeCurrencyCombinations
                .some(savedCombination => EqLists(savedCombination, checkedCurrencyNames)
    )

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
            <div className={"list"}>
                {
                    props.skillForm.skillUpgradeCurrencyCombinations.length === 0 ?
                        <NoItemsLabel text={"Нет сочетаний"}/> :
                        props.skillForm.skillUpgradeCurrencyCombinations.map(names =>
                            <ListItemSmall
                                left={names.join(" + ")}
                                right={<Icon className={"pi pi-times"}/>}
                            />
                        )

                }
            </div>
            {
                visibility.currencyCombination &&
                <SkillUpgradeCurrencyCombinationForm
                    currencyNames={props.skillForm.currenciesForUpgrade}
                    onSubmit={data => onCurrencyCombinationFormSubmit(data)}
                />
            }
            {
                !visibility.currencyCombination &&
                <AddItemButton text={"Добавить"}
                               onClick={() => onAddCurrencyCombinationClicked()}
                />
            }


            <InputLabel text={"Уровни навыка:"}/>
            <div className={"list"}>
                <NoItemsLabel text={"Нет уровней"}/>
            </div>
            <AddItemButton text={"Добавить"}/>


        </form>
    )
})