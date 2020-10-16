import React from "react";
import {connect} from "react-redux"
import FormTitleLabel from "../../../Common/Labels/FormTitleLabel";
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
)(class CraftingView extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div style={FormViewStyle}>
                <FormTitleLabel text={"Крафт"}/>
            </div>
        )
    }
})