import React from "react";
import RedButtonStyle from "../../../styles/RedButtonStyle";

export default class RedButton extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div style={RedButtonStyle.buttonStyle}>
                {this.props.text}
            </div>
        )
    }
}