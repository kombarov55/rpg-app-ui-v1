import React from "react";
import FormTitleLabel from "../../../Common/Labels/FormTitleLabel";
import LocalAutocomplete from "../../../Common/Input/LocalAutocomplete";
import InputLabel from "../../../Common/Labels/InputLabel";
import ListItem from "../../../Common/ListElements/ListItem";
import PriceInput from "../../../Common/Input/PriceInput";
import SubmitButton from "../../../Common/Buttons/SubmitButton";
import priceCombinationToString from "../../../../util/AmountsToString";
import Popup from "../../../../util/Popup";

export default class ItemForSaleForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = this.props.initialState == null ?
            this.initialState :
            this.props.initialState
    }

    initialState = {
        merchandise: null,
        price: [],
        amount: 1
    }

    render() {
        return (
            <div>
                <FormTitleLabel text={"Добавление товара на продажу"}/>

                <InputLabel text={"Товар:"}/>
                <LocalAutocomplete
                    items={this.props.merchandiseList}
                    filteringField={"name"}
                    itemRenderer={item =>
                        <ListItem text={item.name}
                                  onClick={() => this.setState({merchandise: item})}
                                  selected={item === this.state.merchandise}
                        />
                    }
                />

                <InputLabel text={"Стоимость:"}/>
                <ListItem text={this.state.price.length  == 0 ? "Не указана.." : priceCombinationToString(this.state.price)}/>
                <PriceInput currencies={this.props.currencies.map(v => v.name)}
                            onSubmit={amounts => this.setState({price: amounts})}
                />

                <InputLabel text={"Количество:"}/>
                <input value={this.state.amount}
                       onChange={e => this.setState({amount: e.target.value})}
                />

                <SubmitButton text={"Сохранить"}
                              onClick={() => {
                                  if (this.state.merchandise == null || this.state.price.length == 0 || this.state.amount <= 0) {
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