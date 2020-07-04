import React from "react";
import InnerFormStyle from "../../styles/InnerFormStyle";
import InputLabel from "../Common/Labels/InputLabel";
import SubmitButton from "../Common/Buttons/SubmitButton";

export default class MerchandiseCategoryForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = this.initialState
    }

    initialState = {
        name: ""
    }

    render() {
        return (
            <div style={InnerFormStyle}>
                <InputLabel text={"Название категории:"}/>
                <input value={this.state.name}
                       onChange={e => this.setState({name: e.target.value})}
                />

                <SubmitButton text={"Сохранить"}
                              onClick={() => this.onSubmitClicked()}
                />
            </div>
        )
    }

    onSubmitClicked() {
        this.props.onSubmit(this.state)
        this.setState(this.initialState)
    }
}