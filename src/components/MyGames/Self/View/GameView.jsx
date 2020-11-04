import React from "react";
import {connect} from "react-redux"
import {get} from "../../../../util/Http";
import {
    findAllQuestionnairesByGameIdUrl,
    findOrganizationsShortByGameIdUrl,
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
import {
    characterListView,
    merchandiseView,
    myGamesView,
    questionnaireDisclaimerView,
    questionnaireReviewView
} from "../../../../Views";
import FormViewStyle from "../../../../styles/FormViewStyle";
import List from "../../../Common/Lists/List";
import ExpandableListItemWithBullets from "../../../Common/ListElements/ExpandableListItemWithBullets";
import QuestionnaireStatus from "../../../../data-layer/enums/QuestionnaireStatus";
import FormatDate from "../../../../util/FormatDate";
import StorageComponent from "../Component/StorageComponent";
import getOrDefault from "../../../../util/getOrDefault";
import Popup from "../../../../util/Popup";

export default connect(
    state => ({
        game: state.activeGame,
        activeCharacter: getOrDefault(state.userAccount.gameToActiveCharacter.find(it => it.game.id === state.activeGame.id), {activeCharacter: {}}).activeCharacter
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
            toMerchandiseView: () => {
                dispatch(changeView(merchandiseView, {
                    gameId: stateProps.game.id
                }))
            },
            back: () => dispatch(changeView(myGamesView))
        }
    }
)(class GameView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            game: {
                itemsForSale: []
            },
            organizations: [],
            questionnaireTemplates: [],
            questionnaires: [],
        }

        this.refreshGame()
        get(findQuestionnaireTemplatesByGameId(this.props.game.id), rs => this.setState({questionnaireTemplates: rs}))
        get(findAllQuestionnairesByGameIdUrl(this.props.game.id), rs => this.setState({questionnaires: rs}))
        get(findOrganizationsShortByGameIdUrl(this.props.game.id), rs => this.setState({organizations: []}))
        if (this.props.activeCharacter != null) {
            Popup.info(`Вы совершаете действия от лица персонажа ${this.props.activeCharacter.name}`)
        } else {
            Popup.error("Выберите активного персонажа для этой игры в разделе 'Кабинет'")
        }
    }

    render() {
        return (
            <div style={FormViewStyle}>
                <ViewInfo img={this.state.game.img}
                          name={this.state.game.title}
                          description={this.state.game.imgSrc}
                />

                <List title={"Организации:"}
                      noItemsText={"Пусто.."}
                      values={this.state.organizations.map(organization =>
                          <ExpandableListItemWithBullets
                              img={organization.img}
                              name={organization.name}
                              description={organization.description}
                              bullets={[`Тип: ${organization.type}`]}
                              onDetailsClicked={() => alert("click")}


                              alwaysExpand={true}
                              key={organization.id}
                          />
                      )}
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

                <StorageComponent gameId={this.props.game.id}
                                  characterId={this.props.activeCharacter.id}
                                  currencies={this.props.game.currencies}
                                  items={this.state.game.itemsForSale}
                                  purchaseVisible={this.props.activeCharacter != null}
                                  onItemForSaleAdded={() => this.refreshGame()}
                />
                <Btn text={"Товары"} onClick={() => this.props.toMerchandiseView()}/>
                {
                    this.props.activeCharacter != null &&
                    <Btn text={"Лист персонажа"} onClick={() => this.props.toCharacterList()}/>
                }

                <Btn text={"Назад"} onClick={() => this.props.back()}/>
            </div>
        )
    }

    refreshGame() {
        get(gameByIdUrl(this.props.game.id), rs => {
            this.setState({game: rs})
            this.props.setActiveGame(rs)
        })
    }
})