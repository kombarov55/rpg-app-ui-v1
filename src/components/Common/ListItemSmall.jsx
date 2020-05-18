import React from "react";

export default function (props) {
    return (
        <div className={"list-item-small"}>
            <div className={"list-item-small-text"}>
                {props.text}
            </div>
            <div className={"list-item-small-subtext"}>
                {props.subtext}
            </div>

        </div>
    )
}