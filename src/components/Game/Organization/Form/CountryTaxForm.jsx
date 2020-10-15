import React from "react";
import InputLabel from "../../../Common/Labels/InputLabel";
import PriceInput from "../../../Common/Input/PriceInput";
import SubmitButton from "../../../Common/Buttons/SubmitButton";
import IsNumeric from "../../../../util/IsNumeric";
import FormTitleLabel from "../../../Common/Labels/FormTitleLabel";
import Label from "../../../Common/Labels/Label";

export default class CountryTaxForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = this.initialState
    }

    initialState = {
        entranceTax: [],
        incomeTax: 0.0
    }

    render() {
        return (
            <div>
                <FormTitleLabel text={"Установка налогов"}/>

                <Label text={"Налог на вход/выход: "}/>
                {this.state.entranceTax.map(v => v.name + ": " + v.amount).join(", ")}

                <InputLabel text={"Ввод налога (+)"}/>
                <PriceInput currencies={this.props.currencies}
                            onSubmit={priceList => this.setState({entranceTax: priceList})}
                />

                <InputLabel text={"Подоходный налог: (%)"}/>
                <input value={this.state.incomeTax}
                       onChange={e => this.setState({incomeTax: e.target.value})}/>

                <SubmitButton text={"Сохранить"}
                              onClick={() => {
                                  if (!IsNumeric(this.state.incomeTax)) return

                                  this.props.onSubmit(this.state)
                                  this.setState(this.initialState)
                              }}
                />
            </div>
        )
    }

}