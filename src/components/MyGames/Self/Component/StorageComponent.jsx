import React from "react";
import List from "../../../Common/Lists/List";
import ExpandableListItem from "../../../Common/ListElements/ExpandableListItem";
import AmountsToString from "../../../../util/AmountsToString";
import FormatDate from "../../../../util/FormatDate";
import Btn from "../../../Common/Buttons/Btn";
import ItemForSaleForm from "../Form/ItemForSaleForm";
import {get, post} from "../../../../util/Http";
import {addItemForSaleForGameUrl, merchandiseUrl} from "../../../../util/Parameters";

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
                          <ExpandableListItem
                              img={itemForSale.merchandise.img}
                              name={itemForSale.merchandise.name}
                              description={itemForSale.merchandise.description}
                              expandableElements={[
                                  <div>
                                      <div>Количество: {itemForSale.amount}</div>
                                      <div>Дата выставления на
                                          продажу: {FormatDate(new Date(itemForSale.creationDate))}</div>
                                      <Btn text={`Купить за ${AmountsToString(itemForSale.price)}`}
                                           onClick={() => {
                                           }}
                                      />
                                  </div>
                              ]}

                              alwaysExpand={true}
                              key={itemForSale.id}
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