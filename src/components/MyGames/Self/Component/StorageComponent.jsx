import React from "react";
import List from "../../../Common/Lists/List";
import ItemForSaleForm from "../Form/ItemForSaleForm";
import {get} from "../../../../util/Http";
import {itemTemplateUrl} from "../../../../util/Parameters";
import ItemForSaleComponent from "./ItemForSaleComponent";
import AutocompleteComponentMode from "../../../../data-layer/enums/AutocompleteComponentMode";

/**
 * props: {
 *     gameId: String
 *     items: []
 *     characterId: String
 *     purchaseVisible: Boolean
 *     currencyNames: []
 *     onItemForSaleAdded: () => {}
 *     onItemPurchase: () => {}
 * }
 */
export default class StorageComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            addItemVisible: false,

            merchandiseList: []
        }
    }

    render() {
        return (
            <div>
                <List title={"База:"}
                      noItemsText={"Пусто.."}
                      isAddButtonVisible={!this.state.addItemVisible}
                      onAddClicked={() => {
                          get(itemTemplateUrl(this.props.gameId), rs => this.setState({
                              addItemVisible: true,
                              merchandiseList: rs
                          }))
                      }}
                      values={this.props.items.map(itemForSale =>
                          <ItemForSaleComponent itemForSale={itemForSale}
                                                characterId={this.props.characterId}
                                                purchaseVisible={this.props.purchaseVisible}
                                                key={itemForSale.id}
                                                onItemPurchase={balanceId => this.props.onItemPurchase(balanceId, itemForSale)}
                          />
                      )}
                />
                {
                    this.state.addItemVisible &&
                    <ItemForSaleForm gameId={this.props.gameId}
                                     mode={AutocompleteComponentMode.REMOTE}
                                     currencyNames={this.props.currencyNames}
                                     onSubmit={itemForSale => {
                                         this.props.onItemForSaleAdded(itemForSale)
                                         this.setState({addItemVisible: false})
                                     }}
                    />
                }
            </div>
        )
    }
}