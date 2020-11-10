import React from "react";
import {connect} from "react-redux"
import {changeView} from "../../../../data-layer/ActionCreators";
import FormViewStyle from "../../../../styles/FormViewStyle";
import Btn from "../../../Common/Buttons/Btn";
import ShopSettingsComponent from "../Components/ShopSettingsComponent";
import {shopByIdUrl} from "../../../../util/Parameters";
import Popup from "../../../../util/Popup";
import {shopView} from "../../../../Views";

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

            back: () => dispatch(changeView(shopView))
        }
    }
)(class ShopManagementView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            shop: props.shop
        }
    }

    render() {
        return (
            <div style={FormViewStyle}>
                <ShopSettingsComponent shopId={this.state.shop.id}
                                       onShopUpdated={patch => this.onShopUpdated(patch)}
                />

                <Btn text={"Назад"} onClick={() => this.props.back()}/>
            </div>
        )
    }

    onShopUpdated(patch) {
        patch(shopByIdUrl(this.state.shop.id), patch, rs => {
            this.setState({shop: rs})
            Popup.info("Информация обновлена.")
        })
    }
})