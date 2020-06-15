import React from "react";
import {connect} from "react-redux";
import InputLabel from "../../Common/InputLabel";
import {InputTextarea} from "primereact/inputtextarea";
import {updateSkillForm} from "../../../data-layer/ActionCreators";
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

function mapStateToProps(state) {
    return {
        skillForm: state.skillForm,
        activeGame: state.activeGame
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateSkillForm: fieldNameToValue => dispatch(updateSkillForm(fieldNameToValue))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(function (props) {

    const {register, errors, handleSubmit} = useForm()

    function onPriceAdded(list) {
        props.updateSkillForm({
            priceOptions: props.skillForm.priceOptions.concat([list])
        })
    }

    function onPriceDeleted(listOfCurrencyNameToAmount) {
        props.updateSkillForm({
            priceOptions: props.skillForm.priceOptions.filter(options => !_.isEqual(options, listOfCurrencyNameToAmount))
        })
    }

    function onUpgradeFormSubmit(data) {
        props.updateSkillForm({
            skillUpgrades: props.skillForm.skillUpgrades.concat(data)
        })
    }

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
            <List noItemsText={"Не указана"}
                  values={props.skillForm.priceOptions.map(listOfCurrencyNameToAmount =>
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
            <Btn text={"Сохранить"}/>
            <Btn text={"Назад"}/>
        </form>
    )
})

const formStyle = {
    alignSelf: "center",
    width: "90%"
}