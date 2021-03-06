import React from "react";

export default function (props) {
    return (
        <div style={bulletContainerStyle}>
            {
                props.title != null &&
                <div style={bulletContainerTitleStyle}>{props.title}</div>
            }
            <div style={bulletListStyle}>
                {
                    props.values &&
                    props.values
                        .filter(v => v != null)
                        .map(name =>
                            <div style={bulletContainerItemStyle}>- {name}</div>
                        )
                }
            </div>
        </div>
    )
}

const bulletContainerStyle = {
    display: "flex",
    flexDirection: "column",

    margin: "1vmax 0"
}

const bulletContainerTitleStyle = {
    fontSize: "2vmax",
    margin: "0.5vmax 0",
    textDecoration: "underline"
}

const bulletListStyle = {
    margin: "0 1vmin"
}

const bulletContainerItemStyle = {
    fontSize: "1.5vmax"
}