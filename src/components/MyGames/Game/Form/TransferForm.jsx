import React from "react";
import FormTitleLabel from "../../../Common/Labels/FormTitleLabel";
import SubmitButton from "../../../Common/Buttons/SubmitButton";
import InputLabel from "../../../Common/Labels/InputLabel";
import {SelectButton} from "primereact/selectbutton";
import TransferDestination from "../../../../data-layer/enums/TransferDestination";
import IsNumeric from "../../../../util/IsNumeric";
import Popup from "../../../../util/Popup";
import List from "../../../Common/Lists/List";
import ListItem from "../../../Common/ListElements/ListItem";
import RemoteAutocomplete from "../../../Common/Input/RemoteAutocomplete";
import {findCharacterByNameUrl} from "../../../../util/Parameters";

export default class TransferForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            transferDestination: TransferDestination.CHARACTER,
            destination: null,

            currency: null,
            amount: null
        }
    }

    render() {
        return (
            <div>
                <FormTitleLabel text={"Перевод:"}/>

                <InputLabel text={"Кому?"}/>
                <SelectButton value={this.state.transferDestination}
                              onChange={e => this.setState({transferDestination: e.target.value})}
                              options={[
                                  {label: "Персонажу", value: TransferDestination.CHARACTER},
                                  {label: "Организации", value: TransferDestination.ORGANIZATION}
                              ]}
                />

                <List title={"Получатель:"}
                      noItemsText={"Не выбран"}
                      values={[this.state.destination].filter(v => v != null).map(destination =>
                          <ListItem text={destination.name}/>
                      )}
                />

                <RemoteAutocomplete fieldToDisplay={"name"}
                                    onSelected={item => this.setState({destination: item})}
                                    buildSyncUrl={input => findCharacterByNameUrl(this.props.gameId, input)}
                />

                <InputLabel text={"Валюта:"}/>
                <SelectButton value={this.state.currency}
                              onChange={e => this.setState({currency: e.target.value})}
                              options={this.props.currencyNames.map(name => ({label: name, value: name}))}
                />

                <InputLabel text={"Сумма:"}/>
                <input value={this.state.amount}
                       onChange={e => this.setState({amount: e.target.value})}
                />

                <SubmitButton text={"Отправить"}
                              onClick={() => {
                                  if (
                                      this.state.destination == null ||
                                      this.state.currency == null ||
                                      this.state.amount == null ||
                                      !IsNumeric(this.state.amount)
                                  ) {
                                      Popup.info("Пожалуйста, заполните поля правильно.")
                                      return
                                  }
                                  this.props.onSubmit(this.state)
                              }}
                />
            </div>
        )
    }
}