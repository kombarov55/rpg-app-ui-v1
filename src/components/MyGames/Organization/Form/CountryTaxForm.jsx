import React from "react";
import InputLabel from "../../../Common/Labels/InputLabel";
import SubmitButton from "../../../Common/Buttons/SubmitButton";
import IsNumeric from "../../../../util/IsNumeric";
import FormTitleLabel from "../../../Common/Labels/FormTitleLabel";

export default class CountryTaxForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = this.initialState
    }

    initialState = {
        incomeTax: 0.0
    }

    render() {
        return (
            <div>
                <FormTitleLabel text={"Установка налогов"}/>

                <InputLabel text={"Подоходный налог: (%)"}/>
                <input value={this.state.incomeTax}
                       onChange={e => this.setState({incomeTax: e.target.value})}
                />

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