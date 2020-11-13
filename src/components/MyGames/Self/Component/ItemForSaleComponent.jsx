import React from "react";
import ExpandableListItem from "../../../Common/ListElements/ExpandableListItem";
import AmountsToString from "../../../../util/AmountsToString";
import Btn from "../../../Common/Buttons/Btn";
import RedButton from "../../../Common/Buttons/RedButton";
import FormatDate from "../../../../util/FormatDate";
import {get} from "../../../../util/Http";
import {getCharacterBalances} from "../../../../util/Parameters";
import BuyerBalanceSelectionForm from "../../../Common/Input/BuyerBalanceSelectionForm";

export default class ItemForSaleComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            purchaseFormVisible: false,
            balances: []
        }
    }

    render() {
        return (
            <ExpandableListItem
                img={this.props.itemForSale.item.img}
                name={this.props.itemForSale.item.name}
                description={this.props.itemForSale.item.description}
                expandableElements={[
                    <div>
                        <div>Дата выставления на
                            продажу: {FormatDate(new Date(this.props.itemForSale.creationDate))}</div>
                        {
                            this.props.itemForSale.ownerName &&
                            <div>Владелец: {this.props.itemForSale.ownerName}</div>
                        }
                        {
                            !this.state.purchaseFormVisible && (
                                this.props.purchaseVisible ?
                                    <Btn text={`Купить за ${AmountsToString(this.props.itemForSale.price)}`}
                                         onClick={() => {
                                             get(getCharacterBalances(this.props.characterId), rs => this.setState({
                                                 purchaseFormVisible: true,
                                                 balances: rs
                                             }))
                                         }}
                                    /> : <RedButton text={"Выберите активного персонажа, чтобы купить этот предмет."}/>
                            )
                        }

                        {
                            this.state.purchaseFormVisible &&
                            <BuyerBalanceSelectionForm balances={this.state.balances}
                                                       price={AmountsToString(this.props.itemForSale.price)}
                                                       onSubmit={form => {
                                                           this.props.onItemPurchase(form.balanceId)
                                                           this.setState({purchaseFormVisible: false})
                                                       }}
                            />
                        }

                    </div>
                ]}

                alwaysExpand={true}
            />
        )
    }
}