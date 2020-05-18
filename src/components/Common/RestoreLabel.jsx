import React from "react";
import {connect} from "react-redux";

function mapStateToProps(state, props) {
    return {}
}

function mapDispatchToProps(dispatch, props) {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(function(props) {
    return (
        <div className={"restore-label"}>
            <div className={"restore-label-text"}>
                {props.text}
            </div>
            <div className={"restore-label-link"}>
                [Восстановить]
            </div>
        </div>
    )
})