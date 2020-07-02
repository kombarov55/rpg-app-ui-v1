import React from "react";

export default function (props) {
    return (
        <div
            style={style}
            onClick={() => props.onClick()}
        >
            {props.text}
        </div>
    )
}

const style = {
    alignSelf: "center",

    padding: "1vmax 0",
    margin: "2.5vmax 0",
    width: "100%",

    textAlign: "center",
    fontSize: "2.5vmax",

    background: "#592e83"
}