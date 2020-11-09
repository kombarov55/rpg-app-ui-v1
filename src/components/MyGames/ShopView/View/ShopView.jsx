import React from "react";
import {connect} from "react-redux"
import {changeView} from "../../../../data-layer/ActionCreators";
import FormViewStyle from "../../../../styles/FormViewStyle";
import Btn from "../../../Common/Buttons/Btn";
import FormTitleLabel from "../../../Common/Labels/FormTitleLabel";
import {organizationDetailsView} from "../../../../Views";

export default connect(
    state => ({
        shop: state.activeShop
    }),
    null,
    (stateProps, dispatchProps, ownProps) => {
        const {dispatch} = dispatchProps

        return {
            ...stateProps,
            ...ownProps,

            back: () => dispatch(changeView(organizationDetailsView))
        }
    }
)(class ShopView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            shop: props.shop
        }
    }

    render() {
        return (
            <div style={FormViewStyle}>

                <Btn text={"Назад"} onClick={() => this.props.back()}/>
            </div>
        )
    }
})