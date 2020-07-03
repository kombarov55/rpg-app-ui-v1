import React from "react";

export default function (props) {
    return (
        <div className={"mobile-button-grey"}
             onClick={() => props.onClick()}>
            {props.text}
        </div>
    )
}