import React from "react";
import FormViewStyle from "../../../../styles/FormViewStyle";
import {connect} from "react-redux"
import InputLabel from "../../../Common/Labels/InputLabel";
import Btn from "../../../Common/Buttons/Btn";
import FieldType from "../../../../data-layer/enums/FieldType";
import FileUpload from "../../../Common/Input/FileUpload";
import {SelectButton} from "primereact/selectbutton";
import FormTitleLabel from "../../../Common/Labels/FormTitleLabel";
import {findAllSkillCategoriesByGameIdAndDestionationUrl} from "../../../../util/Parameters";
import {get} from "../../../../util/Http";
import SkillDistributionComponent from "../Comonent/SkillDistributionComponent";
import Destination from "../../../../data-layer/enums/Destination";
import SpellSchoolComponent from "../Comonent/SpellSchoolComponent";
import IdComparator from "../../../../util/IdComparator";
import Popup from "../../../../util/Popup";

export default connect(
    state => ({
        questionnaireTemplate: state.activeQuestionnaireTemplate,
        gameId: state.activeGame.id
    }),
    null,
    (stateProps, dispatchProps, ownProps) => {
        const {dispatch} = dispatchProps

        return {
            ...stateProps,

        }
    }
)(class QuestionnaireFillingView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            /**
             * [{field: Field, value: String}]
             */
            fieldToValueList: [],
            /**
             * [{skillCategory: SkillCategory, amount: Int}]
             */
            skillCategoryToRemainingSkillPoints: props.questionnaireTemplate.skillCategoryToPoints,

            skillCategories: [],

            /**
             * [{skill: Skill, amount: Int}]
             */
            selectedSkillsToLvl: [],
            selectedSpells: []
        }

        get(findAllSkillCategoriesByGameIdAndDestionationUrl(props.gameId, Destination.PLAYER), rs => this.setState({skillCategories: rs}))
    }

    render() {
        return (
            <div style={FormViewStyle}>
                {this.props.questionnaireTemplate.fields.map(field =>
                    <div>
                        <InputLabel text={field.name}/>
                        {this.getInputByType(field, field.type)}
                        <div>{field.description}</div>
                    </div>
                )}

                <FormTitleLabel text={"Оставшееся количество очков навыков:"}/>
                {this.state.skillCategoryToRemainingSkillPoints.sort((x1, x2) => IdComparator(x1.skillCategory, x2.skillCategory)).map(({skillCategory, amount}) =>
                    <InputLabel text={skillCategory.name + ": " + amount + " очков"}/>
                )}

                <FormTitleLabel text={"Распределение очков навыков:"}/>
                {this.state.skillCategories.filter(v => !v.complex).map(skillCategory => skillCategory.skills.map(skill =>
                    <div>
                        <SkillDistributionComponent skill={skill}
                                                    canSelectMore={this.haveEnoughFreeSkillPoints(skillCategory)}
                                                    onSkillAdded={() => {
                                                        this.setState(state => ({
                                                            selectedSkillsToLvl: this.state.selectedSkillsToLvl.concat({skill: skill, amount: 0})
                                                        }))
                                                        this.decPointsAmount(skillCategory)
                                                    }}
                                                    onSkillRemoved={() => {
                                                        this.setState(state => ({
                                                            selectedSkillsToLvl: this.state.selectedSkillsToLvl.filter(v => v.skill.id !== skill.id)
                                                        }))
                                                        this.incPointsAmount(skillCategory)
                                                    }}
                                                    onUpgradeCountChanged={count => this.setState(state => ({
                                                        selectedSkillsToLvl: this.state.selectedSkillsToLvl
                                                            .filter(v => v.skill.id !== skill.id)
                                                            .concat({skill: skill, amount: count})
                                                    }))}
                                                    incUpgradeCountCallback={() => this.decPointsAmount(skillCategory)}
                                                    decUpgradeCountCallback={() => this.incPointsAmount(skillCategory)}
                        />
                    </div>
                ))}
                <FormTitleLabel text={"Школы магии:"}/>
                {this.state.skillCategories.filter(v => v.complex).map(skillCategory => skillCategory.spellSchools.map(spellSchool =>
                <div>

                    <SpellSchoolComponent spellSchool={spellSchool}
                                          canSelectMore={this.haveEnoughFreeSkillPoints(skillCategory)}
                                          onSpellAdded={spell => {
                                              this.setState(state => ({selectedSpells: state.selectedSpells.concat(spell)}))
                                              this.decPointsAmount(skillCategory)
                                          }}
                                          onSpellRemoved={spell => {
                                              this.setState(state => ({selectedSpells: state.selectedSpells.filter(v => v !== spell)}))
                                              this.incPointsAmount(skillCategory)
                                          }}
                                          key={spellSchool.id}
                    />

                </div>
                ))}

                <Btn text={"Сохранить"} onClick={() => console.log(this.state)}/>
            </div>
        )
    }

    getInputByType(field, type) {
        if (type === FieldType.STRING || type === FieldType.NUMBER) {
            return (
                <input value={this.getValueOfField(field)}
                       onChange={e => this.onFieldValueEntered(field, e.target.value)}
                />
            )
        }

        if (type === FieldType.IMAGE) {
            return (
                <FileUpload onChange={img => this.onFieldValueEntered(field, img)}/>
            )
        }

        if (type === FieldType.CHOICE) {
            return (
                <SelectButton options={field.choices.map(v => ({label: v, value: v}))}
                              value={this.getValueOfField(field)}
                              onChange={e => this.onFieldValueEntered(field, e.target.value)}
                />
            )
        }
    }

    onFieldValueEntered(field, value) {
        const fieldToValue = this.state.fieldToValueList.find(v => v.field === field)
        if (fieldToValue != null) {
            fieldToValue.value = value
            this.setState(state => ({
                fieldToValueList: state.fieldToValueList.filter(v => v.field !== field).concat(fieldToValue)
            }))
        } else {
            this.setState(state => ({
                fieldToValueList: state.fieldToValueList.concat({field: field, value: value})
            }))
        }
    }

    getValueOfField(field) {
        const fieldToValue = this.state.fieldToValueList.find(v => v.field === field)

        if (fieldToValue != null) {
            return fieldToValue.value
        } else {
            return ""
        }
    }

    haveEnoughFreeSkillPoints(skillCategory) {
        return this.getAmountOfLeftSkillPoints(skillCategory) > 0
    }

    incPointsAmount(skillCategory) {
        const prevAmount = this.getAmountOfLeftSkillPoints(skillCategory)

        this.setState(state => ({
            skillCategoryToRemainingSkillPoints: state.skillCategoryToRemainingSkillPoints
                .filter(v => v.skillCategory.id !== skillCategory.id)
                .concat({skillCategory: skillCategory, amount: prevAmount + 1})
        }))
        Popup.info("Осталось " + (prevAmount + 1) + " очков в категории '" + skillCategory.name + "'")
    }

    decPointsAmount(skillCategory) {
        const prevAmount = this.getAmountOfLeftSkillPoints(skillCategory)

        this.setState(state => ({
            skillCategoryToRemainingSkillPoints: state.skillCategoryToRemainingSkillPoints
                .filter(v => v.skillCategory.id !== skillCategory.id)
                .concat({skillCategory: skillCategory, amount: prevAmount - 1})
        }))
        Popup.info("Осталось " + (prevAmount - 1) + " очков в категории '" + skillCategory.name + "'")
    }

    getAmountOfLeftSkillPoints(skillCategory) {
        return this.state.skillCategoryToRemainingSkillPoints.find(v => v.skillCategory.id === skillCategory.id).amount
    }
})