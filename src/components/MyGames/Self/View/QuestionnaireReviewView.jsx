import React from "react";
import {connect} from "react-redux"
import FormViewStyle from "../../../../styles/FormViewStyle";
import Btn from "../../../Common/Buttons/Btn";
import {changeView} from "../../../../data-layer/ActionCreators";
import {gameView} from "../../../../Views";
import {get} from "../../../../util/Http";
import {getQuestionnaireById} from "../../../../util/Parameters";

export default connect(
    state => ({
        questionnaire: state.activeQuestionnaire
    }),
    null,
    (stateProps, dispatchProps, ownProps) => {
        const {dispatch} = dispatchProps

        return {
            ...stateProps,
            ...ownProps,

            back: () => dispatch(changeView(gameView))
        }
    }
)(class QuestionnaireReviewView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            questionnaire: null
        }

        get(getQuestionnaireById(this.props.questionnaire.id))
    }

    render() {
        return (
            <div style={FormViewStyle}>

                <Btn text={"Назад"} onClick={() => this.props.back()}/>
            </div>
        )
    }
})