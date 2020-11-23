import React from "react";

export default function (props) {
    return (
        <div className={"mobile-button-grey"}
             onClick={() => props.onClick != null && props.onClick()}>
            {props.text}
        </div>
    )
}