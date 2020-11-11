import React from "react";
import FormTitleLabel from "../../../Common/Labels/FormTitleLabel";
import InputLabel from "../../../Common/Labels/InputLabel";
import ListItem from "../../../Common/ListElements/ListItem";
import PriceInput from "../../../Common/Input/PriceInput";
import SubmitButton from "../../../Common/Buttons/SubmitButton";
import priceCombinationToString from "../../../../util/AmountsToString";
import Popup from "../../../../util/Popup";
import RemoteAutocomplete from "../../../Common/Input/RemoteAutocomplete";
import {merchandiseByGameIdAndName} from "../../../../util/Parameters";
import LocalAutocomplete from "../../../Common/Input/LocalAutocomplete";

/**
 * props: {
 *     gameId: String,
 *     currencyNames: [String]
 * }
 */
export default class ItemForSaleForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = this.props.initialState == null ?
            this.initialState :
            this.props.initialState
    }

    initialState = {
        merchandise: null,
        price: []
    }

    render() {
        return (
            <div>
                <FormTitleLabel text={"Добавление товара на продажу"}/>

                <InputLabel text={"Товар:"}/>
                <LocalAutocomplete items={this.props.merchandiseList}
                                   onSelected={merchandise => this.setState({merchandise: merchandise})}
                />

                <InputLabel text={"Стоимость:"}/>
                <ListItem text={this.state.price.length === 0 ? "Не указана.." : priceCombinationToString(this.state.price)}
                />
                <PriceInput currencies={this.props.currencyNames}
                            onSubmit={amounts => this.setState({price: amounts})}
                />

                <SubmitButton text={"Выставить на продажу"}
                              onClick={() => {
                                  if (this.state.merchandise == null || this.state.price.length === 0 || this.state.amount <= 0) {
                                      Popup.error("Заполните все поля: Товар, Стоимость, Количество")
                                      return
                                  }

                                  this.props.onSubmit(this.state)
                                  this.setState(this.initialState)
                              }}
                />

            </div>
        )
    }

}