import React from "react";

export default function(props) {
    return (
        <div className={"restore-label"}>
            <div className={"restore-label-text"}>
                {props.text}
            </div>
            <div className={"restore-label-link"} onClick={() => props.onClick()}>
                [Восстановить]
            </div>
        </div>
    )
}