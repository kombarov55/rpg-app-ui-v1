import React from "react";
import {connect} from "react-redux";

function mapStateToProps(state, props) {
    return {

    }
}

function mapDispatchToProps(state, props) {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(function(props) {
    return (
        <div className={"network-item"} onClick={() => props.onClick()}>
            <img className={"network-item-img"}
                 src={props.imgSrc}
            />
            <div className={"network-item-title"}>{props.title}</div>
        </div>
    )
})