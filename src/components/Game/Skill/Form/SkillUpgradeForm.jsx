import React from "react";
import InputLabel from "../../../Common/Labels/InputLabel";
import {InputTextarea} from "primereact/inputtextarea";
import List from "../../../Common/Lists/List";
import _ from "lodash"
import IsNumeric from "../../../../util/IsNumeric";
import PriceInput from "../../../Common/Input/PriceInput";
import ListItem from "../../../Common/ListElements/ListItem";
import Popup from "../../../../util/Popup";
import FormTitleLabel from "../../../Common/Labels/FormTitleLabel";
import SubmitButton from "../../../Common/Buttons/SubmitButton";

export default class SkillUpgradeForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = props.initialState == null ?
            Object.assign({}, this.initialState, {lvlNum: props.lvlNum}) :
            props.initialState
    }

    initialState = {
        description: "",
        prices: []
    }

    render() {
        return (
            <div style={style}>
                <div>
                    <FormTitleLabel text={"Прокачка навыка:"}/>

                    <InputLabel text={this.props.lvlNum + " Уровень:"}/>

                    <InputLabel text={"Описание:"}/>
                    <InputTextarea value={this.state.description}
                                   onChange={e => this.setState({description: e.target.value})}
                    />

                    <List title={"Варианты повышения:"}
                          noItemsText={"Нет вариантов покупки"}
                          values={this.state.prices.map(amounts =>
                              <ListItem text={amounts.map(currencyNameToAmount => currencyNameToAmount.name + ": " + currencyNameToAmount.amount).join(" + ")}
                                        onDelete={() => this.setState(state => ({prices: state.prices.filter(savedAmounts => !_.isEqual(amounts, savedAmounts))}))}
                              />
                          )}
                    />

                    <PriceInput
                        currencies={this.props.currencyNames}
                        onSubmit={list => this.optionAdded(list)}
                    />

                    <SubmitButton text={"Сохранить"} onClick={() => this.onSubmit()}/>

                </div>
            </div>
        )
    }

    optionAdded(currencyToAmountList) {
        const formOptionNames = currencyToAmountList.map(it => it.name)
        const listOfListOfNames = this.state.prices.map(list => list.map(it => it.name))

        const exists = listOfListOfNames.some(list => _.isEqual(list, formOptionNames))
        const validInput = currencyToAmountList.length !== 0 && currencyToAmountList.map(it => it.amount).every(it => IsNumeric(it))

        if (!exists && validInput) {
            this.setState(state => ({
                prices: state.prices.concat([currencyToAmountList])
            }))
        }
    }

    onSubmit() {
        if (this.state.description == "") {
            Popup.info("Пожалуйста, введите описание.")
            return
        }

        this.props.onSubmit(this.state)
    }
}

const style = {
    padding: "0.1vmax 2vmin 1vmax 2vmin",
    margin: "2vmax 0",

    background: "rgba(0, 0, 0, 0.24)",
    borderRadius: "5px"
}