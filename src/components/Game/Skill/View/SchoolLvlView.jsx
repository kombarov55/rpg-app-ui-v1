import React from "react";
import FormTitleLabel from "../../../Common/Labels/FormTitleLabel";
import {connect} from "react-redux"
import {changeView} from "../../../../data-layer/ActionCreators";
import {spellSchoolView} from "../../../../Views";
import Btn from "../../../Common/Buttons/Btn";
import FormViewStyle from "../../../../styles/FormViewStyle";

export default connect(
    state => ({
        schoolLvl: state.activeSchoolLvl
    }),
    null,
    (stateProps, dispatchProps, ownProps) => {
        const {dispatch} = dispatchProps

        return {
            ...stateProps,
            ...ownProps,

            back: () => dispatch(changeView(spellSchoolView))
        }
    }
)(class SchoolLvlView extends React.Component {

    constructor(props) {
        super(props);
        this.state = Object.assign({}, props.schoolLvl, {})
    }


    render() {
        return (
            <div style={FormViewStyle}>
                <FormTitleLabel text={this.state.lvl + " Уровень:"}/>

                <Btn text={"Назад"} onClick={() => this.props.back()}/>
            </div>
        )
    }
})