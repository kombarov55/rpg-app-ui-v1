import React from "react";
import {connect} from "react-redux";
import QuestionnaireTemplateItemType from "../../data-layer/enums/QuestionnaireTemplateItemType";

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
                <div className={"questionnaire-item-head-horizontal-right"}>
                    <div className={"questionnaire-item-type"}>{props.type}</div>
                    <i
                        className={"pi pi-times"}
                        style={{
                            "margin": "0 3vmin"
                        }}
                        onClick={() => props.onDelete()}
                    />
                </div>
            </div>
            {props.type === QuestionnaireTemplateItemType.LIST.value && props.listValues.map(name =>
                <div key={name}
                     className={"questionnaire-item-list-item-display"}>{name}
                </div>
            )}
        </div>
    )
})