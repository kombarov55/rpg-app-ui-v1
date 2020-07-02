import React from "react";
import FormViewStyle from "../../../styles/FormViewStyle";
import InputLabel from "../../Common/InputLabel";
import {connect} from "react-redux";
import {changeView, updateActiveGame} from "../../../data-layer/ActionCreators";
import {gameView} from "../../../Views";
import IsNumeric from "../../../util/IsNumeric";
import SubmitButton from "../../Common/SubmitButton";
import {post} from "../../../util/Http";
import {saveCurrencyUrl} from "../../../util/Parameters";

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

export default connect(mapStateToProps, mapDispatchToProps)(class CurrencyCreationView extends React.Component {

    constructor(props) {
        super(props)
        this.state = this.initialState
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
                    onClick={() => this.onSaveClicked()}
                />
            </div>
        )
    }

    onSaveClicked() {
        if (!IsNumeric(this.state.priceInActivityPoints)) return

        post(saveCurrencyUrl(this.props.activeGame.id), this.state, rs => {
            this.props.growl.show({severity: "info", summary: "Валюта добавлена"})
            this.props.updateActiveGame({
                currencies: this.props.activeGame.currencies.concat(rs)
            })
        }, () => this.props.growl.show({severity: "error", summary: "Валюта добавлена"}))

        this.setState(this.initialState)
        this.props.toPrevView()
    }
})