import React from "react";
import {connect} from "react-redux";
import {changeView, setActiveGame, setGames, updateGameForm} from "../../../data-layer/ActionCreators";
import {gameEditView, networkView, questionnaireCreationView, questionnaireRulesView} from "../../../Views";
import {httpDelete} from "../../../util/Http";
import {deleteGame} from "../../../util/Parameters";

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
        updateGameForm: game => dispatch(updateGameForm(game))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(function (props) {

    function onEditClicked() {
        props.updateGameForm(props.activeGame)
        props.changeView(gameEditView)
    }

    function onDeleteClicked() {
        if (window.confirm("Удалить игру?")) {
            httpDelete(deleteGame(props.activeGame.id), () => {
                props.growl.show({severity: "info", summary: "Игра архивирована."})
                props.setGames(props.games.filter(it => it.id !== props.activeGame.id))
                props.changeView(networkView)
            })
        }
    }

    return (
        <div className={"game-view"}>
            <div className={"game-info"}>
                <img className={"game-info-img"}
                     src={props.activeGame.imgSrc}
                />
                <div className={"game-name"}>{props.activeGame.title}</div>
                <div className={"game-description"}>{props.activeGame.description}
                </div>
                <div className={"mobile-button"}>Присоединиться к игре</div>
                <div className={"mobile-button"}
                     onClick={() => props.changeView(questionnaireRulesView)}>
                    Создать шаблон анкеты
                </div>
                <div className={"mobile-button"}
                     onClick={() => onEditClicked()}>
                    Редактировать
                </div>
                <div className={"mobile-button"}
                     onClick={() => onDeleteClicked()}>
                    Удалить
                </div>
            </div>
        </div>
    )
})