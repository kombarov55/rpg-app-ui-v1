import React from "react";
import {connect} from "react-redux"
import {get, post} from "../../../../util/Http";
import {
    findAllQuestionnairesByGameIdUrl,
    findOrganizationsShortByGameIdUrl,
    findQuestionnaireTemplatesByGameId,
    gameByIdUrl,
    purchaseFromGameUrl,
    questionnaireTemplateByIdUrl,
    setItemForSaleInGameUrl
} from "../../../../util/Parameters";
import {
    changeView,
    setActiveGame,
    setActiveOrganization,
    setActiveQuestionnaire,
    setActiveQuestionnaireTemplate
} from "../../../../data-layer/ActionCreators";
import ViewInfo from "../../../Common/Constructions/ViewInfo";
import Btn from "../../../Common/Buttons/Btn";
import {
    characterListView,
    characterSelectionView,
    myGamesView,
    organizationDetailsView,
    questionnaireDisclaimerView,
    questionnaireReviewView
} from "../../../../Views";
import FormViewStyle from "../../../../styles/FormViewStyle";
import List from "../../../Common/Lists/List";
import ExpandableListItemWithBullets from "../../../Common/ListElements/ExpandableListItemWithBullets";
import QuestionnaireStatus from "../../../../data-layer/enums/QuestionnaireStatus";
import FormatDate from "../../../../util/FormatDate";
import Popup from "../../../../util/Popup";
import OrganizationType from "../../../../data-layer/enums/OrganizationType";
import StorageComponent from "../Component/StorageComponent";

export default connect(
    state => ({
        game: state.activeGame,
        activeCharacter: state.activeCharacter
    }),
    null,
    (stateProps, dispatchProps, ownProps) => {
        const {dispatch} = dispatchProps

        return {
            ...stateProps,
            ...ownProps,

            setActiveGame: game => dispatch(setActiveGame(game)),
            toOrganizationView: organization => {
                dispatch(setActiveOrganization(organization))
                dispatch(changeView(organizationDetailsView))
            },
            toFillingQuestionnaire: questionnaireTemplate => {
                get(questionnaireTemplateByIdUrl(questionnaireTemplate.id), rs => dispatch(setActiveQuestionnaireTemplate(rs)))
                dispatch(changeView(questionnaireDisclaimerView))
            },
            toQuestionnaireReviewView: (questionnaire) => {
                dispatch(setActiveQuestionnaire(questionnaire))
                dispatch(changeView(questionnaireReviewView))
            },
            toCharacterSelectionView: () => dispatch(changeView(characterSelectionView)),
            back: () => dispatch(changeView(myGamesView))
        }
    }
)(class GameView extends React.Component {

    constructor(props) {
        super(props);

        if (this.props.activeCharacter == null || this.props.activeCharacter?.game?.id !== this.props.game.id) {
            Popup.info("Выберите персонажа")
            this.props.toCharacterSelectionView()
        }

        this.state = {
            game: {
                itemsForSale: [],
                currencies: []
            },
            organizations: [],
            questionnaireTemplates: [],
            questionnaires: [],
        }

        this.refreshGame()
        get(findQuestionnaireTemplatesByGameId(this.props.game.id), rs => this.setState({questionnaireTemplates: rs}))
        get(findAllQuestionnairesByGameIdUrl(this.props.game.id), rs => this.setState({questionnaires: rs}))
        get(findOrganizationsShortByGameIdUrl(this.props.game.id), rs => this.setState({organizations: rs}))
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
                              bullets={[`${OrganizationType.getLabelByName(organization.type)}`]}
                              onDetailsClicked={() => this.props.toOrganizationView(organization)}


                              alwaysExpand={true}
                              key={organization.id}
                          />
                      )}
                />

                <StorageComponent gameId={this.state.game.id}
                                  items={this.state.game.itemsForSale}
                                  currencyNames={this.state.game.currencies.map(v => v.name)}
                                  characterId={this.props.activeCharacter?.id}
                                  purchaseVisible={this.props.activeCharacter != null}
                                  onItemForSaleAdded={itemForSale => this.onItemForSaleAdded(itemForSale)}
                                  onItemPurchase={(balanceId, itemForSale) => this.onItemPurchase(balanceId, itemForSale)}
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

                <Btn text={"Назад"} onClick={() => this.props.back()}/>
            </div>
        )
    }

    refreshGame(then = () => {
    }) {
        get(gameByIdUrl(this.props.game.id), rs => {
            this.setState({game: rs})
            this.props.setActiveGame(rs)
            then()
        })
    }

    onItemForSaleAdded(itemForSale) {
        post(setItemForSaleInGameUrl, {
            itemTemplateId: itemForSale.itemTemplate.id,
            price: itemForSale.price,
            gameId: this.state.game.id
        }, () => this.refreshGame(() => Popup.info("Товар добавлен на продажу в базу.")))
    }

    onItemPurchase(balanceId, itemForSale) {
        post(purchaseFromGameUrl, {
                itemForSaleId: itemForSale.id,
                gameId: this.state.game.id,
                characterId: this.props.activeCharacter.id,
                balanceId: balanceId
            },
            () => this.refreshGame(() => Popup.info(`${itemForSale.item.name} приобретён и передан активному персонажу.'`)),
            rs => Popup.error(rs.message))
    }
})