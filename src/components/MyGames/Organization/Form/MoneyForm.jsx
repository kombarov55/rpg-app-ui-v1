import React from "react";
import FormTitleLabel from "../../../Common/Labels/FormTitleLabel";
import SubmitButton from "../../../Common/Buttons/SubmitButton";
import {SelectButton} from "primereact/selectbutton";
import InputLabel from "../../../Common/Labels/InputLabel";
import Popup from "../../../../util/Popup";
import IsNumeric from "../../../../util/IsNumeric";

/**
 * props: {
 *     title: String,
 *     currencyNames: [String]
 *     balances: [{
 *         id: String,
 *         type: [CHARACTER, ORGANIZATION],
 *         name: String
 *     }]
 *     onSubmit: {
 *       name: String,
 *       amount: Int,
 *       buyerBalance: {
 *         id: String,
 *         type: [CHARACTER, ORGANIZATION],
 *         name: String
 *       }
 *     } => void
 * }
 *
 *
 */
export default class MoneyForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: null,
            amount: null,
            buyerBalance: null
        }
    }

    render() {
        return (
            <div>
                <FormTitleLabel text={this.props.title}/>

                <InputLabel text={"Валюта:"}/>
                <SelectButton options={this.props.currencyNames.map(v => ({label: v, value: v}))}
                              value={this.state.name}
                              onChange={e => this.setState({name: e.target.value})}
                />

                <InputLabel text={"Количество: "}/>
                <input value={this.state.amount}
                       onChange={e => this.setState({amount: e.target.value})}
                />

                <InputLabel text={"Выберите счёт:"}/>
                <SelectButton
                    options={this.props.balances.map(balanceDto => ({label: balanceDto.name, value: balanceDto}))}
                    value={this.state.buyerBalance}
                    onChange={e => this.setState({buyerBalance: e.target.value})}
                />

                <SubmitButton text={"Сохранить"}
                              onClick={() => {
                                  if (this.state.name == null) {
                                      Popup.error("Выберите валюту.")
                                      return
                                  }
                                  if (this.state.amount == null || !IsNumeric(this.state.amount)) {
                                      Popup.error("Введите количество.")
                                      return
                                  }

                                  if (this.state.buyerBalance == null) {
                                      Popup.error("Выберите счёт, с которого будет производиться операция.")
                                      return
                                  }

                                  console.log(this.state)
                                  this.props.onSubmit(this.state)
                              }}
                />
            </div>
        )
    }
}