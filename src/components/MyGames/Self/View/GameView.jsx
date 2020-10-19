import React from "react";
import {connect} from "react-redux"
import {get} from "../../../../util/Http";
import {
    findAllQuestionnairesByGameIdUrl,
    findQuestionnaireTemplatesByGameId,
    gameByIdUrl,
    questionnaireTemplateByIdUrl
} from "../../../../util/Parameters";
import {
    changeView,
    setActiveGame,
    setActiveQuestionnaire,
    setActiveQuestionnaireTemplate
} from "../../../../data-layer/ActionCreators";
import ViewInfo from "../../../Common/Constructions/ViewInfo";
import Btn from "../../../Common/Buttons/Btn";
import {characterListView, myGamesView, questionnaireDisclaimerView, questionnaireReviewView} from "../../../../Views";
import FormViewStyle from "../../../../styles/FormViewStyle";
import List from "../../../Common/Lists/List";
import ExpandableListItemWithBullets from "../../../Common/ListElements/ExpandableListItemWithBullets";
import QuestionnaireStatus from "../../../../data-layer/enums/QuestionnaireStatus";
import FormatDate from "../../../../util/FormatDate";

export default connect(
    state => ({
        game: state.activeGame
    }),
    null,
    (stateProps, dispatchProps, ownProps) => {
        const {dispatch} = dispatchProps

        return {
            ...stateProps,
            ...ownProps,

            setActiveGame: game => dispatch(setActiveGame(game)),
            toFillingQuestionnaire: questionnaireTemplate => {
                get(questionnaireTemplateByIdUrl(questionnaireTemplate.id), rs => dispatch(setActiveQuestionnaireTemplate(rs)))
                dispatch(changeView(questionnaireDisclaimerView))
            },
            toQuestionnaireReviewView: (questionnaire) => {
                dispatch(setActiveQuestionnaire(questionnaire))
                dispatch(changeView(questionnaireReviewView))
            },
            toCharacterList: () => {
                dispatch(changeView(characterListView))
            },
            back: () => dispatch(changeView(myGamesView))
        }
    }
)(class GameView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            game: {},
            questionnaireTemplates: [],
            questionnaires: []
        }

        get(gameByIdUrl(this.props.game.id), rs => {
            this.setState({game: rs})
            this.props.setActiveGame(rs)
        })
        get(findQuestionnaireTemplatesByGameId(this.props.game.id), rs => this.setState({questionnaireTemplates: rs}))
        get(findAllQuestionnairesByGameIdUrl(this.props.game.id), rs => this.setState({questionnaires: rs}))
    }

    render() {
        return (
            <div style={FormViewStyle}>
                <ViewInfo img={this.state.game.img}
                          name={this.state.game.title}
                          description={this.state.game.imgSrc}
                />

                <List title={"Шаблоны анкет:"}
                      noItemsText={"Пусто.."}
                      values={this.state.questionnaireTemplates.map(questionnaireTemplate =>
                      <ExpandableListItemWithBullets
                          name={questionnaireTemplate.name}
                          img={questionnaireTemplate.img}
                          description={questionnaireTemplate.description}
                          detailsButtonText={"Заполнить"}
                          onDetailsClicked={() => this.props.toFillingQuestionnaire(questionnaireTemplate)}
                          alwaysExpand={true}
                          key={questionnaireTemplate.id}
                      />
                      )}
                />

                <List title={"Анкеты игроков:"}
                      noItemsText={"Отсутствуют.."}
                      values={this.state.questionnaires.map(questionnaire =>
                      <ExpandableListItemWithBullets
                          name={questionnaire.template.name}
                          img={questionnaire.template.img}
                          description={questionnaire.template.description}
                          bullets={[
                              "Автор: " + questionnaire.author.fullName,
                              "Дата создания: " + FormatDate(new Date(questionnaire.creationDate)),
                              "Статус: " + QuestionnaireStatus.getLabel(questionnaire.status),
                              "Дата изменения статуса: " + FormatDate(new Date(questionnaire.statusChangeDate))
                          ]}
                          onDetailsClicked={() => this.props.toQuestionnaireReviewView(questionnaire)}

                          alwaysExpand={true}
                          key={questionnaire.key}
                      />
                      )}
                />

                <Btn text={"Лист персонажа"} onClick={() => this.props.toCharacterList()}/>
                <Btn text={"Назад"} onClick={() => this.props.back()}/>
            </div>
        )
    }
})