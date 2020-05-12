import React from "react";
import FormatDate from "../../util/FormatDate";

function ConversationItem(props) {
    return (
        <div className={"conversations-view-item"}
             onClick={() => props.onClick()}>

            <img className={"conversations-view-companion-img"}
                 src={props.companionImgSrc}/>
            <div className={"conversations-view-content"}>
                <div className={"conversations-view-companion-fullname"}>{props.companionFullName}</div>
                <div
                    className={"conversations-view-last-msg-date"}>{props.msgTimestamp != null ? FormatDate(new Date(props.msgTimestamp))  : ""}</div>
                {props.text != null ?
                    <div className={"conversations-view-last-msg-text"}>{props.text}</div> :
                    <div className={"conversations-view-no-msg-label"}>Нет сообщений</div>
                }

            </div>
        </div>
    )
}

export default ConversationItem