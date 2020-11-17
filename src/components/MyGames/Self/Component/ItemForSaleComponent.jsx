import React from "react";
import ExpandableListItem from "../../../Common/ListElements/ExpandableListItem";
import AmountsToString from "../../../../util/AmountsToString";
import Btn from "../../../Common/Buttons/Btn";
import RedButton from "../../../Common/Buttons/RedButton";
import FormatDate from "../../../../util/FormatDate";
import {get} from "../../../../util/Http";
import {getCharacterBalances} from "../../../../util/Parameters";
import BuyerBalanceSelectionForm from "../../../Common/Input/BuyerBalanceSelectionForm";
import BulletList from "../../../Common/Lists/BulletList";
import GetDestinationByName from "../../../../data-layer/enums/GetDestinationByName";
import SkillInfluenceToString from "../../../../util/SkillInfluenceToString";

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
                        <BulletList values={[
                            GetDestinationByName(this.props.itemForSale.item.destination),
                            "Категория: " + this.props.itemForSale.item.category,
                            "Тип: " + this.props.itemForSale.item.type,
                            this.props.itemForSale.item.slots + " слот(ов)",
                            this.props.itemForSale.item.skillInfluences.map(it => SkillInfluenceToString(it)).join(", "),
                            this.props.itemForSale.item.canBeEquipped ? "Можно надеть" : "Нельзя надеть",
                            this.props.itemForSale.item.canBeCrafted ? "Можно скрафтить" : "Нельзя скрафтить",
                            this.props.itemForSale.item.canBeUsedInCraft ? "Можно использовать в крафте" : "Нельзя использовать в крафте",
                            `Дата выставления на продажу: ${FormatDate(new Date(this.props.itemForSale.creationDate))}`,
                            (
                                this.props.itemForSale.ownerName &&
                                `Владелец: ${this.props.itemForSale.ownerName}`
                            )
                        ]}/>
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