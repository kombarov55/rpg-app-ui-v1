import React from "react";
import Icon from "../Input/Icon";
import getOrDefault from "../../../util/getOrDefault";

export default function ({text, selected, onEdit, onClick = () => {}, onDelete, isDeleteVisible}) {


    return (
        <div style={selected ? selectedContainerStyle : defaultContainerStyle} onClick={() => onClick()}>
            <div className={"list-item-small-left"}>
                {text}
            </div>
            <div className={"list-item-small-right"}>
                {
                    onEdit && <Icon className={"pi pi-pencil"} onClick={(() => onEdit())}/>
                }
                {
                    (getOrDefault(isDeleteVisible, true) && onDelete != null) && <Icon className={"pi pi-times"} onClick={(() => onDelete())}/>
                }
            </div>
        </div>
    )
}

const defaultContainerStyle = {
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "space-between",
    "alignItems": "center",
    "width": "100%",
    "padding": "1vmax 2vmin",
    "margin": "0.2vmax 0",
    "borderRadius": "5px",
    "background": "#212121",
    "fontSize": "1.5vmax"
}

const selectedContainerStyle = {
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "space-between",
    "alignItems": "center",
    "width": "100%",
    "padding": "1vmax 2vmin",
    "margin": "0.2vmax 0",
    "borderRadius": "5px",
    "background": "#592e83",
    "fontSize": "1.5vmax"
}