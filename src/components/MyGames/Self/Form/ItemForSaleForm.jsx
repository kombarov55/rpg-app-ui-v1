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
import {itemTemplateByGameIdAndName} from "../../../../util/Parameters";
import getOrDefault from "../../../../util/getOrDefault";

/**
 * props: {
 *     gameId: String
 *     mode: [REMOTE, LOCAL]
 *     itemTemplateList: []?
 *     currencyNames: [String]
 *     onSubmit: () => {}
 * }
 */
export default class ItemForSaleForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            itemTemplate: null,
            price: []
        }
    }

    render() {
        return (
            <div>
                <FormTitleLabel text={"Добавление предмета на продажу"}/>

                <InputLabel text={"Предмет:"}/>
                {this.getAutocomplete()}

                <InputLabel text={"Стоимость:"}/>
                <ListItem text={this.state.price.length === 0 ? "Не указана.." : priceCombinationToString(this.state.price)}
                />
                <PriceInput currencies={this.props.currencyNames}
                            onSubmit={amounts => this.setState({price: amounts})}
                />

                <SubmitButton text={"Выставить на продажу"}
                              onClick={() => {
                                  if (this.state.itemTemplate == null || this.state.price.length === 0) {
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
                                    buildSyncUrl={name => itemTemplateByGameIdAndName(this.props.gameId, name)}
                                    onSelected={itemTemplate => this.setState({itemTemplate: itemTemplate})}
                />
            )
        } else {
            return (
                <LocalAutocomplete items={this.props.itemTemplates}
                                   fieldToDisplay={"name"}
                                   onSelected={itemTemplate => this.setState({itemTemplate: itemTemplate})}
                />
            )
        }
    }
}