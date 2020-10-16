import React from "react";
import {connect} from "react-redux";

function mapStateToProps(state, props) {
    return {
    
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
    
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(function (props) {
    return (
        <div className={"add-game-item"} onClick={() => props.onClick()}>
            <i className={"pi pi-plus-circle"}
               style={{"fontSize": "10vmax"}}
            />
        </div>
    )
})