import React from "react";
import FormTitleLabel from "../../../Common/Labels/FormTitleLabel";
import InputLabel from "../../../Common/Labels/InputLabel";
import {InputTextarea} from "primereact/inputtextarea";
import {SelectButton} from "primereact/selectbutton";
import SubmitButton from "../../../Common/Buttons/SubmitButton";
import IsNumeric from "../../../../util/IsNumeric";

export default class CreditOfferForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = this.initialState
    }

    initialState = {
        name: "",
        description: "",
        currency: null,
        minAmount: 0,
        maxAmount: 0,
        rate: 0,
        maxDurationInDays: 0
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

                <InputLabel text={"Мин количество:"}/>
                <input value={this.state.minAmount}
                       onChange={e => this.setState({minAmount: e.target.value})}/>

                <InputLabel text={"Макс. количество:"}/>
                <input value={this.state.maxAmount}
                       onChange={e => this.setState({maxAmount: e.target.value})}/>

                <InputLabel text={"Ставка:"}/>
                <input value={this.state.rate}
                       onChange={e => this.setState({rate: e.target.value})}/>

                <InputLabel text={"Макс. длительность: (в днях)"}/>
                <input value={this.state.maxDurationInDays}
                       onChange={e => this.setState({maxDurationInDays: e.target.value})}/>

                <SubmitButton text={"Сохранить"}
                              onClick={() => {
                                  if (this.state.name == "" ||
                                      this.state.description == "" ||
                                      this.state.currency == null ||
                                      this.state.minAmount <= 0 ||
                                      !IsNumeric(this.state.minAmount) ||
                                      this.state.maxAmount <= 0 ||
                                      !IsNumeric(this.state.maxAmount) ||
                                      this.state.rate <= 0 ||
                                      !IsNumeric(this.state.rate) ||
                                      this.state.maxDurationInDays <= 0 ||
                                      !IsNumeric(this.state.maxDurationInDays)
                                  ) return
                                  this.props.onSubmit(this.state)
                                  this.setState(this.initialState)
                              }}
                />

            </div>
        )
    }

}