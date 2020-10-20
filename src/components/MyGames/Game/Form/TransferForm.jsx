import React from "react";
import FormTitleLabel from "../../../Common/Labels/FormTitleLabel";
import SubmitButton from "../../../Common/Buttons/SubmitButton";
import InputLabel from "../../../Common/Labels/InputLabel";
import {SelectButton} from "primereact/selectbutton";
import TransferDestination from "../../../../data-layer/enums/TransferDestination";
import IsNumeric from "../../../../util/IsNumeric";
import Popup from "../../../../util/Popup";

export default class TransferForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            destination: TransferDestination.CHARACTER,
            currency: null,
            amount: null
        }
    }

    render() {
        return (
            <div>
                <FormTitleLabel text={"Перевод:"}/>

                <InputLabel text={"Кому?"}/>
                <SelectButton value={this.state.destination}
                              onChange={e => this.setState({destination: e.target.value})}
                              options={[
                                  {label: "Персонажу", value: TransferDestination.CHARACTER},
                                  {label: "Организации", value: TransferDestination.ORGANIZATION}
                              ]}
                />
                <InputLabel text={"Валюта:"}/>
                <SelectButton value={this.state.currency}
                              onChange={e => this.setState({currency: e.target.value})}
                              options={this.props.currencyNames.map(name => ({label: name, value: name}))}
                />

                <InputLabel text={"Сумма:"}/>
                <input value={this.state.amount}
                       onChange={e => this.setState({amount: e.target.value})}
                />

                <SubmitButton text={"Отправить"}
                              onClick={() => {
                                  if (
                                      this.state.destination == null ||
                                      this.state.currency == null ||
                                      this.state.amount == null ||
                                      !IsNumeric(this.state.amount)
                                  ) {
                                      Popup.info("Пожалуйста, заполните поля правильно.")
                                      return
                                  }
                                  this.props.onSubmit(this.state)
                              }}
                />
            </div>
        )
    }
}