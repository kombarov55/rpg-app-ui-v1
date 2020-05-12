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
        <div className={"questionnaire-item-list"}>
            <div className={"questionnaire-item-list-item"}>Москва</div>
            <div className={"questionnaire-item-list-item"}>Тула</div>
            <div className={"questionnaire-item-list-item"}>Воронеж</div>
        </div>
    )
})