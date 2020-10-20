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
import {findCharacterByNameUrl, findOrganizationByGameIdAndNameUrl} from "../../../../util/Parameters";

export default class TransferForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            destinationType: TransferDestination.CHARACTER,
            characterDestination: null,
            organizationDestination: null,
            currency: null,
            amount: null
        }
    }

    render() {
        return (
            <div>
                <FormTitleLabel text={"Перевод:"}/>

                <InputLabel text={"Кому?"}/>
                <SelectButton value={this.state.destinationType}
                              onChange={e => this.setState({
                                  destinationType: e.target.value,
                                  characterDestination: null,
                                  organizationDestination: null
                              })}
                              options={[
                                  {label: "Персонажу", value: TransferDestination.CHARACTER},
                                  {label: "Организации", value: TransferDestination.ORGANIZATION}
                              ]}
                />

                {this.state.destinationType === TransferDestination.CHARACTER ?
                    this.inputForCharacter() :
                    this.inputForOrganization()
                }

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
                                  if (this.state.destinationType === TransferDestination.CHARACTER && this.state.characterDestination == null) {
                                      Popup.error("Пожалуйста, заполните получателя.")
                                      return
                                  }

                                  if (this.state.destinationType === TransferDestination.ORGANIZATION && this.state.organizationDestination == null) {
                                      Popup.error("Пожалуйста, заполните получателя.")
                                      return
                                  }

                                  if (
                                      this.state.currency == null ||
                                      this.state.amount == null ||
                                      !IsNumeric(this.state.amount)
                                  ) {
                                      Popup.error("Пожалуйста, заполните поля правильно.")
                                      return
                                  }


                                  this.props.onSubmit(this.state)
                              }}
                />
            </div>
        )
    }

    inputForCharacter() {
        return (
            <div>
                <List title={"Получатель:"}
                      noItemsText={"Не выбран"}
                      values={[this.state.characterDestination].filter(v => v != null).map(destination =>
                          <ListItem text={destination.name}
                                    onDelete={() => this.setState({characterDestination: null})}
                          />
                      )}
                />

                <RemoteAutocomplete fieldToDisplay={"name"}
                                    onSelected={item => this.setState({characterDestination: item})}
                                    buildSyncUrl={input => findCharacterByNameUrl(this.props.gameId, input)}
                                    key={"character"}
                />
            </div>
        )
    }

    inputForOrganization() {
        return (
            <div>
                <List title={"Получатель:"}
                      noItemsText={"Не выбран"}
                      values={[this.state.organizationDestination].filter(v => v != null).map(destination =>
                          <ListItem text={destination.name}
                                    onDelete={() => this.setState({organizationDestination: null})}
                          />
                      )}
                />

                <RemoteAutocomplete fieldToDisplay={"name"}
                                    onSelected={item => this.setState({organizationDestination: item})}
                                    buildSyncUrl={input => findOrganizationByGameIdAndNameUrl(this.props.gameId, input)}
                                    key={"organization"}
                />
            </div>
        )
    }
}