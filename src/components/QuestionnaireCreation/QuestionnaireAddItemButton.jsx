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
        <div className={"questionnaire-add-item-button"}
             onClick={() => props.onClick()}>
            <i className={"pi pi-plus-circle"}
               style={{"fontSize": "5vmax"}}
            />
            <div className={"questionnaire-add-item-label"}>Добавить пункт</div>
        </div>
    )
})