import React from "react";
import Icon from "./Icon";

export default function (props) {
    const max = props.max != null ? props.max : Number.MAX_SAFE_INTEGER

    return (
        <>
            {props.values.length < max &&
            <div className={"list-input-horizontal"}>
                <input className={"questionnaire-item-list-input"}
                       value={props.value}
                       onChange={e => props.onChange(e)}
                />
                <i className={"pi pi-plus-circle"}
                   style={{"fontSize": "5vmax"}}
                   onClick={() => props.onSubmit(props.value)}
                />
            </div>
            }
            <div className={"list-input-values"}>
                {
                    props.values.map(it =>
                        <div key={it} className={"list-input-value"}>
                            <div className={"list-input-value-label"}>{it}</div>
                            {
                                props.onEdit != null &&
                                <Icon className={"pi pi-pencil"}
                                      fontSize={"2.5vmax"}
                                      onClick={() => props.onEdit(it)}
                                />
                            }
                            {
                                props.onDelete != null &&
                                <Icon className={"pi pi-times"}
                                      fontSize={"2.5vmax"}
                                      onClick={() => props.onDelete(it)}
                                />
                            }
                        </div>
                    )
                }
            </div>
        </>
    )
}