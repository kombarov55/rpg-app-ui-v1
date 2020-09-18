import React from "react";
import {connect} from "react-redux";
import {
    changeView, setActiveGame,
    setGames,
    updateActiveGame,
    updateGameForm,
    updateQuestionnaireTemplateForm
} from "../../../data-layer/ActionCreators";
import {
    adminPageView,
    conversionView,
    currencyFormView,
    gameEditView, merchandiseView,
    networkView,
    questionnaireRulesView,
    shopCreationView,
    shopView, skillCategoryEditView,
    skillCategoryFormView, skillCategoryView,
    subnetworkView
} from "../../../Views";
import {httpDelete} from "../../../util/Http";
import {deleteGameUrl, shopByIdUrl, skillCategoryUrl} from "../../../util/Parameters";
import Btn from "../../Common/Buttons/Btn";
import Preload from "../../../util/Preload";
import Globals from "../../../util/Globals";
import GameCreationMode from "../../../data-layer/enums/GameCreationMode";
import DefaultFormValues from "../../../data-layer/DefaultFormValues";
import QuestionnaireTemplateFormMode from "../../../data-layer/enums/QuestionnaireTemplateFormMode";
import List from "../../Common/Lists/List";
import SmallEditableListItem from "../../Common/ListElements/SmallEditableListItem";
import FormType from "../../../data-layer/enums/FormMode";
import ExpandableListItemWithButtons from "../../Common/ListElements/ExpandableListItemWithButtons";
import Popup from "../../../util/Popup";

function mapStateToProps(state, props) {
    return {
        activeGame: state.activeGame,
        games: state.games,
        growl: state.growl
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeView: (view, params = {}) => dispatch(changeView(view, params)),
        setGames: games => dispatch(setGames(games)),
        updateGameForm: game => dispatch(updateGameForm(game)),
        updateActiveGame: fieldNameToValue => dispatch(updateActiveGame(fieldNameToValue)),
        updateQuestionnaireTemplateForm: fieldNameToValue => dispatch(updateQuestionnaireTemplateForm(fieldNameToValue)),
        setActiveGame: game => dispatch(setActiveGame(game))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(function (props) {

    function onEditClicked() {
        props.updateGameForm(props.activeGame)
        props.changeView(gameEditView)
    }

    function onDeleteClicked() {
        if (window.confirm("Удалить игру?")) {
            httpDelete(deleteGameUrl(props.activeGame.id), () => {
                Popup.info("Игра архивирована.")
                props.setGames(props.games.filter(it => it.id !== props.activeGame.id))
                onBackClicked()
            })
        }
    }

    function onBackClicked() {
        switch (Globals.gameCreationMode) {
            case GameCreationMode.OPEN:
                props.changeView(adminPageView)
                break
            case GameCreationMode.BY_NETWORK:
                props.changeView(networkView)
                break
            case GameCreationMode.BY_SUBNETWORK:
                props.changeView(subnetworkView)
                break
        }
    }

    function onMerchandiseClicked() {
        props.changeView(merchandiseView, {
            gameId: props.activeGame.id
        })
    }

    function onAddQuestionnaireTemplateClicked() {
        Globals.questionnaireTemplateFormMode = QuestionnaireTemplateFormMode.CREATE
        props.updateQuestionnaireTemplateForm(DefaultFormValues.questionnaireTemplateForm)
        props.changeView(questionnaireRulesView)
    }

    function onConversionClicked() {
        Preload.conversionView(props.activeGame.id)
        props.changeView(conversionView)
    }

    function onMerchandiseButtonClicked() {
        props.changeView()
    }

    function onAddCurrencyClicked() {
        props.changeView(currencyFormView, {
            formType: FormType.CREATE
        })
    }

    function onEditCurrencyClicked(currency) {
        props.changeView(currencyFormView, {
            formType: FormType.EDIT,
            formState: currency
        })
    }

    function onAddSkillCategoryClicked() {
        props.changeView(skillCategoryFormView)
    }

    function onAddShopClicked() {
        props.changeView(shopCreationView)
    }

    function onShopClicked(shop) {
        console.log(shop)
        props.changeView(shopView, {
            shop: shop
        })
    }

    function onShopDeleted(shop) {
        httpDelete(shopByIdUrl(shop.id), rs => {
            props.setActiveGame(Object.assign({}, props.activeGame, {
                shops: props.activeGame.shops.filter(v => v.id !== rs.id)
            }))
            Popup.info("Магазин удалён")
        }, () => Popup.error("Ошибка при удалении магазина. Обратитесь к Администратору."))
    }

    function onDeleteSkillCategoryClicked(skillCategory) {
        httpDelete(skillCategoryUrl(skillCategory.id), rs => {
            Popup.info("Категория навыка удалена")
            props.setActiveGame(Object.assign({}, props.activeGame, {
                skillCategories: props.activeGame.skillCategories.filter(v => v.id !== rs.id)
            }))
        })
    }

    function onSkillCategoryDetailsClicked(skillCategory) {
        props.changeView(skillCategoryView, {
            skillCategory: skillCategory
        })
    }

    return (
        <div className={"game-view"}>
            <div className={"game-info"}>
                <img className={"game-info-img"}
                     src={props.activeGame.imgSrc}
                />
                <div className={"game-name"}>{props.activeGame.title}</div>
                <div className={"game-description"}>{props.activeGame.description}</div>
                <div className={"game-description"}><a href={props.activeGame.groupLink}>Ссылка на группу</a></div>

                <List title={"Валюты: (макс. 3)"}
                      noItemsText={"Нет валют"}
                      values={props.activeGame.currencies.map(currency =>
                          <SmallEditableListItem text={currency.name}
                                                 onEditClicked={() => onEditCurrencyClicked(currency)}
                          />
                      )}
                      isAddButtonVisible={props.activeGame.currencies.length < props.activeGame.maxCurrenciesCount}
                      onAddClicked={() => onAddCurrencyClicked()}
                />

                <List title={"Категории навыков:"}
                      noItemsText={"Нет категорий навыков"}
                      values={props.activeGame.skillCategories.map(skillCategory =>
                          <ExpandableListItemWithButtons
                              img={skillCategory.img}
                              name={skillCategory.name}
                              description={skillCategory.description}
                              onDeleteClicked={() => onDeleteSkillCategoryClicked(skillCategory)}
                              onDetailsClicked={() => onSkillCategoryDetailsClicked(skillCategory)}
                          />
                      )}
                      onAddClicked={() => onAddSkillCategoryClicked()}
                />

                <List title={"Магазины:"}
                      noItemsText={"Нет магазинов"}
                      values={props.activeGame.shops.map(shop =>
                          <ExpandableListItemWithButtons
                              img={shop.img}
                              name={shop.name}
                              onDetailsClicked={() => onShopClicked(shop)}
                              onDeleteClicked={() => onShopDeleted(shop)}
                          />
                      )}
                      onAddClicked={() => onAddShopClicked()}
                />

                <div className={"game-view-button-group"}>
                    <Btn text={"Товары"} onClick={() => onMerchandiseClicked()}/>
                    <Btn text={"Присоединиться к игре"}/>
                    <Btn text={"Создать шаблон анкеты"} onClick={() => onAddQuestionnaireTemplateClicked()}/>
                    <Btn text={"Настройки обмена валют"} onClick={() => onConversionClicked()}/>
                    <Btn text={"Товары"} onClick={() => onMerchandiseButtonClicked()}/>
                    <Btn text={"Редактировать"} onClick={() => onEditClicked()}/>
                    <Btn text={"Удалить"} onClick={() => onDeleteClicked()}/>
                    <Btn text={"Назад"} onClick={() => onBackClicked()}/>
                </div>
            </div>
        </div>
    )
})