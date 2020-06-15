import React, {useState} from "react";
import InputLabel from "../Common/InputLabel";
import {InputTextarea} from "primereact/inputtextarea";
import AddItemButton from "../Common/AddItemButton";
import List from "../Common/List";
import ListItemSmall from "../Common/ListItemSmall";
import Icon from "../Common/Icon";
import _ from "lodash"
import IsNumeric from "../../util/IsNumeric";
import PriceInput from "../Common/PriceInput";

export default class SkillUpgradeForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.initialState
    }

    initialState = {
        description: "",
        prices: []
    }

    render() {
        return (
            <div style={style}>
                <div>
                    <InputLabel text={this.props.lvlNum + " Уровень:"}/>
                    <InputLabel text={"Описание:"}/>
                    <InputTextarea value={this.state.description}
                                   onChange={e => this.setState({description: e.target.value})}
                    />
                    <InputLabel text={"Варианты повышения:"}/>
                    <div>
                        <List noItemsText={"Нет вариантов покупки"}
                              values={
                                  this.state.prices.map(listOfCurrencyNameToAmount =>
                                      <ListItemSmall
                                          left={listOfCurrencyNameToAmount
                                              .map(currencyNameToAmount => currencyNameToAmount.name + ": " + currencyNameToAmount.amount)
                                              .join(" + ")
                                          }
                                          right={
                                              <Icon
                                                  className={"pi pi-times"}
                                                  onClick={() => this.optionDeleted(listOfCurrencyNameToAmount)}
                                              />
                                          }
                                      />
                                  )
                              }
                        />

                        <PriceInput
                            currencies={this.props.currencies}
                            onSubmit={list => this.optionAdded(list)}
                        />

                    </div>
                    <AddItemButton text={"Добавить"} onClick={() => this.onSubmit()}/>
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

    optionDeleted(paramList) {
        this.setState(state => ({
            prices: state.prices.filter(savedEntries => !_.isEqual(paramList, savedEntries))
        }))
    }

    onSubmit() {
        const data = Object.assign({}, this.state, {lvlNum: this.props.lvlNum})
        this.props.onSubmit(data)
        this.setState(this.initialState)
    }
}

const style = {
    padding: "0.1vmax 2vmin 1vmax 2vmin",
    margin: "2vmax 0",

    background: "rgba(0, 0, 0, 0.24)",
    borderRadius: "5px"
}