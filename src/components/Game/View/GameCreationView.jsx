import React, {useState} from "react";
import {connect} from "react-redux";
import {InputTextarea} from "primereact/inputtextarea";
import {
    changeView,
    setGames,
    updateCurrencyForm,
    updateGameForm
} from "../../../data-layer/ActionCreators";
import {post, upload} from "../../../util/Http";
import {gameByNetworkId, gameBySubnetworkId, gamesUrl, uploadServerUrl, uploadUrl} from "../../../util/Parameters";
import {adminPageView, networkView, skillCategoryFormView, subnetworkView} from "../../../Views";
import Globals from "../../../util/Globals";
import ListInput from "../../Common/Input/ListInput";
import GameCreationMode from "../../../data-layer/enums/GameCreationMode";
import DefaultFormValues from "../../../data-layer/DefaultFormValues";
import CurrencyForm from "../CurrencyForm";
import AddItemButton from "../../Common/Buttons/AddItemButton";
import InputLabel from "../../Common/Labels/InputLabel";
import ListItemSmall from "../../Common/ListElements/SmallListItem";
import NoItemsLabel from "../../Common/Labels/NoItemsLabel";
import {useForm} from "react-hook-form";
import SkillCategoryForm from "./SkillCategoryView/SkillCategoryForm";
import SkillCategoryFormMode from "../../../data-layer/enums/SkillCategoryFormMode";
import Popup from "../../../util/Popup";

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

    const [currencyFormVisible, setCurrencyFormVisible] = useState(false)


    function onAddCurrencyClicked() {
        setCurrencyFormVisible(true)
    }

    function onCurrencyFormSubmit() {
        setCurrencyFormVisible(false)
        props.updateGameForm({currencies: props.gameForm.currencies.slice().concat(props.currencyForm)})
        props.updateCurrencyForm(DefaultFormValues.currencyForm)
    }

    function onImgFileChange(e) {
        upload(uploadUrl, e.target.files[0], rs => props.updateGameForm({img: uploadServerUrl + "/" + rs.data.filename}))
    }

    function onBackgroundFileChange(e) {
        upload(uploadUrl, e.target.files[0], rs => props.updateGameForm({background: uploadServerUrl + "/" + rs.data.filename}))
    }

    function onAddSkillCategoryClicked() {
        Globals.skillCategoryFormMode = SkillCategoryFormMode.CREATE
        props.changeView(skillCategoryFormView)
    }

    function onSaveClicked() {
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
                url = gameBySubnetworkId(props.activeNetwork.id, props.activeSubnetwork.id)
                nextView = subnetworkView
                break;
        }


        post(url, props.gameForm, rs => {
            props.setGames(props.games.concat(rs))
            props.updateGameForm(DefaultFormValues.gameForm)
            props.changeView(nextView)
            Popup.info("Игра создана")
        })
    }

    const {register, handleSubmit, errors} = useForm()

    return (
        <form className={"game-creation-view"}
              onSubmit={handleSubmit(onSaveClicked)}>

            <InputLabel text={"Название:"}/>
            <input className={"game-creation-view-input"}
                   name={"title"}
                   ref={register({required: true})}
                   value={props.gameForm.title}
                   onChange={e => props.updateGameForm({title: e.target.value})}
            />
            <div className={"error-label"}>{errors.title && "Введите название"}</div>

            <InputLabel text={"Ссылка на группу:"}/>
            <input className={"game-creation-view-input"}
                   name={"groupLink"}
                   ref={register({required: true})}
                   value={props.gameForm.groupLink}
                   onChange={e => props.updateGameForm({groupLink: e.target.value})}
            />
            <div className={"error-label"}>{errors.groupLink && "Неверная ссылка"}</div>

            <InputLabel text={"Картинка:"}/>
            <input type={"file"}
                   name={"img"}
                   // ref={register({required: true})}
                   ref={register()}
                   onChange={e => onImgFileChange(e)}/>
            <div className={"error-label"}>{errors.img && "Загрузите картинку"}</div>

            <InputLabel text={"Фон:"}/>
            <input type={"file"}
                   name={"background"}
                   // ref={register({required: true})}
                   ref={register()}
                   onChange={e => onBackgroundFileChange(e)}/>
            <div className={"error-label"}>{errors.background && "Загрузите фон"}</div>

            <InputLabel text={"Описание:"}/>
            <InputTextarea autoResize={true}
                           rows={10}
                           value={props.gameForm.description}
                           onChange={e => props.updateGameForm({description: e.target.value})}
            />

            <input className={"network-creation-save-button"}
                   type={"submit"}
                   value={"Сохранить"}/>
        </form>
    )
})