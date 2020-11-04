import React from "react";
import {connect} from "react-redux"
import FormViewStyle from "../../../../styles/FormViewStyle";
import ViewInfo from "../../../Common/Constructions/ViewInfo";
import List from "../../../Common/Lists/List";
import ExpandableListItemWithBullets from "../../../Common/ListElements/ExpandableListItemWithBullets";
import FormMode from "../../../../data-layer/enums/FormMode";
import QuestionnaireTemplateFieldForm from "../Form/QuestionnaireTemplateFieldForm";
import {get, httpDelete, post, put} from "../../../../util/Http";
import {
    deleteQuestionnaireTemplateFieldUrl,
    deleteSkillCategoryToPointsUrl,
    editQuestionnaireTemplateFieldUrl,
    findAllSkillCategoriesShortByGameId,
    saveQuestionnaireTemplateFieldUrl,
    saveSkillCategoryToPointsUrl
} from "../../../../util/Parameters";
import {changeView, setActiveQuestionnaireTemplate} from "../../../../data-layer/ActionCreators";
import Popup from "../../../../util/Popup";
import FieldType from "../../../../data-layer/enums/FieldType";
import ListItem from "../../../Common/ListElements/ListItem";
import SkillCategoryToPointsForm from "../Form/SkillCategoryToPointsForm";
import Btn from "../../../Common/Buttons/Btn";
import {adminGameView} from "../../../../Views";
import Destination from "../../../../data-layer/enums/Destination";
import InputLabel from "../../../Common/Labels/InputLabel";

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
            ...ownProps,
            addField: (field) => {
                const qt = Object.assign({}, stateProps.questionnaireTemplate, {
                    fields: stateProps.questionnaireTemplate.fields.concat(field)
                })
                dispatch(setActiveQuestionnaireTemplate(qt))
            },
            removeField: (field) => {
                const qt = Object.assign({}, stateProps.questionnaireTemplate, {
                    fields: stateProps.questionnaireTemplate.fields.filter(v => v.id !== field.id)
                })

                dispatch(setActiveQuestionnaireTemplate(qt))
            },
            editField: (field) => {
                const qt = Object.assign({}, stateProps.questionnaireTemplate, {
                    fields: stateProps.questionnaireTemplate.fields.filter(v => v.id !== field.id).concat(field)
                })

                dispatch(setActiveQuestionnaireTemplate(qt))
            },

            addSkillCategoryToPoints: x => {
                const qt = Object.assign({}, stateProps.questionnaireTemplate, {
                    skillCategoryToPoints: stateProps.questionnaireTemplate.skillCategoryToPoints.concat(x)
                })
                dispatch(setActiveQuestionnaireTemplate(qt))
            },

            removeSkillCategoryToPoints: x => {
                const qt = Object.assign({}, stateProps.questionnaireTemplate, {
                    skillCategoryToPoints: stateProps.questionnaireTemplate.skillCategoryToPoints.filter(v => v.id !== x.id)
                })
                dispatch(setActiveQuestionnaireTemplate(qt))
            },

            back: () => dispatch(changeView(adminGameView))
        }
    }
)(class QuestionnaireTemplateView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            skillCategories: [],

            fieldFormVisible: false,
            fieldForm: null,
            fieldFormMode: FormMode.CREATE,

            skillCategoryToPointsFormVisible: false,
        }

        get(findAllSkillCategoriesShortByGameId(this.props.gameId), rs => this.setState({skillCategories: rs}))
    }

    render() {
        return (
            <div style={FormViewStyle}>
                <ViewInfo
                    img={this.props.questionnaireTemplate.img}
                    name={this.props.questionnaireTemplate.name}
                    description={this.props.questionnaireTemplate.description}
                />

                <InputLabel text={`Поле "Имя" уже включено в анкету.`}/>

                <List title={"Поля анкеты:"}
                      noItemsText={"Пусто.."}
                      isAddButtonVisible={!this.state.fieldFormVisible}
                      onAddClicked={() => this.setState({
                          fieldFormVisible: true,
                          fieldFormMode: FormMode.CREATE
                      })}
                      values={this.props.questionnaireTemplate.fields.map(field =>
                          <ExpandableListItemWithBullets
                              name={field.name}
                              description={field.description}
                              onEditClicked={() => this.setState({
                                  fieldFormVisible: true,
                                  fieldFormMode: FormMode.EDIT,
                                  fieldForm: field
                              })}
                              onDeleteClicked={() => httpDelete(deleteQuestionnaireTemplateFieldUrl(field.id), rs => {
                                  this.props.removeField(rs)
                                  Popup.info("Поле удалено")
                              })}
                              bullets={[
                                  "Тип: " + FieldType.getLabel(field.type),
                                  ...(field.type === FieldType.CHOICE ? ["Варианты:", ...field.choices] : "")
                              ]}
                          />
                      )}
                />
                {
                    this.state.fieldFormVisible && (
                        this.state.fieldFormMode === FormMode.CREATE ?
                            <QuestionnaireTemplateFieldForm
                                onSubmit={form => post(saveQuestionnaireTemplateFieldUrl(this.props.questionnaireTemplate.id), form, rs => {
                                    this.props.addField(rs)
                                    Popup.info("Поле добавлено.")
                                    this.setState({fieldFormVisible: false})
                                })}
                            /> :
                            <QuestionnaireTemplateFieldForm
                                initialState={this.state.fieldForm}
                                onSubmit={form => put(editQuestionnaireTemplateFieldUrl(form.id), form, rs => {
                                    this.props.editField(rs)
                                    Popup.info("Поле Изменено.")
                                    this.setState({fieldFormVisible: false})
                                })}
                            />
                    )
                }
                <List title={"Распределение начальных очков по категориям навыков:"}
                      noItemsText={"Пусто.."}
                      isAddButtonVisible={!this.state.skillCategoryToPointsFormVisible}
                      onAddClicked={() => this.setState({skillCategoryToPointsFormVisible: true})}
                      values={this.props.questionnaireTemplate.skillCategoryToPoints.map(skillCategoryToPoints =>
                          <ListItem
                              text={skillCategoryToPoints.skillCategory.name + ": " + skillCategoryToPoints.amount + " очков"}
                              onDelete={() => httpDelete(deleteSkillCategoryToPointsUrl(skillCategoryToPoints.id), rs => {
                                  this.props.removeSkillCategoryToPoints(rs)
                                  Popup.info("Распределение удалено.")
                              })}
                          />
                      )}
                />
                {
                    this.state.skillCategoryToPointsFormVisible &&
                    <SkillCategoryToPointsForm
                        skillCategories={this.state.skillCategories
                            .filter(v => v.destination === Destination.PLAYER)
                            .filter(v => !this.isSkillCategoryUsed(v))}
                        onSubmit={form => post(saveSkillCategoryToPointsUrl(this.props.questionnaireTemplate.id), form, rs => {
                            this.props.addSkillCategoryToPoints(rs)
                            Popup.info("Распределение очков добавлено.")
                            this.setState({skillCategoryToPointsFormVisible: false})
                        })}
                    />
                }
                <Btn text={"Назад"} onClick={() => this.props.back()}/>
            </div>
        )
    }

    isSkillCategoryUsed(skillCategory) {
        return this.props.questionnaireTemplate.skillCategoryToPoints.some((pair) => pair.skillCategory.id === skillCategory.id)
    }
})