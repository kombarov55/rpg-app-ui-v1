import React from "react";
import InputLabel from "../Common/InputLabel";
import AddItemButton from "../Common/AddItemButton";
import PriceInput from "../Common/PriceInput";
import List from "../Common/List";
import ListItemSmall from "../Common/ListItemSmall";
import priceListToString from "../../util/priceListToString";
import priceToString from "../../util/priceToString";

export default class SpellSchoolLvlUpgradePriceForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initialState
    }

    initialState = {
        spellCount: 0,
        prices: []
    }

    render() {
        return (
            <div>
                <InputLabel text={"Количество заклинаний:"}/>
                <input
                    name={"spellCount"}
                    value={this.state.spellCount}
                    onChange={e => this.setState({spellCount: e.target.value})}
                />

                <List noItemsText={"Стоимость не указана"}
                      values={this.state.prices.map(price => <ListItemSmall left={priceToString(price)}/>)}
                />

                <InputLabel text={"Стоимость:"}/>
                <PriceInput currencies={["Золото", "Серебро", "Опыт"]}
                            onSubmit={price => this.onPriceSubmitted(price)} />
                <AddItemButton text={"Добавить"} onClick={() => this.onSaveClicked()}/>
            </div>
        )
    }

    onSaveClicked() {
        this.props.onSubmit(this.state)
        this.setState(this.initialState)
    }

    onPriceSubmitted(currencyNameToAmountList) {
        console.log(currencyNameToAmountList)
        this.setState(state => ({prices: state.prices.concat(currencyNameToAmountList)}))
    }
}