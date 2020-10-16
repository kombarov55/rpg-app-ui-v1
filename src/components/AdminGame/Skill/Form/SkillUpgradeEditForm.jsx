import React from "react";
import FormTitleLabel from "../../../Common/Labels/FormTitleLabel";
import {InputTextarea} from "primereact/inputtextarea";
import InputLabel from "../../../Common/Labels/InputLabel";
import List from "../../../Common/Lists/List";
import ListItem from "../../../Common/ListElements/ListItem";
import _ from "lodash"
import PriceInput from "../../../Common/Input/PriceInput";
import SubmitButton from "../../../Common/Buttons/SubmitButton";
import Popup from "../../../../util/Popup";

export default class SkillUpgradeEditForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = props.initialState
    }

    render() {
        return (
            <div>
                <FormTitleLabel text={"Редактирование повышения навыка:"}/>

                <InputLabel text={"Описание:"}/>
                <InputTextarea value={this.state.description}
                               onChange={e => this.setState({description: e.target.value})}
                />

                <List title={"Стоимость:"}
                      noItemsText={"Не указана.."}
                      values={this.state.prices.map(listOfAmount =>
                          <ListItem text={listOfAmount.map(amount => amount.name + ": " + amount.amount).join(" + ")}
                                    onDelete={() => this.setState(state => ({
                                        prices: state.prices.filter(listOfAmountInProperty => !_.isEqual(listOfAmount, listOfAmountInProperty))
                                    }))}
                          />
                      )}
                />
                <PriceInput currencies={this.props.currencyNames}
                            onSubmit={listOfAmount => this.setState(state => ({prices: state.prices.concat([listOfAmount])}))}
                />

                <SubmitButton text={"Обновить"}
                              onClick={() => {
                                  if (
                                      this.state.description == null || this.state.description == ""
                                  ) {
                                      Popup.error("Пожалуйста, введите описание.")
                                  }

                                  this.props.onSubmit(this.state)
                              }}
                />
            </div>
        )
    }

}