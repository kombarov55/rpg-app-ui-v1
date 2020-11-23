import React from "react";
import List from "../../../Common/Lists/List";
import FormMode from "../../../../data-layer/enums/FormMode";
import AdminGameQuestionnaireTemplateListItem from "../../../ListItem/AdminGameQuestionnaireTemplateListItem";
import QuestionnaireTemplateForm from "../../QuestionnaireTemplate/Form/QuestionnaireTemplateForm";

export default class extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            formVisible: false,
            formMode: FormMode.CREATE,
            form: null
        }
    }

    render() {
        return (
            <div>
                <List title={"Шаблоны анкет:"}
                      noItemsText={"Пусто.."}
                      isAddButtonVisible={!this.state.formVisible}
                      onAddClicked={() => this.setState({
                          formVisible: true,
                          formMode: FormMode.CREATE
                      })}
                      values={this.props.questionnaireTemplates.map(questionnaireTemplate =>
                          <AdminGameQuestionnaireTemplateListItem
                              questionnaireTemplate={questionnaireTemplate}
                              onEditClicked={() => this.setState({
                                  formVisible: true,
                                  formMode: FormMode.EDIT,
                                  form: questionnaireTemplate
                              })}
                              onDeleteClicked={() => this.props.onDeleteQuestionnaireTemplate(questionnaireTemplate)}
                              onDetailsClicked={() => this.props.onQuestionnaireTemplateDetailsClicked(questionnaireTemplate)}
                          />
                      )}
                />

                {
                    this.state.formVisible && (
                        this.state.formMode === FormMode.CREATE ?
                            <QuestionnaireTemplateForm
                                onSubmit={form => {
                                    this.setState({formVisible: false})
                                    this.props.onAddQuestionnaireTemplate(form)
                                }}
                            /> :
                            <QuestionnaireTemplateForm
                                initialState={this.state.form}
                                onSubmit={form => {
                                    this.setState({formVisible: false})
                                    this.props.onEditQuestionnaireTemplate(form)
                                }}
                            />
                    )
                }
            </div>
        )
    }
}