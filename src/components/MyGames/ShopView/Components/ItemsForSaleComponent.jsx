import React from "react";
import List from "../../../Common/Lists/List";
import ItemForSaleComponent from "../../Self/Component/ItemForSaleComponent";

export default class ItemsForSaleComponent extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <List title={"Товары на продажу:"}
                      values={this.props.itemsForSale.map(itemForSale =>
                          <ItemForSaleComponent itemForSale={itemForSale}
                                                isPurchaseVisible={this.props.characterId != null}
                                                characterId={this.props.characterId}
                                                onItemPurchase={balanceId => this.props.onItemPurchase(balanceId, itemForSale)}
                          />

                      )}
                />
            </div>
        )
    }
}