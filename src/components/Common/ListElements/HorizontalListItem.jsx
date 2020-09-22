import React from "react";
import getOrDefault from "../../../util/getOrDefault";

export default function (props) {
    const {name, description, imgSrc} = props

    const onClick = getOrDefault(props.onClick, () => {})
    const onDelete = getOrDefault(props.onDelete, () => {})
    const onEdit = getOrDefault(props.onEdit, () => {})

    return (
        <div className={"horizontal-list-item"}>
            <div className={"horizontal-list-item-head"}>
                {
                    imgSrc &&
                    <img className={"horizontal-list-img"}
                         src={imgSrc}
                         onClick={() => onClick()}
                    />
                }
                <div className={"horizontal-list-item-text-group"}>
                    <div className={"horizontal-list-item-text-group-vertical"}
                         onClick={() => onClick()}>
                        <div className={"horizontal-list-item-name"}>{name}</div>
                        <div className={"horizontal-list-item-description"}>{description}</div>
                    </div>
                    <div className={"horizontal-list-item-button-group"}>
                        {
                            props.onDelete &&
                            <i className={"pi pi-times"}
                               onClick={() => onDelete()}
                            />
                        }

                        {
                            props.onEdit &&
                            <i className={"pi pi-pencil"}
                               onClick={() => onEdit()}
                            />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}