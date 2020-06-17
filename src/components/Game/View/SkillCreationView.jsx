import React from "react";
import {connect} from "react-redux";
import InputLabel from "../../Common/InputLabel";
import {InputTextarea} from "primereact/inputtextarea";
import {changeView, updateSkillCategoryForm, updateSkillForm} from "../../../data-layer/ActionCreators";
import {useForm} from "react-hook-form";
import {upload} from "../../../util/Http";
import {uploadServerUrl, uploadUrl} from "../../../util/Parameters";
import List from "../../Common/List";
import {InputSwitch} from "primereact/inputswitch";
import SkillUpgradeForm from "../SkillUpgradeForm";
import PriceInput from "../../Common/PriceInput";
import ListItemSmall from "../../Common/ListItemSmall";
import Icon from "../../Common/Icon";
import _ from "lodash"
import Btn from "../../Common/Btn";
import UpgradeView from "../LvlUpgradeView";
import SubmitButton from "../../Common/SubmitButton";
import {skillCategoryFormView} from "../../../Views";
import DefaultFormValues from "../../../data-layer/DefaultFormValues";

function mapStateToProps(state) {
    return {
        skillForm: state.skillForm,
        skillCategoryForm: state.skillCategoryForm,
        activeGame: state.activeGame,
        growl: state.growl
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateSkillForm: fieldNameToValue => dispatch(updateSkillForm(fieldNameToValue)),
        updateSkillCategoryForm: fieldNameToValue => dispatch(updateSkillCategoryForm(fieldNameToValue)),
        changeView: view => dispatch(changeView(view))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(function (props) {

    const {register, errors, handleSubmit} = useForm()

    function onPriceAdded(list) {
        props.updateSkillForm({
            prices: props.skillForm.prices.concat([list])
        })
    }

    function onPriceDeleted(listOfCurrencyNameToAmount) {
        props.updateSkillForm({
            prices: props.skillForm.prices.filter(options => !_.isEqual(options, listOfCurrencyNameToAmount))
        })
    }

    function onUpgradeFormSubmit(data) {
        props.updateSkillForm({
            skillUpgrades: props.skillForm.skillUpgrades.concat(data)
        })
    }

    function onSaveClicked() {
        props.updateSkillCategoryForm({skills: props.skillCategoryForm.skills.concat(props.skillForm)})
        props.updateSkillForm(DefaultFormValues.skillForm)
        props.changeView(skillCategoryFormView)
        props.growl.show({severity: "info", summary: "Навык создан"})
    }

    function onBackClicked() {
        props.changeView(skillCategoryFormView)
    }

    return (
        <form style={formStyle} onSubmit={handleSubmit(onSaveClicked)}>
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
                onChange={e => upload(uploadUrl, e.target.files[0], rs => props.updateSkillForm({img: uploadServerUrl + "/" + rs.data.filename}))}
            />
            <div className={"error-label"}>{errors.img && "Загрузите картинку"}</div>

            <InputLabel text={"Описание:"}/>
            <InputTextarea autoResize={true}
                           value={props.skillForm.description}
                           onChange={e => props.updateSkillForm({description: e.target.value})}
            />

            <InputLabel text={"Стоимость:"}/>
            <List noItemsText={"Не указана"}
                  values={props.skillForm.prices.map(listOfCurrencyNameToAmount =>
                      <ListItemSmall
                          left={
                              listOfCurrencyNameToAmount
                                  .map(currencyNameToAmount => currencyNameToAmount.name + ": " + currencyNameToAmount.amount)
                                  .join(" + ")}
                          right={
                              <Icon
                                  className={"pi pi-times"}
                                  onClick={() => onPriceDeleted(listOfCurrencyNameToAmount)}
                              />
                          }
                      />
                  )}
            />
            <PriceInput currencies={["Золото", "Серебро", "Опыт"]} onSubmit={list => onPriceAdded(list)}/>

            <InputLabel text={"Прокачиваемый?"}/>
            <InputSwitch checked={props.skillForm.upgradable}
                         onChange={e => props.updateSkillForm({upgradable: e.value})}
            />

            {
                props.skillForm.upgradable &&
                <>
                    <InputLabel text={"Уровни навыка:"}/>
                    <List noItemsText={"Нет уровней"}
                          values={props.skillForm.skillUpgrades.map(upgrade =>
                              <UpgradeView lvlNum={upgrade.lvlNum}
                                           description={upgrade.description}
                                           prices={upgrade.prices}
                              />)}
                    />
                    <SkillUpgradeForm
                        lvlNum={props.skillForm.skillUpgrades.length + 1}
                        currencies={["Золото", "Опыт", "Серебро"]}
                        onSubmit={data => onUpgradeFormSubmit(data)}/>
                </>
            }
            <SubmitButton text={"Сохранить"} />
            <Btn text={"Назад"} onClick={() => onBackClicked()}/>
        </form>
    )
})

const formStyle = {
    alignSelf: "center",
    width: "90%"
}