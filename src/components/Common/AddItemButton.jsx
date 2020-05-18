import React from "react";

export default function (props) {
    return (
        <div
            className={"add-item-button"}
            onClick={() => props.onClick()}
        >
            <i className={"pi pi-plus-circle"}
               style={{"fontSize": "5vmax"}}
            />
            <div className={"questionnaire-add-item-label"}>{props.text}</div>
        </div>
    )
}