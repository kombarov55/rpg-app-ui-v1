import React from "react";
import FormTitleLabel from "../../../Common/Labels/FormTitleLabel";
import SubmitButton from "../../../Common/Buttons/SubmitButton";
import InputLabel from "../../../Common/Labels/InputLabel";
import IsNumeric from "../../../../util/IsNumeric";
import Popup from "../../../../util/Popup";

export default class SuccessChanceDependencyForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = props.initialState == null ?
            this.initialState :
            props.initialState
    }

    initialState = {
        min: null,
        max: null,
        percent: null
    }

    render() {
        return (
            <div>
                <FormTitleLabel text={""}/>
                <InputLabel text={"От:"}/>
                <input
                    value={this.state.min}
                    onChange={e => this.setState({min: e.target.value})}
                />

                <InputLabel text={"До:"}/>
                <input
                    value={this.state.max}
                    onChange={e => this.setState({max: e.target.value})}
                />

                <InputLabel text={"Шанс успеха:"}/>
                <input
                    value={this.state.percent}
                    onChange={e => this.setState({percent: e.target.value})}
                />

                <SubmitButton text={"Сохранить"}
                              onClick={() => {
                                  if (
                                      !IsNumeric(this.state.min) ||
                                      !IsNumeric(this.state.max) ||
                                      !IsNumeric(this.state.percent)
                                  ) {
                                      Popup.error("Пожалуйста, заполните поля верно! Каждое из полей должно содержать целое число")
                                      return
                                  }

                                  this.props.onSubmit(this.state)
                              }}
                />
            </div>
        )
    }
}