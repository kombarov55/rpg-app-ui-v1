import React from "react";
import SubmitButton from "../../../Common/Buttons/SubmitButton";
import InputLabel from "../../../Common/Labels/InputLabel";
import {SelectButton} from "primereact/selectbutton";
import Validation from "../../../../util/Validation";

export default class extends React.Component {

    constructor(props) {
        super(props);

        this.state = props.initialState == null ?
            this.initialState :
            props.initialState
    }

    initialState = {
        itemCategory: null,
        amount: null
    }

    render() {
        return (
            <div>
                <InputLabel text={"Категория:"}/>
                <SelectButton options={this.props.itemCategories.map(v => ({label: v.name, value: v}))}
                              value={this.state.itemCategory}
                              onChange={e => this.setState({itemCategory: e.target.value})}
                />

                <InputLabel text={"Количество:"}/>
                <input value={this.state.amount}
                       onChange={e => this.setState({amount: e.target.value})}
                />

                <SubmitButton text={"Добавить"}
                              onClick={() => {
                                  const success = Validation.run(
                                      Validation.nonNull(this.state.itemCategory, "Категория"),
                                      Validation.between(this.state.amount, 0, Number.MAX_SAFE_INTEGER, "Количество")
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