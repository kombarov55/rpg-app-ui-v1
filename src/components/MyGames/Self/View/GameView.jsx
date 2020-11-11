import React from "react";
import {connect} from "react-redux"
import {get, post} from "../../../../util/Http";
import {
    findAllQuestionnairesByGameIdUrl,
    findOrganizationsShortByGameIdUrl,
    findQuestionnaireTemplatesByGameId,
    gameByIdUrl, purchaseFromGameUrl,
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
    merchandiseView,
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
import GetActiveCharacterFromStore from "../../../../util/GetActiveCharacterFromStore";
import StorageComponent from "../Component/StorageComponent";

export default connect(
    state => ({
        game: state.activeGame,
        activeCharacter: GetActiveCharacterFromStore(state)
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
                                  characterId={this.props.activeCharacter?.id}
                                  purchaseVisible={this.props.activeCharacter != null}
                                  currencyNames={this.state.game.currencies.map(v => v.name)}
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

                {/*
                <StorageComponent gameId={this.props.game.id}
                                  characterId={this.props.activeCharacter.id}
                                  currencies={this.props.game.currencies}
                                  items={this.state.game.itemsForSale}
                                  purchaseVisible={this.props.activeCharacter != null}
                                  onItemForSaleAdded={() => this.refreshGame()}
                                  onItemPurchase={(balanceId, price, itemForSale) => {
                                      ShopProcedures.
                                      purchaseFromGameShop(balanceId, price, this.props.activeCharacter.id, this.props.game.id, itemForSale.merchandise.id, () => {
                                          this.refreshGame(() => Popup.success(`Вы приобрели "${itemForSale.merchandise.name}"!`))
                                      })
                                  }}
                />
                */}
                <Btn text={"Товары"} onClick={() => this.props.toMerchandiseView()}/>
                {
                    this.props.activeCharacter != null &&
                    <Btn text={"Лист персонажа"} onClick={() => this.props.toCharacterList()}/>
                }

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
            merchandiseId: itemForSale.merchandise.id,
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
            () => this.refreshGame(() => Popup.info(`${itemForSale.merchandise.name} приобретён и передан активному персонажу.'`)),
            rs => Popup.error(rs.message))
    }
})