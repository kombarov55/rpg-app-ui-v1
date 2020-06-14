import React from "react";
import getOrDefault from "../../util/getOrDefault";

export default function (props) {
    const onClick = getOrDefault(props.onClick, () => {})

    return (
        <div style={{marginLeft: "45%"}} onClick={() => onClick()}>
            <i className={"pi pi-plus-circle"} style={{fontSize: "5vmax"}}/>
        </div>
    )
}