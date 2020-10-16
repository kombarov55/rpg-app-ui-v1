import React from "react";
import {connect} from "react-redux"
import FormViewStyle from "../../../../styles/FormViewStyle";
import ViewInfo from "../../../Common/Constructions/ViewInfo";
import List from "../../../Common/Lists/List";
import ExpandableListItemWithBullets from "../../../Common/ListElements/ExpandableListItemWithBullets";
import FormMode from "../../../../data-layer/enums/FormMode";

export default connect(
    state => ({
        questionnaireTemplate: state.activeQuestionnaireTemplate
    }),
    null,
    (stateProps, dispatchProps, ownProps) => {
        const {dispatch} = dispatchProps

        return {
            ...stateProps,
            ...ownProps
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
                              img={field.img}
                              name={field.name}
                              description={field.description}
                              bullets={[
                                  "Тип: " + field.type
                              ]}
                          />
                      )}
                />
            </div>
        )
    }
})