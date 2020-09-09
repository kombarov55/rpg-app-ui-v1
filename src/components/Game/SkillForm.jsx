import React, {useState} from "react";
import {useForm} from "react-hook-form";
import Popup from "../../util/Popup";
import InputLabel from "../Common/Labels/InputLabel";
import {uploadServerUrl, uploadUrl} from "../../util/Parameters";
import {upload} from "../../util/HttpRequests";
import {InputTextarea} from "primereact/inputtextarea";
import List from "../Common/Lists/List";
import SmallListItem from "../Common/ListElements/SmallListItem";
import Icon from "../Common/Input/Icon";
import PriceInput from "../Common/Input/PriceInput";
import {InputSwitch} from "primereact/inputswitch";
import LvlUpgradeView from "./LvlUpgradeView";
import SkillUpgradeForm from "./SkillUpgradeForm";
import FormSubmitButton from "../Common/Buttons/FormSubmitButton";
import _ from "lodash"
import FormTitleLabel from "../Common/Labels/FormTitleLabel";

/**
 * @param props {onSubmit, currencies}
 * props.currencies: [{name, amount}]
 */
export default function (props) {

    const {register, errors, handleSubmit} = useForm()
    const [name, setName] = useState()
    const [img, setImg] = useState()
    const [description, setDescription] = useState()
    const [prices, setPrices] = useState([])
    const [upgradable, setUpgradable] = useState()
    const [upgrades, setUpgrades] = useState([])

    function onPriceAdded(list) {
        setPrices(prices.concat([list]))
    }

    function onPriceDeleted(listOfCurrencyNameToAmount) {
        setPrices(prices.filter(options => !_.isEqual(options, listOfCurrencyNameToAmount)))
    }

    function onUpgradeFormSubmit(data) {
        setUpgrades(upgrades.concat(data))
    }

    function onSaveClicked() {
        const form = {
            name: name,
            img: img,
            description: description,
            prices: prices,
            upgradable: upgradable,
            upgrades: upgrades
        }
        Popup.info("Навык создан")
        props.onSubmit(form)
    }

    return (
        <form style={formStyle} onSubmit={handleSubmit(onSaveClicked)}>
            <FormTitleLabel text={"Создание навыка:"}/>
            <InputLabel text={"Название:"}/>
            <input name={"name"}
                   ref={register({required: true})}
                   value={name}
                   onChange={e => setName(e.target.value)}
            />
            <div className={"error-label"}>{errors.name && "Введите имя"}</div>

            <InputLabel text={"Картинка:"}/>
            <input type={"file"}
                   name={"img"}
                   onChange={e => upload(uploadUrl, e.target.files[0], rs => setImg(uploadServerUrl + "/" + rs.data.filename))}
            />
            <div className={"error-label"}>{errors.img && "Загрузите картинку"}</div>

            <InputLabel text={"Описание:"}/>
            <InputTextarea autoResize={true}
                           value={description}
                           onChange={e => setDescription(e.target.value)}
            />

            <InputLabel text={"Стоимость:"}/>
            <List noItemsText={"Не указана"}
                  values={prices.map(listOfCurrencyNameToAmount =>
                      <SmallListItem
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

            <PriceInput currencies={props.currencies.map(it => it.name)} onSubmit={list => onPriceAdded(list)}/>

            <InputLabel text={"Прокачиваемый?"}/>
            <InputSwitch checked={upgradable}
                         onChange={e => setUpgradable(e.value)}
            />

            {
                upgradable &&
                <>
                    <InputLabel text={"Уровни навыка:"}/>
                    <List noItemsText={"Нет уровней"}
                          values={upgrades.map(upgrade =>
                              <LvlUpgradeView lvlNum={upgrade.lvlNum}
                                           description={upgrade.description}
                                           prices={upgrade.prices}
                              />)}
                    />
                    <SkillUpgradeForm
                        lvlNum={upgrades.length + 1}
                        currencies={props.currencies.map(it => it.name)}
                        onSubmit={data => onUpgradeFormSubmit(data)}/>
                </>
            }
            <FormSubmitButton text={"Сохранить"}/>
            {/*<Btn text={"Назад"} onClick={() => props.onBackClicked()}/>*/}
        </form>
    )
}

const formStyle = {
    alignSelf: "center",
    width: "90%"
}