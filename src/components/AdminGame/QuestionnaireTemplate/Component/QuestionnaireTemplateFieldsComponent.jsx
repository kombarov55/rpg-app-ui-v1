import React from "react";
import InputLabel from "../../../Common/Labels/InputLabel";
import List from "../../../Common/Lists/List";
import FormMode from "../../../../data-layer/enums/FormMode";
import QuestionnaireTemplateFieldListItem from "../../../ListItem/QuestionnaireTemplateFieldListItem";
import QuestionnaireTemplateFieldForm from "../Form/QuestionnaireTemplateFieldForm";

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
                <InputLabel text={`Поле "Имя" уже включено в анкету.`}/>

                <List title={"Поля анкеты:"}
                      isAddButtonVisible={!this.state.formVisible}
                      onAddClicked={() => this.setState({
                          formVisible: true,
                          formMode: FormMode.CREATE
                      })}
                      values={this.props.fields.map(field =>
                          <QuestionnaireTemplateFieldListItem
                              field={field}
                              onEditClicked={() => this.setState({
                                  formVisible: true,
                                  formMode: FormMode.EDIT,
                                  form: field
                              })}
                              onDeleteClicked={() => this.props.onDeleteField(field)}
                          />
                      )}
                />
                {
                    this.state.formVisible && (
                        this.state.formMode === FormMode.CREATE ?
                            <QuestionnaireTemplateFieldForm
                                onSubmit={form => {
                                    this.setState({formVisible: false})
                                    this.props.onAddField(form)
                                }}
                            /> :
                            <QuestionnaireTemplateFieldForm
                                initialState={this.state.form}
                                onSubmit={form => {
                                    this.setState({formVisible: false})
                                    this.props.onEditField(form)
                                }}
                            />
                    )
                }
            </div>
        )
    }
}