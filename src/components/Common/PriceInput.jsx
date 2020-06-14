import React from "react";
import CenterPlusButton from "./CenterPlusButton";

export default class PriceInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currencyToAmountList: []
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
        const x = this.state.currencyToAmountList.find(it => it.name === name)

        if (x != null) {
            return x.amount
        } else {
            return ""
        }
    }

    onOptionValueChanged(name, value) {
        this.setState({
            currencyToAmountList:
                this.state
                    .currencyToAmountList
                    .filter(it => it.name !== name)
                    .concat({name: name, amount: value})
        })
    }

    onSubmit() {
        this.props.onSubmit(this.state.currencyToAmountList)
        this.setState({currencyToAmountList: []})
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