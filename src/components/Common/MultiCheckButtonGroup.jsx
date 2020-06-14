import React from "react";
import copy from "../../util/updateObject";
import getOrDefault from "../../util/getOrDefault";
import CenterPlusButton from "./CenterPlusButton";

export default class MultiCheckButtonGroup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const {options} = this.props
        const onChecked = getOrDefault(this.props.onChecked, () => {
        })

        return (
            <>
                <div className={"list"}>
                    {options.map(x => <CheckButton text={x}/>)}
                </div>
                {
                    this.props.onSubmit != null &&
                    <CenterPlusButton onClick={() => this.props.onSubmit()} onChecked={onChecked}/>
                }
            </>
        )
    }
}

class CheckButton extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            checked: false
        }
    }

    render() {
        const uncheckedStyle = {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",

            width: "100%",
            padding: "1vmax 2vmin",
            margin: "0.2vmax 0",

            borderRadius: "5px",
            background: "rgba(0, 0, 0, 0.24)"
        }

        const checkedStyle = copy(uncheckedStyle, {background: "grey"})

        function onClick() {
            const newValue = !this.state.checked
            this.setState({checked: newValue})
            this.props.onChecked({name: this.props.text, checked: newValue})
        }

        return (
            <div style={this.state.checked ? checkedStyle : uncheckedStyle}
                 onClick={() => onClick()}
                 key={"multicheck + " + this.state.text}>
                <div>{this.state.text}</div>
            </div>
        )
    }
}