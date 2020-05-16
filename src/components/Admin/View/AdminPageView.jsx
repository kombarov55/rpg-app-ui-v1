import React from "react";
import {connect} from "react-redux";
import Label from "../../Common/Label";

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
        <div className={"admin-page-view"}>
            <Label text={"Сети"}/>
            <Label text={"Игры"}/>
        </div>
    )
})