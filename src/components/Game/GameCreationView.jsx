import React from "react";
import {connect} from "react-redux";
import {InputTextarea} from "primereact/inputtextarea";
import {changeView, setGames, updateGameForm} from "../../data-layer/ActionCreators";
import {post} from "../../util/Http";
import {gameByNetworkId, gameBySubnetworkId} from "../../util/Parameters";
import {networkView, subnetworkView} from "../../Views";
import Globals from "../../util/Globals";
import QuestionnaireInputList from "../QuestionnaireCreation/QuestionnaireInputList";
import ListInput from "../Common/ListInput";

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
        setGames: games => dispatch(setGames(games))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(function (props) {
    function onCurrencySubmitClicked(value) {
        if (value !== "") {
            props.updateGameForm({
                currencies: props.gameForm.currencies.filter(it => it != value).concat(value),
                currencyInput: ""
            })
        }
    }

    function onCurrencyDeleteClicked(value) {
        props.updateGameForm({currencies: props.gameForm.currencies.filter(it => it != value)})
    }

    function onSkillTypeSubmitClicked(value) {
        if (value !== "") {
            props.updateGameForm({
                skillTypes: props.gameForm.skillTypes.filter(it => it != value).concat(value),
                skillTypeInput: ""
            })
        }
    }

    function onSkillTypeDeleteClicked(value) {
        props.updateGameForm({skillTypes: props.gameForm.skillTypes.filter(it => it != value)})
    }

    function save() {
        const url = Globals.creatingGameByNetwork ?
            gameByNetworkId(props.activeNetwork.id) :
            gameBySubnetworkId(props.activeNetwork.id, props.activeSubnetwork.id);

        post(url, props.gameForm, rs => {
            props.setGames(props.games.concat(rs))
            props.updateGameForm({title: "", description: ""})
            props.changeView(Globals.creatingGameByNetwork ? networkView : subnetworkView)
            props.growl.show({severity: "info", summary: "Игра создана"})
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
            <div className={"game-creation-view-label"}>Валюта:</div>
            <ListInput
                value={props.gameForm.currencyInput}
                onChange={e => props.updateGameForm({currencyInput: e.target.value})}
                onSubmit={value => onCurrencySubmitClicked(value)}
                onDelete={value => onCurrencyDeleteClicked(value)}
                values={props.gameForm.currencies}
            />
            <div className={"game-creation-view-label"}>Тип навыка:</div>
            <ListInput
                value={props.gameForm.skillTypeInput}
                onChange={e => props.updateGameForm({skillTypeInput: e.target.value})}
                onSubmit={value => onSkillTypeSubmitClicked(value)}
                onDelete={value => onSkillTypeDeleteClicked(value)}
                values={props.gameForm.skillTypes}
            />
            <div className={"game-creation-save-button"}
                 onClick={() => save()}>
                Сохранить
            </div>
        </div>
    )
})