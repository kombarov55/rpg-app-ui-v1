import React from "react";
import {connect} from "react-redux";
import {SelectButton} from "primereact/selectbutton";
import {Checkbox} from "primereact/checkbox";
import {changeView, setSkills, updateQuestionnaireForm, updateSkillForm} from "../../../data-layer/ActionCreators";
import Btn from "../../Common/Btn";
import {InputTextarea} from "primereact/inputtextarea";
import {post} from "../../../util/Http";
import {skillUrl} from "../../../util/Parameters";
import {skillslView} from "../../../Views";

function mapStateToProps(state, props) {
    return {
        skillForm: state.skillForm,
        activeGame: state.activeGame,
        questionnaireForm: state.questionnaireForm,
        skills: state.skills,
        growl: state.growl
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        updateSkillForm: fieldNameToValue => dispatch(updateSkillForm(fieldNameToValue)),
        updateQuestionnaireForm: fieldNameToValue => dispatch(updateQuestionnaireForm(fieldNameToValue)),
        setSkills: skills => dispatch(setSkills(skills)),
        changeView: view => dispatch(changeView(view))
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
            deleteMentionedUpgradeOptions(name)
        }

        props.updateSkillForm({currenciesForUpgrade: updatedList})
        // props.updateSkillForm({upgradeCosts: deprecated__updateupgradeCostsCurrencies(props.skillForm.upgradeCosts, updatedList)})
    }

    function isCurrencyChecked(name) {
        return props.skillForm.currenciesForUpgrade.some(it => it === name)
    }

    function onUpgradeOptionDeleteClicked(deletionCurrencies) {
        deleteUpgradeOptionByCurrencies(deletionCurrencies)
        deleteUpgradeCostsOptionsByCurrencies(deletionCurrencies)
    }

    function deleteUpgradeOptionByCurrencies(deletionCurrencies) {
        props.updateSkillForm({
            upgradeOptions: props.skillForm.upgradeOptions.filter(item =>
                !item.currencies.every(optionCurrency =>
                    deletionCurrencies.some(deletionCurrency =>
                        deletionCurrency === optionCurrency)))
        })
    }

    function deleteUpgradeCostsOptionsByCurrencies(deletionCurrencies) {
        props.updateSkillForm({
            upgradeCosts: props.skillForm.upgradeCosts.map(upgradeCost =>
                Object.assign({}, upgradeCost, {
                    options: upgradeCost.options.filter(option =>
                        !option.costs.every(cost =>
                            deletionCurrencies.some(deletionCurrency =>
                                deletionCurrency === cost.currencyName)))
                })
            )})
    }

    function toggleOptionCurrency(name) {
        const list = props.skillForm.upgradeOptionForm.currencies

        const contains = list.some(it => it === name)

        let updatedList

        if (!contains) {
            updatedList = list.concat(name)
        } else {
            updatedList = list.filter(it => it !== name)
        }

        props.updateSkillForm({
            upgradeOptionForm: Object.assign({}, props.skillForm.upgradeOptionForm, {
                currencies: updatedList
            })
        })
    }

    function deleteMentionedUpgradeOptions(currency) {
        props.updateSkillForm({
            upgradeOptions: props.skillForm.upgradeOptions.filter(item =>
                !item.currencies.some(itemCurrency =>
                    itemCurrency === currency))
        })
    }

    function isOptionCurrencyChecked(name) {
        return props.skillForm.upgradeOptionForm.currencies.some(it => it === name)
    }

    function onUpgradeOptionAddClicked() {
        props.updateSkillForm({
            upgradeOptions: props.skillForm.upgradeOptions.concat(props.skillForm.upgradeOptionForm),
            upgradeOptionForm: {
                currencies: []
            },
            upgradeOptionFormVisible: false
        })

    }

    function onMaxValueChange(value) {
        props.updateSkillForm({
            maxValue: value,
            upgradeCosts: updateUpgradeCostsLength(props.skillForm.upgradeCosts, parseInt(value), props.skillForm.upgradeOptions)
        })
        // props.updateSkillForm({upgradeCosts: deprecated__updateupgradeCostsLength(props.skillForm.upgradeCosts, parseInt(value), props.skillForm.currenciesForUpgrade)})

    }

    function deprecated__updateupgradeCostsCurrencies(list, updatedCurrenciesList) {
        return list.map(item => Object.assign({}, item, {
            costs: updatedCurrenciesList.map(name => {
                const prevItem = item.costs.find(costItem => costItem.currencyName === name)

                let amount
                if (prevItem != null) {
                    amount = prevItem.amount
                } else {
                    amount = 0
                }

                return {
                    currencyName: name,
                    amount: amount
                }
            })
        }))
    }

    function deprecated__updateupgradeCostsLength(prevList, newLength, currencies) {
        if (newLength > prevList.length) {
            return prevList.concat(deprecated__buildupgradeCostsList(prevList.length + 1, newLength - prevList.length, currencies))
        } else {
            return prevList.slice(0, newLength - prevList.length)
        }
    }

    function updateUpgradeCostsLength(prevList, newLength, options) {
        if (newLength > prevList.length) {
            return prevList.concat(buildUpgradeCostsList(prevList.length + 1, newLength - prevList.length, options))
        } else {
            return prevList.slice(0, newLength - prevList.length)
        }
    }

    function deprecated__buildupgradeCostsList(start, length, currencies) {
        const result = []

        for (let i = start; i < start + length; i++) {
            result.push({
                lvlNum: i,
                costs: currencies.map(name => ({
                    currencyName: name,
                    amount: 0
                }))
            })
        }

        return result
    }

    function buildUpgradeCostsList(start, length, upgradeOptions) {
        const result = []

        for (let i = start; i < start + length; i++) {
            result.push({
                lvlNum: i,
                options: upgradeOptions.map(({currencies}) => ({
                    costs: currencies.map(name => ({
                        currencyName: name,
                        amount: 0
                    }))
                }))
            })
        }

        return result
    }

    function deprecated__onSkillCostUpdate(lvlNum, currencyName, amount) {
        const newList = props.skillForm.upgradeCosts.slice()

        newList.find(cost => cost.lvlNum === lvlNum)
            .costs.find(costItem => costItem.currencyName === currencyName)
            .amount = amount

        props.updateSkillForm({upgradeCosts: newList})
    }

    function onSkillCostUpdate(lvlNum, optionIndex, currencyName, amount) {
        const updatedList = props.skillForm.upgradeCosts.slice()
        updatedList.find(it => it.lvlNum === lvlNum)
            .options[optionIndex]
            .costs.find(it => it.currencyName === currencyName)
            .amount = window.isNaN(amount) ? 0 : parseInt(amount)

        props.updateSkillForm({upgradeCosts: updatedList})
    }

    function onSaveClicked() {
        const body = Object.assign({}, props.skillForm, {
            gameId: props.activeGame.id
        })

        post(skillUrl, body, rs => {
            props.setSkills(props.skills.concat(rs))
            props.changeView(skillslView)
            props.growl.show({severity: "info", summary: "Навык создан"})
        })
    }

    return (
        <>
            <div className={"questionnaire-creation-skill-item-form"}>

                <div className={"questionnaire-creation-skill-item-form-label"}>Название навыка:</div>
                <input className={"questionnaire-creation-skill-item-form-name-input"}
                       value={props.skillForm.name}
                       onChange={e => props.updateSkillForm({name: e.target.value})}
                />

                <div className={"questionnaire-creation-skill-item-form-label"}>Описание:</div>
                <InputTextarea
                    autoResize={true}
                    className={"questionnaire-creation-skill-item-form-name-input"}
                    value={props.skillForm.description}
                    onChange={e => props.updateSkillForm({description: e.target.value})}
                />

                <div className={"questionnaire-creation-skill-item-form-label"}>Тип навыка:</div>
                <SelectButton
                    value={props.skillForm.type}
                    onChange={e => props.updateSkillForm({type: e.target.value})}
                    options={props.activeGame.skillTypes.map(name => ({label: name, value: name}))}/>

                <div className={"questionnaire-creation-skill-item-form-label"}>Валюта для повышения:</div>
                {
                    props.activeGame.currencies.map(name =>
                        <div
                            className={"questionnaire-creation-skill-item-form-checkbox-horizontal"}
                            key={name}
                        >
                            <Checkbox
                                onChange={() => toggleCurrency(name)}
                                checked={isCurrencyChecked(name)}
                            />
                            <div className={"questionnaire-creation-skill-item-form-checkbox-label"}>{name}</div>
                        </div>
                    )
                }
                <div className={"questionnaire-creation-skill-item-form-label"}>Варианты повышения:</div>
                {
                    props.skillForm.upgradeOptions.map(({currencies}) =>
                        <div className={"skill-upgrade-option"}
                             onClick={() => onUpgradeOptionDeleteClicked(currencies)}>
                            {currencies.join(" + ")}
                        </div>
                    )
                }

                {props.skillForm.upgradeOptionFormVisible &&
                <>
                    {props.skillForm.currenciesForUpgrade.map(name =>
                        <div className={"questionnaire-creation-skill-item-form-checkbox-horizontal"} key={name}>
                            <Checkbox
                                onChange={() => toggleOptionCurrency(name)}
                                checked={isOptionCurrencyChecked(name)}
                            />
                            <div className={"questionnaire-creation-skill-item-form-checkbox-label"}>{name}</div>
                        </div>
                    )}
                    <Btn text={"Добавить"}
                         onClick={() => onUpgradeOptionAddClicked()}
                    />
                </>
                }

                <i className={"pi pi-plus-circle"}
                   style={{"fontSize": "4vh"}}
                   onClick={() => props.updateSkillForm({upgradeOptionFormVisible: true})}
                />

                <div className={"questionnaire-creation-skill-item-form-label"}>Максимальное значение:</div>
                <input className={"questionnaire-creation-skill-item-form-max-value"}
                       value={props.skillForm.maxValue}
                       onChange={e => onMaxValueChange(e.target.value)}
                />

                <div className={"questionnaire-creation-skill-item-form-lvl-increase-vertical"}>
                    { props.skillForm.upgradeCosts.map(upgradeCostItem =>
                        <div className={"questionnaire-creation-skill-item-form-lvl-increase-item"}>
                            <div
                                className={"questionnaire-creation-skill-item-form-label"}>{upgradeCostItem.lvlNum} уровень:
                            </div>
                            <div className={"questionnaire-creation-skill-item-form-lvl-increase-values"}>
                                { upgradeCostItem.options.map((upgradeOption, i)=>
                                    <div className={"questionnaire-creation-skill-item-form-lvl-increase-value"}>
                                        <div className={"questionnaire-creation-skill-item-form-lvl-increase-item-option-label"}>{(i + 1) + " Вариант: " + upgradeOption.costs.map(cost => cost.currencyName).join(" + ")}</div>
                                        { upgradeOption.costs.map(cost =>
                                            <>
                                                <div className={"questionnaire-creation-skill-item-form-lvl-increase-item-label"}>{cost.currencyName}:</div>
                                                <input className={"questionnaire-creation-skill-item-form-lvl-increase-item-value"}
                                                       onChange={e =>
                                                           onSkillCostUpdate(upgradeCostItem.lvlNum, i, cost.currencyName, e.target.value)}
                                                />
                                            </>
                                        )}

                                    </div>

                                )}
                            </div>
                        </div>
                    )}
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

                <Btn
                    text={"Сохранить"}
                    onClick={() => onSaveClicked()}
                />

            </div>
        </>
    )
})