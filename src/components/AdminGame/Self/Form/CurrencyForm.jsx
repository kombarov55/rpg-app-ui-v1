import React from "react";
import FormTitleLabel from "../../../Common/Labels/FormTitleLabel";
import SubmitButton from "../../../Common/Buttons/SubmitButton";
import InputLabel from "../../../Common/Labels/InputLabel";
import Validation from "../../../../util/Validation";

export default class extends React.Component {

    constructor(props) {
        super(props);

        this.state = props.initialState == null ?
            this.initialState :
            props.initialState
    }

    initialState = {
        name: null,
        priceInActivityPoints: null
    }

    render() {
        return (
            <div>
                <FormTitleLabel text={"Добавление новой валюты:"}/>

                <InputLabel text={"Название:"}/>
                <input value={this.state.name}
                       onChange={e => this.setState({name: e.target.value})}
                />

                <InputLabel text={"Цена в баллах актива:"}/>
                <input value={this.state.priceInActivityPoints}
                       onChange={e => this.setState({priceInActivityPoints: e.target.value})}
                />

                <SubmitButton text={"Сохранить"}
                              onClick={() => {
                                  const success = Validation.run(
                                      Validation.nonNull(this.state.name, "Название"),
                                      Validation.between(this.state.priceInActivityPoints, 0, Number.MAX_SAFE_INTEGER, "Цена в баллах актива")
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