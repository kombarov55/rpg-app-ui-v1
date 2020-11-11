import React from "react";
import InnerFormStyle from "../../../../styles/InnerFormStyle";
import InputLabel from "../../../Common/Labels/InputLabel";
import SubmitButton from "../../../Common/Buttons/SubmitButton";

export default class ItemTypeForm extends React.Component {

    constructor(props) {
        super(props)

        this.state = props.initialState != null ? props.initialState : this.initialState
    }

    initialState = {
        name: ""
    }

    render() {
        return (
            <div style={InnerFormStyle}>
                <InputLabel text={"Название типа:"}/>
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
        if (this.state.name === "") return

        this.props.onSubmit(this.state)
        this.setState(this.initialState)
    }
}