import React from "react";

export default function (props) {
    return (
        <div style={bulletContainerStyle}>
            <div style={bulletContainerTitleStyle}>{props.title}</div>
            <div style={bulletListStyle}>
                {props.values.map(name => <div style={bulletContainerItemStyle}>- {name}</div>)}
            </div>
        </div>
    )
}

const bulletContainerStyle = {
    display: "flex",
    flexDirection: "column"
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