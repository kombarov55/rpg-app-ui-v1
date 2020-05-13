import React from "react";
import {connect} from "react-redux";
import {InputTextarea} from "primereact/inputtextarea";
import {changeView, setActiveGame, setGames, updateGameForm} from "../../../data-layer/ActionCreators";
import {put} from "../../../util/Http";
import {editGameByNetworkId, editGamebySubnetworkId} from "../../../util/Parameters";
import {gameView} from "../../../Views";
import ListInput from "../../Common/ListInput";
import Globals from "../../../util/Globals";

function mapStateToProps(state, props) {
    return {
        gameForm: state.gameForm,
        activeNetwork: state.activeNetwork,
        activeSubnetwork: state.activeSubnetwork,
        games: state.games,
        growl: state.growl
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        updateGameForm: fieldNameToValue => dispatch(updateGameForm(fieldNameToValue)),
        changeView: view => dispatch(changeView(view)),
        setGames: games => dispatch(setGames(games)),
        setActiveGame: game => dispatch(setActiveGame(game))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(function (props) {

    function onAddCurrencyClicked(value) {
        if (props.currencyInput !== "") {
            props.updateGameForm({currencies: props.gameForm.currencies.filter(it => it !== value).concat(value)})
            props.updateGameForm({currencyInput: ""})
        }
    }

    function onDeleteCurrencyClicked(value) {
        props.updateGameForm({currencies: props.gameForm.currencies.filter(it => it !== value)})
    }

    function onAddSkillTypeClicked(value) {
        props.updateGameForm({skillTypes: props.gameForm.skillTypes.filter(it => it !== value).concat(value)})
        props.updateGameForm({skillTypeInput: ""})
    }

    function onDeleteSkillTypeClicked(value) {
        props.updateGameForm({skillTypes: props.gameForm.skillTypes.filter(it => it !== value)})
    }

    function onSaveClicked() {
        const url = Globals.creatingGameByNetwork ?
            editGameByNetworkId(props.activeNetwork.id) :
            editGamebySubnetworkId(props.activeNetwork.id, props.activeSubnetwork.id);

        put(url, props.gameForm, rs => {
            props.growl.show({severity: "info", summary: "Игра обновлена"})
            props.setGames(props.games.filter(it => it.id !== rs.id).concat(rs))
            props.setActiveGame(rs)
            props.changeView(gameView)
        })
    }

    return (
        <div className={"game-creation-view"}>
            <div className={"game-creation-view-label"}>Название:</div>
            <input className={"game-creation-view-input"}
                   value={props.gameForm.title}
                   onChange={e => props.updateGameForm({title: e.target.value})}
            />

            <div className={"game-creation-view-label"}>Картинка:</div>
            <input type={"file"}/>

            <div className={"game-creation-view-label"}>Описание:</div>
            <InputTextarea autoResize={true}
                           rows={10}
                           value={props.gameForm.description}
                           onChange={e => props.updateGameForm({description: e.target.value})}
            />
            <div className={"game-creation-view-label"}>Валюта: </div>
            <ListInput
                value={props.gameForm.currencyInput}
                onChange={e => props.updateGameForm({currencyInput: e.target.value})}
                values={props.gameForm.currencies}
                onSubmit={value => onAddCurrencyClicked(value)}
                onDelete={value => onDeleteCurrencyClicked(value)}
            />
            <div className={"game-creation-view-label"}>Тип навыка: </div>
            <ListInput
                value={props.gameForm.skillTypeInput}
                onChange={e => props.updateGameForm({skillTypeInput: e.target.value})}
                values={props.gameForm.skillTypes}
                onSubmit={value => onAddSkillTypeClicked(value)}
                onDelete={value => onDeleteSkillTypeClicked(value)}
            />
            <div className={"game-creation-save-button"}
                 onClick={() => onSaveClicked()}>
                Сохранить
            </div>
        </div>
    )
})