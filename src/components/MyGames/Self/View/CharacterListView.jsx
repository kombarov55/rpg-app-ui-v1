import React from "react";
import {connect} from "react-redux"
import {changeView} from "../../../../data-layer/ActionCreators";
import {gameView} from "../../../../Views";
import FormViewStyle from "../../../../styles/FormViewStyle";
import Btn from "../../../Common/Buttons/Btn";

export default connect(
    state => ({

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
)(class CharacterListView extends React.Component {

    constructor(props) {
        super(props);


    }

    render() {
        return (
            <div style={FormViewStyle}>

                <Btn text={"Назад"} onClick={() => this.props.back()}/>
            </div>
        )
    }
})