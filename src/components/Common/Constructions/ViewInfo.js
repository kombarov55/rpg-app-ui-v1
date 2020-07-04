import React from "react";

export default function (props) {
    return (
        <div style={containerStyle}>
            <img style={imgStyle}
                 src={props.img}
            />
            <div style={nameStyle}>{props.name}</div>
            <div style={descriptionStyle}>{props.description}</div>
        </div>
    )
}

const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%"
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
    fontSize: "3vmax"
}

const descriptionStyle = {
    padding: "1vmax 5vmin",
    textAlign: "start"
}