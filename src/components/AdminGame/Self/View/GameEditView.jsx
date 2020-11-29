import React, {useState} from "react";
import {connect} from "react-redux";
import {InputTextarea} from "primereact/inputtextarea";
import {
    changeView,
    setActiveGame,
    setGames,
    updateCurrencyForm,
    updateGameForm
} from "../../../../data-layer/ActionCreators";
import {put, upload} from "../../../../util/Http";
import {
    editGameByNetworkId,
    editGamebySubnetworkId,
    gameByIdUrl,
    uploadServerUrl,
    uploadUrl
} from "../../../../util/Parameters";
import {adminGameView} from "../../../../Views";
import Globals from "../../../../util/Globals";
import GameCreationMode from "../../../../data-layer/enums/GameCreationMode";
import DefaultFormValues from "../../../../data-layer/DefaultFormValues";
import InputLabel from "../../../Common/Labels/InputLabel";
import NoItemsLabel from "../../../Common/Labels/NoItemsLabel";
import ListItemSmall from "../../../Common/ListElements/CornerListItem";
import CurrencyForm from "../Form/CurrencyForm";
import AddItemButton from "../../../Common/Buttons/AddItemButton";
import {useForm} from "react-hook-form";
import HorizontalListItem from "../../../Common/ListElements/HorizontalListItem";
import SkillCategoryFormMode from "../../../../data-layer/enums/SkillCategoryFormMode";
import Popup from "../../../../util/Popup";

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

    const [currencyFormVisible, setCurrencyFormVisible] = useState(false)

    function onAddCurrencyClicked() {
        setCurrencyFormVisible(true)
    }

    function onCurrencyFormSubmit() {
        setCurrencyFormVisible(false)
        props.updateGameForm({currencies: props.gameForm.currencies.slice().concat(props.currencyForm)})
        props.updateCurrencyForm(DefaultFormValues.currencyForm)
    }

    function onAddSkillCategoryClicked() {
        Globals.skillCategoryFormMode = SkillCategoryFormMode.EDIT
    }

    function onImgFileChange(e) {
        upload(uploadUrl, e.target.files[0], rs => props.updateGameForm({img: uploadServerUrl + "/" + rs.data.filename}))
    }

    function onBackgroundFileChange(e) {
        upload(uploadUrl, e.target.files[0], rs => props.updateGameForm({background: uploadServerUrl + "/" + rs.data.filename}))
    }

    function onSaveClicked() {
        let url

        switch (Globals.gameCreationMode) {
            case GameCreationMode.OPEN:
                url = gameByIdUrl(props.gameForm.id)
                break;
            case GameCreationMode.BY_NETWORK:
                url = editGameByNetworkId(props.activeNetwork.id, props.gameForm.id)
                break;
            case GameCreationMode.BY_SUBNETWORK:
                url = editGamebySubnetworkId(props.activeNetwork.id, props.activeSubnetwork.id, props.gameForm.id)
                break;

        }

        put(url, props.gameForm, rs => {
            Popup.info("Игра обновлена")
            props.setGames(props.games.filter(it => it.id !== rs.id).concat(rs))
            props.updateGameForm(DefaultFormValues.gameForm)
            props.setActiveGame(rs)
            props.changeView(adminGameView)
        })
    }

    const {register, errors, handleSubmit} = useForm()

    return (
        <form className={"game-creation-view"}
              onSubmit={handleSubmit(onSaveClicked)}>

            <InputLabel text={"Название:"}/>
            <input className={"game-creation-view-input"}
                   name={"groupLink"}
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
                   ref={register({required: true})}
                   onChange={e => onImgFileChange(e)}/>
            <div className={"error-label"}>{errors.img && "Загрузите картинку"}</div>

            <InputLabel text={"Фон:"}/>
            <input type={"file"}
                   name={"background"}
                   ref={register({required: true})}
                   onChange={e => onBackgroundFileChange(e)}/>
            <div className={"error-label"}>{errors.background && "Загрузите фон"}</div>

            <InputLabel text={"Описание:"}/>
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
                        <ListItemSmall left={currency.name} right={currency.priceInActivityPoints}/>
                    )
                }
            </div>
            {
                currencyFormVisible &&
                <CurrencyForm
                    onSubmit={() => onCurrencyFormSubmit()}
                />
            }
            {
                !currencyFormVisible && props.gameForm.currencies.length < 3 &&
                <AddItemButton text={"Добавить валюту"} onClick={() => onAddCurrencyClicked()}/>
            }

            <InputLabel text={"Категории навыков:"}/>
            <div className={"list"}>
                {props.gameForm.skillCategories.length === 0 ?
                    <NoItemsLabel text={"Нет категорий навыков"}/> :
                    props.gameForm.skillCategories.map(skillCategory =>
                        <HorizontalListItem
                            name={skillCategory.name}
                            description={skillCategory.description}
                            imgSrc={skillCategory.img}
                            onDelete={() => props.updateGameForm({skillCategories: props.gameForm.skillCategories.filter(it => it.name !== skillCategory.name)})}
                        />)
                }
            </div>
            <AddItemButton text={"Добавить категорию навыка"} onClick={() => onAddSkillCategoryClicked()}/>

            <input className={"network-creation-save-button"}
                   type={"submit"}
                   value={"Сохранить"}/>
        </form>
    )
})