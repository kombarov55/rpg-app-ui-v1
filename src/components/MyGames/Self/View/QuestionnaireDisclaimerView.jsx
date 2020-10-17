import React from "react";
import {connect} from "react-redux"
import {changeView} from "../../../../data-layer/ActionCreators";
import {questionnaireFillingView} from "../../../../Views";
import FormViewStyle from "../../../../styles/FormViewStyle";
import Btn from "../../../Common/Buttons/Btn";

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
            toQuestionnaireFillingView: () => dispatch(changeView(questionnaireFillingView))
        }
    }
)(class QuestionnaireDisclaimerView extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div style={FormViewStyle}>
                <div>
                    Дисклеймер отсутствует
                </div>
                <Btn text={"Прочитал и согласен"} onClick={() => this.props.toQuestionnaireFillingView()}/>
            </div>
        )
    }
})