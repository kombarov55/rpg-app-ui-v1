import React from "react";
import FormTitleLabel from "../../../Common/Labels/FormTitleLabel";
import SubmitButton from "../../../Common/Buttons/SubmitButton";
import InputLabel from "../../../Common/Labels/InputLabel";
import List from "../../../Common/Lists/List";
import ListItem from "../../../Common/ListElements/ListItem";
import _ from "lodash"
import PriceInput from "../../../Common/Input/PriceInput";

export default class SpellPurchaseForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = props.initialState == null ?
            Object.assign({}, this.initialState, {spellCount: props.spellCount}) :
            props.initialState
    }

    initialState = {
        priceCombinations: []
    }

    render() {
        return (
            <div>
                <FormTitleLabel text={"Покупка заклинания:"}/>

                <InputLabel text={"Количество изученных заклинаний: " + this.state.spellCount}/>

                <List title={"Стоимость:"}
                      values={this.state.priceCombinations.map(amounts =>
                          <ListItem text={amounts.map(amount => amount.name + ": " + amount.amount).join(" + ")}
                                    onDelete={() => this.setState(state => ({
                                        priceCombinations: state.priceCombinations.filter(savedList => !_.isEqual(savedList, amounts))
                                    }))}
                          />
                      )}
                />
                <PriceInput currencies={this.props.currencyNames}
                            onSubmit={amounts => this.setState(state => ({
                                priceCombinations: state.priceCombinations.concat([amounts])
                            }))}
                />

                <SubmitButton text={"Сохранить"}
                              onClick={() => this.props.onSubmit(this.state)}
                />
            </div>
        )
    }
}