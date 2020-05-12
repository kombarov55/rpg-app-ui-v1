import React from "react";

export default function (props) {
    return (
        <div className={props.mine ? "conversation-message-mine" : "conversation-message-companion"}>
            <img className={"conversation-message-img"}
                 src={props.imgSrc}
            />
            <div className={"conversation-message-text"}>{props.text}</div>
        </div>
    )
}