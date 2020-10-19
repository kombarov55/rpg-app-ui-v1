import React from "react";
import CheckButtonStyle from "../../../styles/CheckButtonStyle";

export default class CheckButton extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            checked: false
        }
    }

    render() {
        return (
            <div>
                <div style={this.state.checked ?
                    CheckButtonStyle.checked :
                    CheckButtonStyle.unchecked}
                     onClick={() => this.onClick()}>
                    {this.state.checked ?
                        this.props.checkedText :
                        this.props.uncheckedText
                    }
                </div>
            </div>
        )
    }

    onClick() {
        this.setState(state => ({checked: !state.checked}))
        if (this.props.onClick != null) {
            this.props.onClick()
        }
    }
}