import React from "react";
import {connect} from "react-redux";
import {SelectButton} from "primereact/selectbutton";
import {Checkbox} from "primereact/checkbox";
import {updateSkillForm} from "../../data-layer/ActionCreators";

function mapStateToProps(state, props) {
    return {
        skillForm: state.skillForm
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        updateSkillForm: fieldNameToValue => dispatch(updateSkillForm(fieldNameToValue))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(function (props) {

    function toggleCurrency(name) {
        const list = props.skillForm.currenciesForUpgrade

        const contains = list.some(it => it === name)

        let updatedList

        if (!contains) {
            updatedList = list.concat(name)
        } else {
            updatedList = list.filter(it => it !== name)
        }

        props.updateSkillForm({currenciesForUpgrade: updatedList})
    }

    function isCurrencyChecked(name) {
        return props.skillForm.currenciesForUpgrade.some(it => it === name)
    }

    return (
        <div className={"questionnaire-creation-skill-item-form"}>
            <div className={"questionnaire-creation-view-label"}>Создание листа навыков:</div>

            <div className={"questionnaire-creation-skill-item-form-label"}>Название навыка:</div>
            <input className={"questionnaire-creation-skill-item-form-name-input"}
                   value={props.skillForm.name}
                   onChange={e => props.updateSkillForm({name: e.target.value})}
            />

            <div className={"questionnaire-creation-skill-item-form-label"}>Тип навыка:</div>
            <SelectButton
                value={props.skillForm.type}
                onChange={e => props.updateSkillForm({type: e.target.value})}
                options={props.skillTypes.map(name => ({label: name, value: name}))}/>

            <div className={"questionnaire-creation-skill-item-form-label"}>Валюта для повышения:</div>
            {
                props.currencies.map(name =>
                    <div className={"questionnaire-creation-skill-item-form-checkbox-horizontal"}>
                        <Checkbox
                            onChange={() => toggleCurrency(name)}
                            checked={isCurrencyChecked(name)}
                        />
                        <div className={"questionnaire-creation-skill-item-form-checkbox-label"}>{name}</div>
                    </div>
                )
            }
             {/*<div className={"questionnaire-creation-skill-item-form-checkbox-horizontal"}>*/}
            {/*    <Checkbox/>*/}
            {/*     <div className={"questionnaire-creation-skill-item-form-checkbox-label"}>Золото</div>*/}
            {/* </div>*/}
            {/*<div className={"questionnaire-creation-skill-item-form-checkbox-horizontal"}>*/}
            {/*    <Checkbox/>*/}
            {/*    <div className={"questionnaire-creation-skill-item-form-checkbox-label"}>Серебро</div>*/}
            {/*</div>*/}
            {/*<div className={"questionnaire-creation-skill-item-form-checkbox-horizontal"}>*/}
            {/*    <Checkbox/>*/}
            {/*    <div className={"questionnaire-creation-skill-item-form-checkbox-label"}>Опыт</div>*/}
            {/*</div>*/}


            <div className={"questionnaire-creation-skill-item-form-label"}>Максимальное значение:</div>
            <input className={"questionnaire-creation-skill-item-form-max-value"}
                   value={props.skillForm.maxValue}
                   onChange={e => props.updateSkillForm({maxValue: e.target.value})}
            />

            <div className={"questionnaire-creation-skill-item-form-lvl-increase-vertical"}>
                <div className={"questionnaire-creation-skill-item-form-lvl-increase-item"}>
                    <div className={"questionnaire-creation-skill-item-form-label"}>1 уровень:</div>
                    <div className={"questionnaire-creation-skill-item-form-lvl-increase-values"}>
                        <div className={"questionnaire-creation-skill-item-form-lvl-increase-item-label"}>Золото</div>
                        <input className={"questionnaire-creation-skill-item-form-lvl-increase-item-value"}/>
                        <div className={"questionnaire-creation-skill-item-form-lvl-increase-item-label"}>Опыт</div>
                        <input className={"questionnaire-creation-skill-item-form-lvl-increase-item-value"}/>
                    </div>
                </div>

                <div className={"questionnaire-creation-skill-item-form-lvl-increase-item"}>
                    <div className={"questionnaire-creation-skill-item-form-label"}>2 уровень:</div>
                    <div className={"questionnaire-creation-skill-item-form-lvl-increase-values"}>
                        <div className={"questionnaire-creation-skill-item-form-lvl-increase-item-label"}>Золото</div>
                        <input className={"questionnaire-creation-skill-item-form-lvl-increase-item-value"}/>
                        <div className={"questionnaire-creation-skill-item-form-lvl-increase-item-label"}>Опыт</div>
                        <input className={"questionnaire-creation-skill-item-form-lvl-increase-item-value"}/>
                    </div>
                </div>

                <div className={"questionnaire-creation-skill-item-form-lvl-increase-item"}>
                    <div className={"questionnaire-creation-skill-item-form-label"}>3 уровень:</div>
                    <div className={"questionnaire-creation-skill-item-form-lvl-increase-values"}>
                        <div className={"questionnaire-creation-skill-item-form-lvl-increase-item-label"}>Золото</div>
                        <input className={"questionnaire-creation-skill-item-form-lvl-increase-item-value"}/>
                        <div className={"questionnaire-creation-skill-item-form-lvl-increase-item-label"}>Опыт</div>
                        <input className={"questionnaire-creation-skill-item-form-lvl-increase-item-value"}/>
                    </div>
                </div>


            </div>

            <div className={"questionnaire-creation-skill-item-form-img-selection-label"}>Картинка:</div>
            <div className={"questionnaire-creation-skill-item-form-img-selection"}>
                <img className={"questionnaire-creation-skill-item-form-img-selection-item"}
                     src={"https://gamepedia.cursecdn.com/dota2_gamepedia/7/7a/Strength_attribute_symbol.png?version=d8564cc61841b6a816a9b1e6fd528f91"}
                />
                <img className={"questionnaire-creation-skill-item-form-img-selection-item"}
                     src={"https://gamepedia.cursecdn.com/dota2_gamepedia/2/2d/Agility_attribute_symbol.png?version=0429997b8b5c7b8195a35f719ef1700a"}
                />
                <img
                    className={"questionnaire-creation-skill-item-form-img-selection-item questionnaire-creation-skill-item-form-img-selection-item-selected"}
                    src={"https://gamepedia.cursecdn.com/dota2_gamepedia/5/56/Intelligence_attribute_symbol.png?version=7e30189be7a7c15889a2c245584797da"}
                />
            </div>


        </div>
    )
})