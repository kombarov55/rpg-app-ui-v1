import React from "react";
import InputLabel from "../Common/Labels/InputLabel";
import AddItemButton from "../Common/Buttons/AddItemButton";
import PriceInput from "../Common/Input/PriceInput";
import List from "../Common/Lists/List";
import ListItemSmall from "../Common/ListElements/SmallListItem";
import priceCombinationToString from "../../util/priceCombinationToString";
import FormTitleLabel from "../Common/Labels/FormTitleLabel";
import Btn from "../Common/Buttons/Btn";
import SmallDeletableListItem from "../Common/ListElements/SmallDeletableListItem";

/**
 * onSubmit: {spellCount: Int, priceCombinationList: [[{name: String, amount: Int}]]}
 */
export default class SpellSchoolLvlUpgradePriceForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initialState
    }

    initialState = {
        spellCount: 0,
        priceCombinationList: []
    }

    render() {
        return (
            <div>
                <FormTitleLabel text={"Стоимость заклинания:"}/>

                <InputLabel text={this.props.spellCount + " заклинаний выучено"}/>

                <InputLabel text={"Варианты цен:"}/>
                <List noItemsText={"Цены не указаны"}
                      values={this.state.priceCombinationList.map(priceCombination =>
                          <SmallDeletableListItem text={priceCombinationToString(priceCombination)}
                                                  onDelete={() => this.setState(state => ({
                                                      priceCombinationList: this.state.priceCombinationList.filter(it => it !== priceCombination)
                                                  }))}
                          />)}
                />
                <PriceInput currencies={["Золото", "Серебро", "Опыт"]}
                            onSubmit={price => this.onPriceSubmitted(price)}
                />
                <Btn text={"Сохранить стоимость"} onClick={() => this.onSaveClicked()}/>
            </div>
        )
    }

    onSaveClicked() {
        if (this.state.priceCombinationList.length === 0) return

        this.props.onSubmit(Object.assign({}, this.state, {spellCount: this.props.spellCount}))
        this.setState(this.initialState)
    }

    onPriceSubmitted(priceCombination) {
        this.setState(state => ({priceCombinationList: state.priceCombinationList.concat([priceCombination])}))
    }
}