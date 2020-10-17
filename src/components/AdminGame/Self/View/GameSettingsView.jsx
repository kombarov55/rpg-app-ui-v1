import React from "react";
import FormViewStyle from "../../../../styles/FormViewStyle";
import Btn from "../../../Common/Buttons/Btn";
import {connect} from "react-redux"
import {changeView, setActiveGame} from "../../../../data-layer/ActionCreators";
import {adminGameView} from "../../../../Views";
import InputLabel from "../../../Common/Labels/InputLabel";
import {InputTextarea} from "primereact/inputtextarea";
import {put} from "../../../../util/Http";
import {gameByIdUrl} from "../../../../util/Parameters";
import Popup from "../../../../util/Popup";

export default connect(
    state => ({
        game: state.activeGame
    }),
    null,
    (stateProps, dispatchProps, ownProps) => {
        const {dispatch} = dispatchProps

        return {
            ...stateProps,
            ...ownProps,
            setActiveGame: x => dispatch(setActiveGame(x)),
            back: () => dispatch(changeView(adminGameView))
        }
    }
)(class GameSettingsView extends React.Component {

    constructor(props) {
        super(props);

        this.state = props.game
    }

    render() {
        return (
            <div style={FormViewStyle}>
                <InputLabel text={"Текст дисклеймера:"}/>
                <InputTextarea autoResize={true}
                               value={this.state.disclaimerText}
                               onChange={e => this.setState({disclaimerText: e.target.value})}
                />

                <Btn text={"Сохранить изменения"} onClick={() => put(gameByIdUrl(this.state.id), this.state, rs => {
                    this.setState(rs)
                    this.props.setActiveGame(rs)
                    Popup.info("Изменения сохранены.")
                })}/>
                <Btn text={"Назад"} onClick={() => this.props.back()}/>
            </div>
        )
    }
})