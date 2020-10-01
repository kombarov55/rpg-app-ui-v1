import React from "react";
import ViewInfo from "../../../Common/Constructions/ViewInfo";
import {connect} from "react-redux"
import {changeView} from "../../../../data-layer/ActionCreators";
import {skillCategoryView} from "../../../../Views";
import Btn from "../../../Common/Buttons/Btn";
import FormViewStyle from "../../../../styles/FormViewStyle";

export default connect(
    state => ({
        spellSchool: state.activeSpellSchool
    }),
    null,
    (stateProps, dispatchProps, ownProps) => {
        const {dispatch} = dispatchProps

        return {
            ...stateProps,
            ...ownProps,

            back: () => dispatch(changeView(skillCategoryView))
        }
    }
)(class SpellSchoolView extends React.Component {

    constructor(props) {
        super(props);

        this.state = Object.assign({}, props.spellSchool, {

        })
    }

    render() {
        return (
            <div style={FormViewStyle}>
                <ViewInfo
                    img={this.state.img}
                    name={this.state.name}
                    description={this.state.description}
                />

                <Btn text={"Назад"}
                     onClick={() => this.props.back()}
                />

            </div>
        )
    }
})