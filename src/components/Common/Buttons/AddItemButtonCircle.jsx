import React from "react";

export default function (props) {
    return (
        <div className={"add-item-button-circle"} onClick={() => props.onClick()}>
            <i className={"pi pi-plus-circle"}
               style={{"fontSize": "10vmax"}}
            />
        </div>
    )
}