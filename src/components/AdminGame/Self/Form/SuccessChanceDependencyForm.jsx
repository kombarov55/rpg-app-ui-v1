import React from "react";
import FormTitleLabel from "../../../Common/Labels/FormTitleLabel";
import SubmitButton from "../../../Common/Buttons/SubmitButton";
import InputLabel from "../../../Common/Labels/InputLabel";
import Validation from "../../../../util/Validation";

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
                                  const success = Validation.run(
                                      Validation.between(this.state.min, 0, Number.MAX_SAFE_INTEGER, "От"),
                                      Validation.between(this.state.min, this.state.min, Number.MAX_SAFE_INTEGER, "До"),
                                      Validation.between(this.state.percent, 0, 100, "Шанс успеха")
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