import React from "react";
import {connect} from "react-redux"
import {changeView} from "../../../../data-layer/ActionCreators";
import FormViewStyle from "../../../../styles/FormViewStyle";
import Btn from "../../../Common/Buttons/Btn";
import {organizationDetailsView, shopManagementView} from "../../../../Views";
import ItemsForSaleComponent from "../Components/ItemsForSaleComponent";
import {get, post} from "../../../../util/Http";
import {purchaseFromShopUrl, setItemForSaleUrl, shopByIdUrl} from "../../../../util/Parameters";
import Popup from "../../../../util/Popup";
import ItemPublisherType from "../../../../data-layer/enums/ItemPublisherType";

export default connect(
    state => ({
        shop: state.activeShop,
        character: state.activeCharacter,
        gameId: state.activeGame.id,
        organization: state.activeOrganization,
        currencyNames: state.activeGame.currencies.map(v => v.name)
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
        this.state = props.shop
        this.refresh()
    }

    render() {
        return (
            <div style={FormViewStyle}>
                <ItemsForSaleComponent gameId={this.props.gameId}
                                       characterId={this.props.character?.id}
                                       currencyNames={this.props.currencyNames}
                                       itemsForSale={this.state.itemsForSale}
                                       isPublishingAvailable={this.isPublishingAvailable()}
                                       onItemForSaleAdded={form => this.onItemForSaleAdded(form)}
                                       onItemPurchase={(balanceId, itemForSale) => this.onItemPurchase(balanceId, itemForSale)}
                />
                <Btn text={"Управление магазином"} onClick={() => this.props.toShopManagementView()}/>
                <Btn text={"Назад"} onClick={() => this.props.back()}/>
            </div>
        )
    }

    isPublishingAvailable() {
        return this.state.type === ItemPublisherType.PLAYERS ||
            this.props.organization.heads.some(v => v.id === this.props.character.id)
    }

    onItemForSaleAdded(form) {
        post(setItemForSaleUrl, {
            itemId: form.itemTemplate.id,
            shopId: this.state.id,
            publisherId: this.props.character.id,
            price: form.price
        }, () => this.refresh(() => Popup.info("Товар выставлен на продажу")))
    }

    onItemPurchase(balanceId, itemForSale) {
        post(purchaseFromShopUrl, {
                shopId: this.state.id,
                buyerBalanceId: balanceId,
                buyerCharacterId: this.props.character.id,
                gameId: this.props.gameId,
                itemForSaleId: itemForSale.id
            },
            () => this.refresh(() => Popup.success(`${itemForSale.item.name} был приобретён и добавлен в инвентарь персонажа ${this.props.character.name}`)),
            rs => Popup.error(rs.message))
    }

    refresh(then = () => {}) {
        get(shopByIdUrl(this.state.id), rs => {
            this.setState(rs)
            then()
        })
    }
})