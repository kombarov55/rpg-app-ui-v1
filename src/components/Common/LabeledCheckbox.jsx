import React from "react";
import getOrDefault from "../../util/getOrDefault";

export default function (props) {
    const onChange = getOrDefault(props.onChange, () => {})

    return (
        <div style={{
            display: "flex",
            flexDirection: "row",
        }}>
            <input type={"checkbox"}
                   style={{
                       width: "25px",
                       height: "25px",
                       marginRight: "2vmin"
                   }}
                   checked={props.checked}
                   onChange={e => onChange(e)}
            />
            <div style={{
                lineHeight: "3vmax",
                padding: "0.3vmax 0"
            }}>{props.text}</div>
        </div>
    )
}