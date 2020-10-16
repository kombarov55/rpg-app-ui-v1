import React from "react";
import getOrDefault from "../../../util/getOrDefault";

export default function (props) {
    const onClick = getOrDefault(props.onClick, () => {
    })

    return (
        <div className={"add-item-button"} onClick={() => onClick()}>
            <i className={"pi pi-plus-circle"} style={{"fontSize": "5vmax"}}/>
            <div style={{"margin": "0 0 0 1vmin", "fontSize": "2vmax"}}>{props.text}</div>
        </div>
    )
}