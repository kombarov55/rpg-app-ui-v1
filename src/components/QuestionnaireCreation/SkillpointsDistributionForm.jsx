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
        <div className={"questionnaire-creation-skillpoints-distribution-vertical"}>
            <div className={"questionnaire-creation-skillpoints-distribution-entry"}>
                <div className={"questionnaire-creation-skillpoints-distribution-name"}>
                    Общие:
                </div>
                <input className={"questionnaire-creation-skillpoints-distribution-value"}/>
            </div>
            <div className={"questionnaire-creation-skillpoints-distribution-entry"}>
                <div className={"questionnaire-creation-skillpoints-distribution-name"}>
                    Боевые:
                </div>
                <input className={"questionnaire-creation-skillpoints-distribution-value"}/>
            </div>
            <div className={"questionnaire-creation-skillpoints-distribution-entry"}>
                <div className={"questionnaire-creation-skillpoints-distribution-name"}>
                    Магические:
                </div>
                <input className={"questionnaire-creation-skillpoints-distribution-value"}/>
            </div>
            <div className={"questionnaire-creation-skillpoints-distribution-entry"}>
                <div className={"questionnaire-creation-skillpoints-distribution-name"}>
                    Прочие:
                </div>
                <input className={"questionnaire-creation-skillpoints-distribution-value"}/>
            </div>
        </div>
    )
})