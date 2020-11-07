import React from "react";
import ExpandableListItem from "../../../Common/ListElements/ExpandableListItem";
import AmountsToString from "../../../../util/AmountsToString";
import Btn from "../../../Common/Buttons/Btn";
import RedButton from "../../../Common/Buttons/RedButton";
import FormatDate from "../../../../util/FormatDate";
import {get} from "../../../../util/Http";
import {getCharacterBalances} from "../../../../util/Parameters";
import BuyerBalanceSelectionForm from "../Form/BuyerBalanceSelectionForm";

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
                img={this.props.itemForSale.merchandise.img}
                name={this.props.itemForSale.merchandise.name}
                description={this.props.itemForSale.merchandise.description}
                expandableElements={[
                    <div>
                        <div>Количество: {this.props.itemForSale.amount}</div>
                        <div>Дата выставления на
                            продажу: {FormatDate(new Date(this.props.itemForSale.creationDate))}</div>
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
                                                       onSubmit={form => this.props.onItemPurchase(form.balanceId)}
                            />
                        }

                    </div>
                ]}

                alwaysExpand={true}
            />
        )
    }
}