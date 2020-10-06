import React from "react";
import Chip from "../Labels/Chip";

export default function (props) {
    return (
        <div style={containerStyle}>
            <img style={imgStyle}
                 src={props.img}
            />
            <div style={nameStyle}>{props.name}</div>
            <div style={descriptionStyle}>{props.description}</div>
            {
                props.chips &&
                <div style={chipListStyle}>
                    {props.chips.map(v => <Chip text={v}/>)}
                </div>
            }
        </div>
    )
}

const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    background: "rgb(33, 33, 33)",
    borderRadius: "10px",
    padding: "3vmin 0"
}

const imgStyle = {
    alignSelf: "center",

    margin: "1vmax 1vmin 3vmax 1vmin",
    height: "35vmax",
    width: "60vmin"
}

const nameStyle = {
    alignSelf: "center",

    margin: "2vmax 1vmin",
    width: "90%",

    textAlign: "center",
    fontSize: "3vmax",
    fontWeight: "bolder"
}

const descriptionStyle = {
    "padding": "1vmax 5vmin",
    "textAlign": "start",
    "borderRadius": "5px",
    "fontStyle": "italic",
    "fontSize": "1.5vmax"
}

const chipListStyle = {
    "display": "flex",
    "flexDirection": "row",

    "width": "100%",
    "padding": "0 2vmin"
}