import React from "react";
import {connect} from "react-redux";

function mapStateToProps(state, props) {
    return {}
}

function mapDispatchToProps(dispatch, props) {
    return {}
}


export default connect(mapStateToProps, mapDispatchToProps)(function (props) {
    function optionsToString(options) {
        return options.map(({costs}) => buildCostLabel(costs)).join(" или ")
    }

    function buildCostLabel(costsList) {
        return costsList.map(it => it.amount + " " + it.currencyName).join(" + ")
    }

    return (
        <div className={"questionaire-skill-item"}>
            <div className={"questionaire-skill-item-horizontal"}>
                <img className={"questionnaire-skill-img"}
                     src={props.imgSrc}
                     onClick={() => props.onClick()}
                />
                <div className={"questionaire-skill-item-horizontal-text-group"}>
                    <div className={"questionnaire-skill-item-vertical"}
                         onClick={() => props.onClick()}>
                        <div className={"questionnaire-skill-name"}>{props.name}</div>
                        <div className={"questionnaire-skill-type"}>{props.type}</div>
                    </div>
                    <i className={"pi pi-times"}
                       onClick={() => props.onDelete()}
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

                        {props.upgradeCosts.map(lvlUpgrade =>
                            <div className={"questionnaire-skill-detail-lvl-increase-detail-chip"}>
                                {optionsToString(lvlUpgrade.options)}
                            </div>
                        )}


                    </div>
                </>
            }

        </div>
    )
})