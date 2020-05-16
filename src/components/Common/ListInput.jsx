import React from "react";
import {connect} from "react-redux";

function mapStateToProps(state, props) {
    return {}
}

function mapDispatchToProps(dispatch, props) {
    return {}
}


export default connect(mapStateToProps, mapDispatchToProps)(function (props) {
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
                            <i className={"pi pi-times"}
                               style={{"fontSize": "3vmax"}}
                               onClick={() => props.onDelete(it)}
                            />
                        </div>
                    )
                }
            </div>
        </>
    )
})