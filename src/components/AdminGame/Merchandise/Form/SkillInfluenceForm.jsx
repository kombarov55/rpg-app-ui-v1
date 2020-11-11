import React from "react";
import InnerFormStyle from "../../../../styles/InnerFormStyle";
import InputLabel from "../../../Common/Labels/InputLabel";
import SubmitButton from "../../../Common/Buttons/SubmitButton";
import {SelectButton} from "primereact/selectbutton";
import {FormLabel} from "uikit-react";
import ArithmeticModifiers from "../../../../data-layer/enums/ArithmeticModifiers";

export default class SkillInfluenceForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = props.initialState != null ? props.initialState : this.initialState
    }

    initialState = {
        skill: null,
        modifier: null,
        amount: 0
    }

    render() {
        return (
            <div style={InnerFormStyle}>
                <FormLabel text={"Влияние на навык:"}/>
                <InputLabel text={"Навык:"}/>
                <SelectButton
                    options={this.props.skills.map(skill => ({label: skill.name, value: skill}))}
                    value={this.state.skill}
                    onChange={e => this.setState({skill: e.target.value})}
                />

                <InputLabel text={"Модификатор:"}/>
                <SelectButton
                    options={ArithmeticModifiers.values.map(it => ({label: it.name, value: it}))}
                    value={this.state.modifier}
                    onChange={e => this.setState({modifier: e.target.value})}
                />

                <InputLabel text={"Число:"}/>
                <input value={this.state.amount}
                       onChange={e => this.setState({amount: e.target.value})}
                />

                <SubmitButton text={"Сохранить влияние на навык"}
                              onClick={() => this.onSubmitClicked()}
                />
            </div>
        )
    }

    onSubmitClicked() {
        if (this.state.skill == null || this.state.modifier == null || this.state.amount == null) return

        this.props.onSubmit(this.state)
        this.setState(this.initialState)
    }
}