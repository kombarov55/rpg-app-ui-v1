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
            ...ownProps
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

            skillCategories: []
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
                {this.state.skillCategoryToRemainingSkillPoints.map(({skillCategory, amount}) =>
                    <InputLabel text={skillCategory.name + ": " + amount + " очков"}/>
                )}

                <InputLabel text={"Распределение очков навыков:"}/>
                {this.state.skillCategories.filter(v => !v.complex).flatMap(v => v.skills).map(skill =>
                    <div>
                        <SkillDistributionComponent
                            name={skill.name}
                            img={skill.img}
                            description={skill.description}

                            key={skill.id}
                        />
                    </div>
                )}

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
})