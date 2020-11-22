import React from "react";
import FormTitleLabel from "../../../Common/Labels/FormTitleLabel";
import InputLabel from "../../../Common/Labels/InputLabel";
import {InputTextarea} from "primereact/inputtextarea";
import {SelectButton} from "primereact/selectbutton";
import SubmitButton from "../../../Common/Buttons/SubmitButton";
import IsNumeric from "../../../../util/IsNumeric";
import Validation from "../../../../util/Validation";

export default class CreditOfferForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = this.initialState
    }

    initialState = {
        name: null,
        description: null,
        currency: null,
        minAmount: null,
        maxAmount: null,
        rate: null,
        paymentPeriodInDays: null,        minDurationInDays: null,
        maxDurationInDays: null
    }

    render() {
        return (
            <div>
                <FormTitleLabel text={"Кредитное предложение"}/>

                <InputLabel text={"Название:"}/>
                <input value={this.state.name}
                       onChange={e => this.setState({name: e.target.value})}/>

                <InputLabel text={"Описание:"}/>
                <InputTextarea value={this.state.description}
                               onChange={e => this.setState({description: e.target.value})}

                               autoResize={true}
                />

                <InputLabel text={"Валюта:"}/>
                <SelectButton options={this.props.currencies.map(v => ({label: v.name, value: v}))}
                              value={this.state.currency}
                              onChange={e => this.setState({currency: e.target.value})}
                />

                <InputLabel text={"Минимальная кредитная сумма:"}/>
                <input value={this.state.minAmount}
                       onChange={e => this.setState({minAmount: e.target.value})}/>

                <InputLabel text={"Максимальная кредитная сумма:"}/>
                <input value={this.state.maxAmount}
                       onChange={e => this.setState({maxAmount: e.target.value})}/>

                <InputLabel text={"Ставка:"}/>
                <input value={this.state.rate}
                       onChange={e => this.setState({rate: e.target.value})}/>

                <InputLabel text={"Мин. длительность: (в днях)"}/>
                <input value={this.state.minDurationInDays}
                       onChange={e => this.setState({minDurationInDays: e.target.value})}/>

                <InputLabel text={"Макс. длительность: (в днях)"}/>
                <input value={this.state.maxDurationInDays}
                       onChange={e => this.setState({maxDurationInDays: e.target.value})}/>

                <InputLabel text={"Периодичность платежа: (в днях)"}/>
                <input value={this.state.paymentPeriodInDays}
                       onChange={e => this.setState({paymentPeriodInDays: e.target.value})}/>

                <SubmitButton text={"Сохранить"}
                              onClick={() => {
                                  const success = Validation.run(
                                      Validation.nonNull(this.state.name, "Имя"),
                                      Validation.nonNull(this.state.description, "Описание"),
                                      Validation.nonNull(this.state.currency, "Валюта"),
                                      Validation.isNumeric(this.state.minAmount, "Минимальная кредитная сумма"),
                                      Validation.isNumeric(this.state.maxAmount, "Максимальная кредитная сумма"),
                                      Validation.isNumeric(this.state.rate, "Ставка"),
                                      Validation.isNumeric(this.state.minDurationInDays, "Минимательная длительность"),
                                      Validation.isNumeric(this.state.maxDurationInDays, "Максимательная длительность"),
                                      Validation.isNumeric(this.state.paymentPeriodInDays, "Периодичность платежа")
                                  )
                                  if (success) {
                                      this.props.onSubmit(this.state)
                                      this.setState(this.initialState)
                                  }
                              }}
                />

            </div>
        )
    }

}