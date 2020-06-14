import React from "react";

export default function (props) {
    return (
        <input
            style={{
                borderRadius: "5px",
                color: "white",
                backgroundColor: "#592E83",
                border: "0px",
                padding: "1.5vmax 0",
                margin: "1vmax 0",
                fontSize: "1.8vmax"
            }}
            type={"submit"} value={props.text}
        />
    )
}