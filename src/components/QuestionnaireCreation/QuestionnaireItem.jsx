import React from "react";
import {connect} from "react-redux";
import QuestionnaireItemType from "../../data-layer/enums/QuestionnaireItemType";

function mapStateToProps(state, props) {
    return {}
}

function mapDispatchToProps(dispatch, props) {
    return {}
}


export default connect(mapStateToProps, mapDispatchToProps)(function (props) {
    return (
        <div className={"questionnaire-item"}>
            <div className={"questionnaire-item-head-horizontal"}>
                <div className={"questionnaire-item-name"}>{props.name}</div>
                <div className={"questionnaire-item-type"}>{props.type}</div>
            </div>
            {props.type === QuestionnaireItemType.LIST.value && props.listValues.map(name =>
                <div key={name}
                     className={"questionnaire-item-list-item-display"}>{name}
                </div>
            )}
        </div>
    )
})