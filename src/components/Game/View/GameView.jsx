import React from "react";
import {connect} from "react-redux";
import {
    changeView,
    setActiveGame,
    setGames, updateActiveGame,
    updateGameForm,
    updateQuestionnaireTemplateForm
} from "../../../data-layer/ActionCreators";
import {
    adminPageView,
    gameEditView,
    networkView, questionnaireTemplateEditView,
    questionnaireRulesView,
    skillsView, subnetworkView, conversionView
} from "../../../Views";
import {get, httpDelete} from "../../../util/Http";
import {deleteGameUrl, questionnaireTemplateByIdUrl, questionnaireTemplateRestoreUrl} from "../../../util/Parameters";
import Btn from "../../Common/Btn";
import Preload from "../../../util/Preload";
import Globals from "../../../util/Globals";
import GameCreationMode from "../../../data-layer/enums/GameCreationMode";
import HorizontalListItem from "../../Common/HorizontalListItem";
import Label from "../../Common/Label";
import RestoreLabel from "../../Common/RestoreLabel";
import DefaultFormValues from "../../../data-layer/DefaultFormValues";
import QuestionnaireTemplateFormMode from "../../../data-layer/enums/QuestionnaireTemplateFormMode";
import NoItemsLabel from "../../Common/NoItemsLabel";

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

    function onQuestionnaireTemplateEditClicked(questionnaireTemplate) {
        Globals.questionnaireTemplateFormMode = QuestionnaireTemplateFormMode.EDIT
        Preload.questionnaireTemplateEditView(questionnaireTemplate.id)
        props.changeView(questionnaireTemplateEditView)
    }

    function onQuestionnaireTemplateDeleteClicked(questionnaireTemplate) {
        httpDelete(questionnaireTemplateByIdUrl(questionnaireTemplate.id))
        const updatedList = props.activeGame.questionnaireTemplates.slice()

        updatedList
            .find(it => it.id === questionnaireTemplate.id)
            .deleted = true

        props.updateActiveGame({
            questionnaireTemplates: updatedList
        })
        props.growl.show({severity: "info", summary: "Шаблон анкеты удалён"})
    }

    function onQuestionnaireTemplateRestoreClicked(questionnaireTemplate) {
        get(questionnaireTemplateRestoreUrl(questionnaireTemplate.id))
        const updatedList = props.activeGame.questionnaireTemplates.slice()

        updatedList
            .find(it => it.id === questionnaireTemplate.id)
            .deleted = false

        props.updateActiveGame({
            questionnaireTemplates: updatedList
        })

        props.growl.show({severity: "info", summary: "Шаблон анкеты восстановлен"})
    }

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

    function onSkillViewClicked() {
        props.changeView(skillsView)
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

                <div className={"game-view-button-group"}>
                    <Btn text={"Присоединиться к игре"}/>
                    <Btn text={"Создать шаблон анкеты"} onClick={() => onAddQuestionnaireTemplateClicked()}/>
                    <Btn text={"Навыки"} onClick={() => onSkillViewClicked()}/>
                    <Btn text={"Настройки обмена валют"} onClick={() => onConversionClicked()}/>
                    <Btn text={"Редактировать"} onClick={() => onEditClicked()}/>
                    <Btn text={"Удалить"} onClick={() => onDeleteClicked()}/>
                    <Btn text={"Назад"} onClick={() => onBackClicked()}/>
                </div>
            </div>
        </div>
    )
})