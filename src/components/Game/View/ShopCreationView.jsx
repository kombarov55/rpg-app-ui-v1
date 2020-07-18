import React from "react";
import {connect} from "react-redux"
import {changeView, updateActiveGame} from "../../../data-layer/ActionCreators";
import {gameView} from "../../../Views";
import FormViewStyle from "../../../styles/FormViewStyle";
import InputLabel from "../../Common/Labels/InputLabel";
import Btn from "../../Common/Buttons/Btn";
import {upload} from "../../../util/HttpRequests";
import {saveShopUrl, uploadUrl} from "../../../util/Parameters";
import {MultiSelect} from "primereact/multiselect";
import {SelectButton} from "primereact/selectbutton";
import SubmitButton from "../../Common/Buttons/SubmitButton";
import {post} from "../../../util/Http";
import Popup from "../../../util/Popup";

function mapStateToProps(state) {
    return {
        activeGame: state.activeGame,
        growl: state.growl
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateActiveGame: fieldNameToValue => dispatch(updateActiveGame(fieldNameToValue)),
        toPrevView: () => dispatch(changeView(gameView))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(class ShopCreationView extends React.Component {

    constructor(props) {
        super(props)

        this.state = this.initialState
    }

    initialState = {
        name: "",
        img: "",
        type: "PLAYERS",
    }

    render() {
        return (
            <div style={FormViewStyle}>
                <InputLabel text={"Название:"}/>
                <input value={this.state.name}
                       onChange={e => this.setState({name: e.target.value})}
                />

                <InputLabel text={"Картинка:"}/>
                <input type={"file"}
                       onChange={e => upload(
                           e.target.files[0],
                           filename => this.setState({img: filename})
                       )}
                />
                <InputLabel text={"Для кого магазин?"}/>
                <SelectButton
                    options={[
                        {label: "Игроки", value: "PLAYERS"},
                        {label: "Организации", value: "ORGANIZATIONS"}
                    ]}
                    value={this.state.type}
                    onChange={e => this.setState({type: e.target.value})}
                />


                <SubmitButton text={"Сохранить"} onClick={() => this.onSaveClicked()}/>
                <Btn text={"Назад"} onClick={() => this.onBackClicked()}/>
            </div>
        )
    }

    onSaveClicked() {
        post(saveShopUrl(this.props.activeGame.id), this.state, rs => {
            updateActiveGame({shops: this.props.activeGame.shops.concat(rs)})
            this.setState(this.initialState)
            Popup.info("Магазин создан.")

        }, Popup.error("Ошибка при создании магазина. Обратитесь к администратору."))

        this.props.toPrevView()
    }

    onBackClicked() {
        this.props.toPrevView()
    }
})