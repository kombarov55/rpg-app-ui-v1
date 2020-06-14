import React from "react";
import getOrDefault from "../../util/getOrDefault";

export default function (props) {
    const onClick = getOrDefault(props.onClick, () => {})

    return (
        <div className={"add-item-button"} onClick={() => onClick()}>
            <i className={"pi pi-plus-circle"} style={{"fontSize": "5vmax"}}/>
            <div className={"questionnaire-add-item-label"}>{props.text}</div>
        </div>
    )
}