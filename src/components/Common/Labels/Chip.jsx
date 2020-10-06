import React from "react";
import getOrDefault from "../../../util/getOrDefault";

export default class extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <span style={this.style} onClick={() => getOrDefault(this.props.onClick, () => {
            })()}>
                {this.props.text}
            </span>
        )
    }

    style = {
        // "border": "1px solid black",
        "borderRadius": "666px",
        "padding": "2vmin",
        "background": "#585858",

        "fontWeight": "bold",
        "fontStyle": "italic",
        "fontSize": "1.5vmax"
    }
}