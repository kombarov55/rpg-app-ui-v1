import React from "react";
import CenterPlusButton from "./CenterPlusButton";
import IsNumeric from "../../util/IsNumeric";

/**
 * onSubmit: [{ name: String, amount: Long }]
 */
export default class PriceInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            prices: []
        }
    }

    render() {
        return (
            <div>
                {this.props.currencies.map(name =>
                    <OptionInput name={name}
                                 value={this.upgradeOptionFormValue(name)}
                                 onChange={e => this.onOptionValueChanged(name, e.target.value)}
                    />)
                }
                <CenterPlusButton onClick={() => this.onSubmit()}/>
            </div>
        )
    }

    upgradeOptionFormValue(name) {
        const x = this.state.prices.find(it => it.name === name)

        if (x != null) {
            return x.amount
        } else {
            return ""
        }
    }

    onOptionValueChanged(name, value) {
        this.setState({
            prices:
                this.state.prices
                    .filter(it => it.name !== name)
                    .concat({name: name, amount: value})
        })
    }

    onSubmit() {
        if (this.state.prices.length === 0) return
        if (this.state.prices.some(it => !IsNumeric(it.amount))) return

        this.props.onSubmit(this.state.prices)
        this.setState({prices: []})
    }

}

function OptionInput(props) {
    const formStyle = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",

        margin: "2vmax 0 1vmax 0"
    }

    const nameStyle = {
        margin: "1vmax 2vmin"
    }

    const inputStyle = {
        height: "4vmax",
        width: "65%"
    }

    return (
        <form style={formStyle}>
            <div style={nameStyle}>{props.name + ":"}</div>
            <input
                style={inputStyle}
                value={props.value}
                onChange={e => props.onChange(e)}
            />
        </form>
    )
}