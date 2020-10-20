import React from "react";
import {connect} from "react-redux"
import FormViewStyle from "../../../../styles/FormViewStyle";

export default connect(
    state => ({

    }),
    null,
    (stateProps, dispatchProps, ownProps) => {
        const {dispatch} = dispatchProps

        return {
            ...stateProps,
            ...ownProps

        }
    }
)(class OfficeView extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div style={FormViewStyle}>

            </div>
        )
    }
})