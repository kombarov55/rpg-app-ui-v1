import React from "react";
import {connect} from "react-redux";
import {InputTextarea} from "primereact/inputtextarea";
import {
    changeView,
    setActiveGame,
    setGames,
    updateCurrencyForm,
    updateGameForm
} from "../../../data-layer/ActionCreators";
import {put} from "../../../util/Http";
import {editGameByNetworkId, editGamebySubnetworkId, gameByNetworkId, gamesUrl, gameUrl} from "../../../util/Parameters";
import {adminPageView, gameView, networkView, subnetworkView} from "../../../Views";
import ListInput from "../../Common/ListInput";
import Globals from "../../../util/Globals";
import GameCreationMode from "../../../data-layer/enums/GameCreationMode";
import DefaultFormValues from "../../../data-layer/DefaultFormValues";
import InputLabel from "../../Common/InputLabel";
import NoItemsLabel from "../../Common/NoItemsLabel";
import ListItemSmall from "../../Common/ListItemSmall";
import CurrencyForm from "../CurrencyForm";
import AddItemButton from "../../Common/AddItemButton";

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
        setActiveGame: game => dispatch(setActiveGame(game)),
        updateCurrencyForm: fieldNameToValue => dispatch(updateCurrencyForm(fieldNameToValue))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(function (props) {

    function onCurrencyFormSubmit() {
        props.updateGameForm({
            currencies: props.gameForm.currencies.slice().concat(props.currencyForm)
        })

        props.updateCurrencyForm(DefaultFormValues.currencyForm)
    }

    function onAddCurrencyFormClicked() {
        props.updateCurrencyForm({visible: true})
    }

    function onAddSkillTypeClicked(value) {
        props.updateGameForm({skillTypes: props.gameForm.skillTypes.filter(it => it !== value).concat(value)})
        props.updateGameForm({skillTypeInput: ""})
    }

    function onDeleteSkillTypeClicked(value) {
        props.updateGameForm({skillTypes: props.gameForm.skillTypes.filter(it => it !== value)})
    }

    function onSaveClicked() {
        let url

        switch (Globals.gameCreationMode) {
            case GameCreationMode.OPEN:
                url = gameUrl(props.gameForm.id)
                break;
            case GameCreationMode.BY_NETWORK:
                url = editGameByNetworkId(props.activeNetwork.id, props.gameForm.id)
                break;
            case GameCreationMode.BY_SUBNETWORK:
                url= editGamebySubnetworkId(props.activeNetwork.id, props.activeSubnetwork.id, props.gameForm.id)
                break;

        }

        put(url, props.gameForm, rs => {
            props.growl.show({severity: "info", summary: "Игра обновлена"})
            props.setGames(props.games.filter(it => it.id !== rs.id).concat(rs))
            props.updateGameForm(DefaultFormValues.gameForm)
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
            <InputLabel text={"Валюта: (макс. 3)"}/>

            <div className={"list"}>
                {props.gameForm.currencies.length === 0 ?
                    <NoItemsLabel text={"Нет валют"}/> :
                    props.gameForm.currencies.map(currency =>
                        <ListItemSmall text={currency.name} subtext={currency.priceInActivityPoints}/>
                    )
                }

            </div>

            {
                props.currencyForm.visible &&
                <CurrencyForm
                    onSubmit={() => onCurrencyFormSubmit()}
                />
            }
            {
                !props.currencyForm.visible &&
                <AddItemButton text={"Добавить валюту"}
                               onClick={() => onAddCurrencyFormClicked()}
                />
            }

            <div className={"game-creation-view-label"}>Тип навыка: </div>
            <ListInput
                value={props.gameForm.skillTypeInput}
                onChange={e => props.updateGameForm({skillTypeInput: e.target.value})}
                values={props.gameForm.skillTypes}
                onSubmit={value => onAddSkillTypeClicked(value)}
                onDelete={value => onDeleteSkillTypeClicked(value)}
                deleteOnlyNew={true}
            />
            <div className={"game-creation-save-button"}
                 onClick={() => onSaveClicked()}>
                Сохранить
            </div>
        </div>
    )
})