import React from "react";
import {connect} from "react-redux"
import {changeView} from "../../../../data-layer/ActionCreators";
import {gameView, questionnaireFillingView} from "../../../../Views";
import FormViewStyle from "../../../../styles/FormViewStyle";
import Btn from "../../../Common/Buttons/Btn";
import getOrDefault from "../../../../util/getOrDefault";

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
            toQuestionnaireFillingView: () => dispatch(changeView(questionnaireFillingView)),
            back: () => dispatch(changeView(gameView))
        }
    }
)(class QuestionnaireDisclaimerView extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div style={FormViewStyle}>
                <div>{getOrDefault(this.props.game.disclaimerText, "Дисклеймер отсутствует")}</div>
                <Btn text={"Прочитал и согласен"} onClick={() => this.props.toQuestionnaireFillingView()}/>
                <Btn text={"Назад"} onClick={() => this.props.back()}/>
            </div>
        )
    }
})