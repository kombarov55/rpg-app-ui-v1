import React from "react";
import {connect} from "react-redux";

function mapStateToProps(state, props) {
    return {}
}

function mapDispatchToProps(dispatch, props) {
    return {}
}


export default connect(mapStateToProps, mapDispatchToProps)(function (props) {
    return (
        <div className={"questionaire-skill-item"}
             onClick={() => props.onClick()}>
            <div className={"questionaire-skill-item-horizontal"}>
                <img className={"questionnaire-skill-img"}
                     src={props.imgSrc}
                />
                <div className={"questionaire-skill-item-horizontal-text-group"}>
                    <div className={"questionnaire-skill-item-vertical"}>
                        <div className={"questionnaire-skill-name"}>{props.name}</div>
                        <div className={"questionnaire-skill-type"}>{props.type}</div>
                    </div>
                    <i className={"pi pi-times"}
                    />
                </div>

            </div>
            {
                props.expand &&
                <>
                    <div className={"questionnaire-skill-description"}>{props.description}</div>
                    <div className={"questionnaire-skill-detail"}>
                        <div className={"questionnaire-skill-detail-entry"}>Макс. уровень: {props.maxValue}</div>
                    </div>
                    <div className={"questionnaire-skill-detail-lvl-increase-detail"}>
                        <div className={"questionnaire-skill-detail-lvl-increase-detail-label"}>
                            Повышение:
                        </div>
                        {
                            props.upgradeCosts.map(label =>
                            <div className={"questionnaire-skill-detail-lvl-increase-detail-chip"}>
                                {label}
                            </div>)
                        }
                        {/*<div className={"questionnaire-skill-detail-lvl-increase-detail-chip"}>500 опыта, 100 золота*/}
                        {/*</div>*/}
                        {/*<div className={"questionnaire-skill-detail-lvl-increase-detail-chip"}>1000 опыта, 200 золота*/}
                        {/*</div>*/}
                        {/*<div className={"questionnaire-skill-detail-lvl-increase-detail-chip"}>2000 опыта, 400 золота*/}
                        {/*</div>*/}
                        {/*<div className={"questionnaire-skill-detail-lvl-increase-detail-chip"}>5000 опыта, 500 золота*/}
                        {/*</div>*/}
                    </div>
                </>
            }

        </div>
    )
})