import React from "react";
import {connect} from "react-redux"
import FormViewStyle from "../../../../styles/FormViewStyle";
import ViewInfo from "../../../Common/Constructions/ViewInfo";
import {get, httpDelete, post, put} from "../../../../util/Http";
import {
    deleteQuestionnaireTemplateFieldUrl,
    deleteSkillCategoryToPointsUrl,
    editQuestionnaireTemplateFieldUrl,
    questionnaireTemplateByIdUrl,
    saveQuestionnaireTemplateFieldUrl,
    saveSkillCategoryToPointsUrl
} from "../../../../util/Parameters";
import {changeView} from "../../../../data-layer/ActionCreators";
import Popup from "../../../../util/Popup";
import Btn from "../../../Common/Buttons/Btn";
import {adminGameView} from "../../../../Views";
import QuestionnaireTemplateFieldsComponent from "../Component/QuestionnaireTemplateFieldsComponent";
import SkillCategoryToPointsComponent from "../Component/SkillCategoryToPointsComponent";

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

            back: () => dispatch(changeView(adminGameView))
        }
    }
)(class QuestionnaireTemplateView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            fields: [],
            skillCategoryToPoints: []
        }

        get(questionnaireTemplateByIdUrl(props.questionnaireTemplate.id), rs => this.setState(rs))
    }

    render() {
        return (
            <div style={FormViewStyle}>
                <ViewInfo
                    img={this.state.img}
                    name={this.state.name}
                    description={this.state.description}
                />

                <QuestionnaireTemplateFieldsComponent fields={this.state.fields}
                                                      onAddField={form => this.onAddField(form)}
                                                      onEditField={form => this.onEditField(form)}
                                                      onDeleteField={field => this.onDeleteField(field)}
                />


                <SkillCategoryToPointsComponent
                    gameId={this.props.gameId}
                    skillCategoryToPoints={this.state.skillCategoryToPoints}
                    onAddSkillCategoryToPoints={form => this.onAddSkillCategoryToPoints(form)}
                    onDeleteSkillCategoryToPoints={skillCategoryToPoints => this.onDeleteSkillCategoryToPoints(skillCategoryToPoints)}
                />

                <Btn text={"Назад"} onClick={() => this.props.back()}/>
            </div>
        )
    }

    onAddField(form) {
        post(saveQuestionnaireTemplateFieldUrl(this.state.id), form, rs => {
            this.setState(state => ({fields: state.fields.concat(rs)}))
            Popup.info("Поле добавлено.")
        })
    }

    onEditField(form) {
        put(editQuestionnaireTemplateFieldUrl(form.id), form, rs => {
            this.setState(state => ({fields: state.fields.filter(v => v.id !== rs.id).concat(rs)}))
            Popup.info("Поле обновлено.")
        })
    }

    onDeleteField(form) {
        httpDelete(deleteQuestionnaireTemplateFieldUrl(form.id), rs => {
            this.setState(state => ({fields: state.fields.filter(v => v.id !== rs.id)}))
            Popup.info("Поле удалено.")
        })
    }

    onAddSkillCategoryToPoints(form) {
        post(saveSkillCategoryToPointsUrl(this.state.id), form, rs => {
            this.setState(state => ({skillCategoryToPoints: state.skillCategoryToPoints.concat(rs)}))
            Popup.info("Распределение добавлено.")
        })
    }

    onDeleteSkillCategoryToPoints(form) {
        httpDelete(deleteSkillCategoryToPointsUrl(form.id), rs => {
            this.setState(state => ({skillCategoryToPoints: state.skillCategoryToPoints.filter(v => v.id !== rs.id)}))
            Popup.info("Распределение удалено.")
        })
    }
})