import React from "react";

export default function (props) {
    return (
        <div className={"list-item-small"}>
            <div className={"list-item-small-left"}>
                {props.left}
            </div>
            <div className={"list-item-small-right"}>
                {props.right}
            </div>

        </div>
    )
}