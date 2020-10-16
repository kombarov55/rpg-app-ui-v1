import React from "react";
import {connect} from "react-redux"
import FormViewStyle from "../../../../styles/FormViewStyle";
import ViewInfo from "../../../Common/Constructions/ViewInfo";
import List from "../../../Common/Lists/List";
import ExpandableListItemWithBullets from "../../../Common/ListElements/ExpandableListItemWithBullets";
import FormMode from "../../../../data-layer/enums/FormMode";
import QuestionnaireTemplateFieldForm from "../Form/QuestionnaireTemplateFieldForm";
import {httpDelete, post, put} from "../../../../util/Http";
import {
    deleteQuestionnaireTemplateFieldUrl,
    editQuestionnaireTemplateFieldUrl,
    saveQuestionnaireTemplateFieldUrl
} from "../../../../util/Parameters";
import {setActiveQuestionnaireTemplate} from "../../../../data-layer/ActionCreators";
import Popup from "../../../../util/Popup";
import FieldType from "../../../../data-layer/enums/FieldType";

export default connect(
    state => ({
        questionnaireTemplate: state.activeQuestionnaireTemplate
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
        }
    }
)(class QuestionnaireTemplateView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            fieldFormVisible: false,
            fieldForm: null,
            fieldFormMode: FormMode.CREATE
        }
    }

    render() {
        return (
            <div style={FormViewStyle}>
                <ViewInfo
                    img={this.props.questionnaireTemplate.img}
                    name={this.props.questionnaireTemplate.name}
                    description={this.props.questionnaireTemplate.description}
                />

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
            </div>
        )
    }
})