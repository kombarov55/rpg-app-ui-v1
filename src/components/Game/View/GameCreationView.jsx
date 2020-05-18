import React, {useState} from "react";
import {connect} from "react-redux";
import {InputTextarea} from "primereact/inputtextarea";
import {
    changeView,
    setGames,
    updateCommentForm,
    updateCurrencyForm,
    updateGameForm
} from "../../../data-layer/ActionCreators";
import {post} from "../../../util/Http";
import {gameByNetworkId, gameBySubnetworkId, gamesUrl} from "../../../util/Parameters";
import {adminPageView, networkView, subnetworkView} from "../../../Views";
import Globals from "../../../util/Globals";
import ListInput from "../../Common/ListInput";
import GameCreationMode from "../../../data-layer/enums/GameCreationMode";
import DefaultFormValues from "../../../data-layer/DefaultFormValues";
import CurrencyForm from "../CurrencyForm";
import Label from "../../Common/Label";
import AddItemButton from "../../Common/AddItemButton";
import InputLabel from "../../Common/InputLabel";

function mapStateToProps(state, props) {
    return {
        gameForm: state.gameForm,
        activeNetwork: state.activeNetwork,
        activeSubnetwork: state.activeSubnetwork,
        games: state.games,
        growl: state.growl,
        currencyForm: state.currencyForm
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        updateGameForm: fieldNameToValue => dispatch(updateGameForm(fieldNameToValue)),
        changeView: view => dispatch(changeView(view)),
        setGames: games => dispatch(setGames(games)),
        updateCurrencyForm: fieldNameToValue => dispatch(updateCurrencyForm(fieldNameToValue))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(function (props) {

    const [currencyForm, setCurrencyForm] = useState({
        visible: false
    })

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

    function onAddCurrencyFormClicked() {
        props.updateCurrencyForm({visible: true})
    }

    function save() {
        let url
        let nextView

        switch (Globals.gameCreationMode) {
            case GameCreationMode.OPEN:
                url = gamesUrl
                nextView = adminPageView
                break

            case GameCreationMode.BY_NETWORK:
                url = gameByNetworkId(props.activeNetwork.id)
                nextView = networkView
                break

            case GameCreationMode.BY_SUBNETWORK:
                url = gameBySubnetworkId(props.activeGame.id, props.activeSubnetwork.id)
                nextView = subnetworkView
                break;
        }


        post(url, props.gameForm, rs => {
            props.setGames(props.games.concat(rs))
            props.updateGameForm(DefaultFormValues.gameForm)
            props.changeView(nextView)
            props.growl.show({severity: "info", summary: "Игра создана"})
        })
    }

    return (
        <div className={"game-creation-view"}>
            <InputLabel text={"Название:"}/>
            <input className={"game-creation-view-input"}
                   value={props.gameForm.title}
                   onChange={e => props.updateGameForm({title: e.target.value})}
            />

            <InputLabel text={"Картинка:"}/>
            <input type={"file"}/>

            <InputLabel text={"Описание:"}/>
            <InputTextarea autoResize={true}
                           rows={10}
                           value={props.gameForm.description}
                           onChange={e => props.updateGameForm({description: e.target.value})}
            />
            <InputLabel text={"Валюта: (макс. 3)"}/>
            {
                props.currencyForm.visible &&
                <CurrencyForm/>
            }
            {
                !props.currencyForm.visible &&
                <AddItemButton text={"Добавить валюту"}
                               onClick={() => onAddCurrencyFormClicked()}
                />
            }

            <InputLabel text={"Тип навыка:"}/>
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