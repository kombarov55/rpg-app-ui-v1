import React from "react";
import FormViewStyle from "../../../../styles/FormViewStyle";
import InputLabel from "../../../Common/Labels/InputLabel";
import {connect} from "react-redux";
import {changeView, updateActiveGame} from "../../../../data-layer/ActionCreators";
import {adminGameView} from "../../../../Views";
import IsNumeric from "../../../../util/IsNumeric";
import SubmitButton from "../../../Common/Buttons/SubmitButton";
import {patch, post} from "../../../../util/Http";
import {saveCurrencyUrl, updateCurrencyUrl} from "../../../../util/Parameters";
import FormType from "../../../../data-layer/enums/FormMode";
import Btn from "../../../Common/Buttons/Btn";
import Popup from "../../../../util/Popup";

function mapStateToProps(state) {
    return {
        params: state.changeViewParams,
        activeGame: state.activeGame,
        growl: state.growl
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateActiveGame: fieldNameToValue => dispatch(updateActiveGame(fieldNameToValue)),
        toPrevView: () => dispatch(changeView(adminGameView))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(class CurrencyFormView extends React.Component {

    constructor(props) {
        super(props)

        const {formType, formState} = props.params

        this.formType = formType
        this.state = formType === FormType.CREATE ?
            this.initialState :
            formState
    }

    initialState = {
        name: "",
        priceInActivityPoints: 0
    }

    render() {
        return (
            <div style={FormViewStyle}>
                <InputLabel text={"Название валюты:"}/>
                <input name={"name"}
                       value={this.state.name}
                       onChange={e => this.setState({name: e.target.value})}
                />
                <InputLabel text={"Цена в баллах актива:"}/>
                <input name={"priceInActivityPoints"}
                       value={this.state.priceInActivityPoints}
                       onChange={e => this.setState({priceInActivityPoints: e.target.value})}
                />
                <SubmitButton
                    text={"Сохранить"}
                    onClick={() => this.formType === FormType.CREATE ?
                        this.onSaveClicked() :
                        this.onEditClicked()
                    }
                />

                <Btn text={"Назад"} onClick={() => this.props.toPrevView()} />
            </div>
        )
    }

    onSaveClicked() {
        if (!IsNumeric(this.state.priceInActivityPoints)) return

        post(saveCurrencyUrl(this.props.activeGame.id), this.state, rs => {
            Popup.info("Валюта добавлена")
            this.props.updateActiveGame({
                currencies: this.props.activeGame.currencies.concat(rs)
            })
        }, () => Popup.error("Валюта добавлена"))

        this.setState(this.initialState)
        this.props.toPrevView()
    }

    onEditClicked() {
        if (!IsNumeric(this.state.priceInActivityPoints)) return

        patch(updateCurrencyUrl(this.props.activeGame.id, this.state.id), this.state, rs => {
            Popup.info("Валюта обновлена")
            this.props.updateActiveGame({
                currencies: this.props.activeGame.currencies.filter(it => it.id !== rs.id).concat(rs)
            })
        }, Popup.error("Ошибка при добавлении валюты. Обратитесь к администратору"))

        this.setState(this.initialState)
        this.props.toPrevView()
    }
})