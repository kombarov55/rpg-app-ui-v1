import React from "react";
import FormTitleLabel from "../../../Common/Labels/FormTitleLabel";
import InputLabel from "../../../Common/Labels/InputLabel";
import ListItem from "../../../Common/ListElements/ListItem";
import PriceInput from "../../../Common/Input/PriceInput";
import SubmitButton from "../../../Common/Buttons/SubmitButton";
import priceCombinationToString from "../../../../util/AmountsToString";
import Popup from "../../../../util/Popup";
import LocalAutocomplete from "../../../Common/Input/LocalAutocomplete";
import AutocompleteComponentMode from "../../../../data-layer/enums/AutocompleteComponentMode";
import RemoteAutocomplete from "../../../Common/Input/RemoteAutocomplete";
import {merchandiseByGameIdAndName} from "../../../../util/Parameters";
import getOrDefault from "../../../../util/getOrDefault";

/**
 * props: {
 *     gameId: String
 *     mode: [REMOTE, LOCAL]
 *     merchandiseList: []?
 *     currencyNames: [String]
 *     onSubmit: () => {}
 * }
 */
export default class ItemForSaleForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            merchandise: null,
            price: []
        }
    }

    render() {
        return (
            <div>
                <FormTitleLabel text={"Добавление товара на продажу"}/>

                <InputLabel text={"Товар:"}/>
                {this.getAutocomplete()}

                <InputLabel text={"Стоимость:"}/>
                <ListItem text={this.state.price.length === 0 ? "Не указана.." : priceCombinationToString(this.state.price)}
                />
                <PriceInput currencies={this.props.currencyNames}
                            onSubmit={amounts => this.setState({price: amounts})}
                />

                <SubmitButton text={"Выставить на продажу"}
                              onClick={() => {
                                  if (this.state.merchandise == null || this.state.price.length === 0) {
                                      Popup.error("Заполните все поля: Товар, Стоимость")
                                      return
                                  }

                                  this.props.onSubmit(this.state)
                                  this.setState(this.initialState)
                              }}
                />

            </div>
        )
    }

    getAutocomplete() {
        const mode = getOrDefault(this.props.mode, AutocompleteComponentMode.LOCAL)

        if (mode === AutocompleteComponentMode.REMOTE) {
            return (
                <RemoteAutocomplete fieldToDisplay={"name"}
                                    buildSyncUrl={name => merchandiseByGameIdAndName(this.props.gameId, name)}
                                    onSelected={merchandise => this.setState({merchandise: merchandise})}
                />
            )
        } else {
            return (
                <LocalAutocomplete items={this.props.merchandiseList}
                                   fieldToDisplay={"name"}
                                   onSelected={merchandise => this.setState({merchandise: merchandise})}
                />
            )
        }
    }
}