import React from "react";
import List from "../../../Common/Lists/List";
import ItemForSaleForm from "../Form/ItemForSaleForm";
import {get, post} from "../../../../util/Http";
import {addItemForSaleForGameUrl, merchandiseUrl} from "../../../../util/Parameters";
import ItemForSaleComponent from "./ItemForSaleComponent";

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
                          get(merchandiseUrl(this.props.gameId), rs => this.setState({
                              addItemVisible: true,
                              merchandiseList: rs
                          }))
                      }}
                      values={this.props.items.map(itemForSale =>
                          <ItemForSaleComponent itemForSale={itemForSale}
                                                characterId={this.props.characterId}
                                                purchaseVisible={this.props.purchaseVisible}
                                                key={itemForSale.id}
                                                onItemPurchase={balanceId => this.props.onItemPurchase(balanceId, itemForSale.price, itemForSale)}
                          />
                      )}
                />
                {this.state.addItemVisible &&
                <ItemForSaleForm merchandiseList={this.state.merchandiseList}
                                 currencies={this.props.currencies}
                                 onSubmit={form => post(addItemForSaleForGameUrl(this.props.gameId), form, rs =>
                                     this.props.onItemForSaleAdded(rs)
                                 )}
                />
                }
            </div>
        )
    }
}