import React from "react";
import FormTitleLabel from "../../../Common/Labels/FormTitleLabel";
import SubmitButton from "../../../Common/Buttons/SubmitButton";
import InputLabel from "../../../Common/Labels/InputLabel";
import LocalAutocomplete from "../../../Common/Input/LocalAutocomplete";
import ExchangeRateComponent from "../Component/ExchangeRateComponent";
import {get} from "../../../../util/Http";
import {conversionsByGameIdUrl} from "../../../../util/Parameters";
import Validation from "../../../../util/Validation";

/**
 * gameId: String
 * currencies: List<CurrencyDto>
 * conversions: List<ConversionDto>
 * onSubmit: form => {}
 */
export default class extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currency1: null,
            currency2: null,
            amount: 0
        }
    }

    render() {
        return (
            <div>
                <FormTitleLabel text={"Конверсия валют:"}/>
                <InputLabel text={`Валюта 1: ${this.state.currency1 != null ? this.state.currency1?.name : ""}`}/>
                <LocalAutocomplete items={this.props.currencies}
                                   fieldToDisplay={"name"}
                                   onSelected={currency => this.setState({currency1: currency})}
                />

                <InputLabel text={`Валюта 2: ${this.state.currency2 != null ? this.state.currency2?.name : ""}`}/>
                <LocalAutocomplete items={this.props.currencies}
                                   fieldToDisplay={"name"}
                                   onSelected={currency => this.setState({currency2: currency})}
                />

                <ExchangeRateComponent currency1={this.state.currency1}
                                       currency2={this.state.currency2}
                                       conversions={this.props.conversions}
                />


                <InputLabel text={"Количество:"}/>
                <input value={this.state.amount}
                       onChange={e => this.setState({amount: e.target.value})}
                />

                <SubmitButton text={"Обменять"}
                              onClick={() => {
                                  const success = Validation.run(
                                      Validation.isNumeric(this.state.amount, ""),
                                      Validation.notEqual(this.state.currency1, this.state.currency2, "Валюта 1", "Валюта 2")
                                  )

                                  if (success) {
                                      this.props.onSubmit(this.state)
                                  }
                              }}
                />
            </div>
        )
    }
}