import React from "react";
import Icon from "../Input/Icon";

export default function (props) {
    return (
        <div className={"list-item-small"}>
            <div className={"list-item-small-left"}>
                {props.text}
            </div>
            <div className={"list-item-small-right"}>
                {
                    props.onEdit && <Icon className={"pi pi-pencil"} onClick={(() => props.onEdit())}/>
                }
                {
                    props.onDelete != null && <Icon className={"pi pi-times"} onClick={(() => props.onDelete())}/>
                }
            </div>

        </div>
    )
}