import React from "react";
import {connect} from "react-redux"
import {changeView} from "../../../../data-layer/ActionCreators";
import FormViewStyle from "../../../../styles/FormViewStyle";
import Btn from "../../../Common/Buttons/Btn";
import {organizationDetailsView, shopManagementView} from "../../../../Views";
import GetActiveCharacterFromStore from "../../../../util/GetActiveCharacterFromStore";
import ItemsForSaleComponent from "../Components/ItemsForSaleComponent";
import {get, post} from "../../../../util/Http";
import {purchaseFromGameShopUrl, shopByIdUrl} from "../../../../util/Parameters";
import Popup from "../../../../util/Popup";

export default connect(
    state => ({
        shop: state.activeShop,
        character: GetActiveCharacterFromStore(state),
        gameId: state.activeGame.id
    }),
    null,
    (stateProps, dispatchProps, ownProps) => {
        const {dispatch} = dispatchProps

        return {
            ...stateProps,
            ...ownProps,

            toShopManagementView: () => dispatch(changeView(shopManagementView)),
            back: () => dispatch(changeView(organizationDetailsView))
        }
    }
)(class ShopView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            shop: props.shop
        }

        this.refresh()
    }

    render() {
        return (
            <div style={FormViewStyle}>
                <ItemsForSaleComponent itemsForSale={this.state.shop.itemsForSale}
                                       characterId={this.props.character?.id}
                                       onItemPurchase={(balanceId, itemForSale) => this.onItemPurchase(balanceId, itemForSale)}
                />
                <Btn text={"Настройки"} />
                <Btn text={"Управление магазином"} onClick={() => this.props.toShopManagementView()}/>
                <Btn text={"Назад"} onClick={() => this.props.back()}/>
            </div>
        )
    }

    onItemPurchase(balanceId, itemForSale) {
        post(purchaseFromGameShopUrl, {
            buyerBalanceId: balanceId,
            price: itemForSale.price,
            buyerCharacterId: this.props.character.id,
            gameId: this.props.gameId,
            merchandiseId: itemForSale.merchandise.id,
        }, () => this.refresh(() => {
            Popup.success(`${itemForSale.merchandise.name} был приобретён и добавлен в инвентарь персонажа ${this.props.character.name}`)
        }), rs => Popup.error(rs.message))
    }

    refresh(then = () => {}) {
        get(shopByIdUrl(this.state.shop.id), rs => {
            this.setState({shop: rs})
            then()
        })
    }
})