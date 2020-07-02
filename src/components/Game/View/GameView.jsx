import React from "react";
import {connect} from "react-redux";
import {
    changeView,
    setGames,
    updateActiveGame,
    updateGameForm,
    updateQuestionnaireTemplateForm
} from "../../../data-layer/ActionCreators";
import {
    adminPageView,
    conversionView,
    gameEditView,
    networkView,
    questionnaireRulesView,
    skillsView,
    subnetworkView
} from "../../../Views";
import {httpDelete} from "../../../util/Http";
import {deleteGameUrl} from "../../../util/Parameters";
import Btn from "../../Common/Btn";
import Preload from "../../../util/Preload";
import Globals from "../../../util/Globals";
import GameCreationMode from "../../../data-layer/enums/GameCreationMode";
import DefaultFormValues from "../../../data-layer/DefaultFormValues";
import QuestionnaireTemplateFormMode from "../../../data-layer/enums/QuestionnaireTemplateFormMode";
import List from "../../Common/List";
import ListItemSmallDeletable from "../../Common/ListItemSmallDeletable";
import FormTitleLabel from "../../Common/FormTitleLabel";
import {FormLabel} from "uikit-react";
import InputLabel from "../../Common/InputLabel";
import AddItemButton from "../../Common/AddItemButton";

function mapStateToProps(state, props) {
    return {
        activeGame: state.activeGame,
        games: state.games,
        growl: state.growl
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        changeView: view => dispatch(changeView(view)),
        setGames: games => dispatch(setGames(games)),
        updateGameForm: game => dispatch(updateGameForm(game)),
        updateActiveGame: fieldNameToValue => dispatch(updateActiveGame(fieldNameToValue)),
        updateQuestionnaireTemplateForm: fieldNameToValue => dispatch(updateQuestionnaireTemplateForm(fieldNameToValue))
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
                props.growl.show({severity: "info", summary: "Игра архивирована."})
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

    function onAddQuestionnaireTemplateClicked() {
        Globals.questionnaireTemplateFormMode = QuestionnaireTemplateFormMode.CREATE
        props.updateQuestionnaireTemplateForm(DefaultFormValues.questionnaireTemplateForm)
        props.changeView(questionnaireRulesView)
    }

    function onConversionClicked() {
        Preload.conversionView(props.activeGame.id)
        props.changeView(conversionView)
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

                <List title={"Валюты:"}
                      noItemsText={"Нет валют"}
                      values={props.activeGame.currencies.map(currency =>
                          <ListItemSmallDeletable text={currency.name}/>
                      )}
                />

                <List title={"Категории навыков:"}
                      noItemsText={"Нет категорий навыков"}
                />

                <div className={"game-view-button-group"}>
                    <Btn text={"Присоединиться к игре"}/>
                    <Btn text={"Создать шаблон анкеты"} onClick={() => onAddQuestionnaireTemplateClicked()}/>
                    <Btn text={"Настройки обмена валют"} onClick={() => onConversionClicked()}/>
                    <Btn text={"Редактировать"} onClick={() => onEditClicked()}/>
                    <Btn text={"Удалить"} onClick={() => onDeleteClicked()}/>
                    <Btn text={"Назад"} onClick={() => onBackClicked()}/>
                </div>
            </div>
        </div>
    )
})