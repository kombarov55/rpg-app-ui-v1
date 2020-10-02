import React from "react";
import {connect} from "react-redux"

export default connect(
    state => ({
        activeSkill: state.activeSkill
    }),
    null,
    (stateProps, dispatchProps, ownProps) => {
        const {dispatch} = dispatchProps

        return {
            ...stateProps,
            ...ownProps
        }
    }
)(class SkillView extends React.Component {

    constructor(props) {
        super(props);
        this.state = Object.assign({}, props.activeSkill, {

        })
    }

    render() {
        return (
            <div>

            </div>
        )
    }
})