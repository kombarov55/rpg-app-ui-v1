import React from "react";
import InnerFormStyle from "../../styles/InnerFormStyle";
import InputLabel from "../Common/Labels/InputLabel";
import SubmitButton from "../Common/Buttons/SubmitButton";
import {SelectButton} from "primereact/selectbutton";
import {FormLabel} from "uikit-react";

export default class SkillInfluenceForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = props.initialState != null ? props.initialState : this.initialState
    }

    initialState = {
        skillId: "",
        modifier: "",
        amount: 0
    }

    render() {
        return (
            <div style={InnerFormStyle}>
                <FormLabel text={"Влияние на навык:"}/>
                <InputLabel text={"Навык:"}/>
                <SelectButton
                    options={this.props.skills.map(skill => ({label: skill.name, value: skill.id}))}
                    value={this.state.skillId}
                    onChange={e => this.setState({skillId: e.target.value})}
                />

                <InputLabel text={"Модификатор:"}/>
                <SelectButton
                    options={[
                        {label: "+", value: "PLUS"},
                        {label: "-", value: "MINUS"},
                        {label: "*", value: "MULTIPLY"},
                        {label: "/", value: "DIVIDE"}
                    ]}
                    value={this.state.modifier}
                    onChange={e => this.setState({modifier: e.target.value})}
                />

                <InputLabel text={"Число:"}/>
                <input value={this.state.amount}
                       onChange={e => this.setState({amount: e.target.value})}
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