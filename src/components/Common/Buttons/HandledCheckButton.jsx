import React from "react";
import CheckButtonStyle from "../../../styles/CheckButtonStyle";

export default class extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div style={this.props.checked ?
                    CheckButtonStyle.checked :
                    CheckButtonStyle.unchecked}
                     onClick={() => this.props.onClick()}>
                    {this.props.checked ?
                        this.props.checkedText :
                        this.props.uncheckedText
                    }
                </div>
            </div>
        )
    }
}