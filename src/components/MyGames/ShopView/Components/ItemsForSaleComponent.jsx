import React from "react";
import List from "../../../Common/Lists/List";
import ItemForSaleComponent from "../../Self/Component/ItemForSaleComponent";
import ItemForSaleForm from "../../Self/Form/ItemForSaleForm";
import {get} from "../../../../util/Http";
import {getOwnedMerchandiseUrl} from "../../../../util/Parameters";

export default class ItemsForSaleComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            formVisible: false,

            merchandiseList: []
        }
    }

    render() {
        return (
            <div>
                <List title={"Товары на продажу:"}
                      isAddButtonVisible={this.props.isPurchaseAvailable && !this.state.formVisible}
                      onAddClicked={() => get(getOwnedMerchandiseUrl(this.props.characterId), rs => this.setState({
                          formVisible: true,
                          merchandiseList: rs
                      }))}
                      values={this.props.itemsForSale.map(itemForSale =>
                          <ItemForSaleComponent itemForSale={itemForSale}
                                                isPurchaseVisible={this.props.characterId != null}
                                                characterId={this.props.characterId}
                                                onItemPurchase={balanceId => this.props.onItemPurchase(balanceId, itemForSale)}
                          />
                      )}
                />
                {
                    this.state.formVisible &&
                    <ItemForSaleForm gameId={this.props.gameId}
                                     currencyNames={this.props.currencyNames}
                                     merchandiseList={this.state.merchandiseList}
                                     onSubmit={form => {
                                         this.props.onItemForSaleAdded(form)
                                         this.setState({formVisible: false})
                                     }}

                    />
                }
            </div>
        )
    }
}