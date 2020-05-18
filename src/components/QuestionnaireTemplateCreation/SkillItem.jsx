import React from "react";
import {connect} from "react-redux";

function mapStateToProps(state, props) {
    return {}
}

function mapDispatchToProps(dispatch, props) {
    return {}
}


export default connect(mapStateToProps, mapDispatchToProps)(function (props) {
    const {name, type, description, imgSrc, onDelete, onClick, onEdit, expand, maxValue, upgradeCosts} = props

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
                     src={imgSrc}
                     onClick={() => onClick()}
                />
                <div className={"questionaire-skill-item-horizontal-text-group"}>
                    <div className={"questionnaire-skill-item-vertical"}
                         onClick={() => onClick()}>
                        <div className={"questionnaire-skill-name"}>{name}</div>
                        <div className={"questionnaire-skill-type"}>{type}</div>
                    </div>
                    <div className={"questionaire-skill-item-horizontal-button-group"}>
                        {
                            props.onDelete &&
                            <i className={"pi pi-times"}
                               onClick={() => onDelete()}
                            />
                        }

                        {
                            props.onEdit &&
                            <i className={"pi pi-pencil"}
                               onClick={() => onEdit()}
                            />
                        }
                    </div>

                </div>

            </div>
            {
                props.expand &&
                <>
                    <div className={"questionnaire-skill-description"}>{description}</div>
                    <div className={"questionnaire-skill-detail"}>
                        <div className={"questionnaire-skill-detail-entry"}>Макс. уровень: {maxValue}</div>
                    </div>
                    <div className={"questionnaire-skill-detail-lvl-increase-detail"}>
                        <div className={"questionnaire-skill-detail-lvl-increase-detail-label"}>
                            Повышение:
                        </div>

                        {upgradeCosts.map(lvlUpgrade =>
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