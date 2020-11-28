import React from "react";
import FormTitleLabel from "../../../Common/Labels/FormTitleLabel";
import SubmitButton from "../../../Common/Buttons/SubmitButton";
import {SelectButton} from "primereact/selectbutton";
import TransferDestination from "../../../../data-layer/enums/TransferDestination";
import RemoteAutocomplete from "../../../Common/Input/RemoteAutocomplete";
import {findCharacterByNameUrl, findOrganizationByGameIdAndNameUrl} from "../../../../util/Parameters";
import Popup from "../../../../util/Popup";
import ListItem from "../../../Common/ListElements/ListItem";

export default class extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            destinationType: TransferDestination.CHARACTER,
            destination: null
        }
    }

    render() {
        return (
            <div>
                <FormTitleLabel text={"Кому передать предмет?"}/>
                <SelectButton options={TransferDestination.values}
                              value={this.state.destinationType}
                              onChange={e => this.setState({
                                  destinationType: e.target.value,
                                  destination: null
                              })}
                />

                <DestinationInput value={this.state.destination}
                                  destinationType={this.state.destinationType}
                                  gameId={this.props.gameId}
                                  onSelected={destination => this.setState({destination: destination})}
                                  onRemoved={() => this.setState({destination: null})}
                />

                <SubmitButton text={"Отправить"}
                              onClick={() => {
                                  if (this.state.destination == null) {
                                      Popup.error("Выберите получателя.")
                                      return
                                  }
                                  this.props.onSubmit(this.state)
                              }}
                />
            </div>
        )
    }

    getAutocomplete() {
        if (this.state.destinationType === TransferDestination.CHARACTER) {
            return <RemoteAutocomplete fieldToDisplay={"name"}
                                       buildSyncUrl={name => findCharacterByNameUrl(this.props.gameId, name)}
                                       onSelected={selected => this.setState({destination: selected})}
            />
        } else {
            return <RemoteAutocomplete fieldToDisplay={"name"}
                                       buildSyncUrl={name => findOrganizationByGameIdAndNameUrl(this.props.gameId, name)}
                                       onSelected={selected => this.setState({destination: selected})}
            />
        }
    }
}

function DestinationInput(props) {
    const {destinationType, gameId} = props

    if (destinationType === TransferDestination.CHARACTER) {
        return (
            props.value != null ?
                <ListItem text={props.value?.name}
                          onDelete={() => props.onRemoved()}
                /> :
                <RemoteAutocomplete fieldToDisplay={"name"}
                                    buildSyncUrl={name => findCharacterByNameUrl(gameId, name)}
                                    onSelected={item => props.onSelected(item)}
                                    key={TransferDestination.CHARACTER}
                />
        )
    } else {
        return (
            props.value != null ?
                <ListItem text={props.value?.name}
                          onDelete={() => props.onRemoved()}
                /> :
                <RemoteAutocomplete fieldToDisplay={"name"}
                                    buildSyncUrl={name => findOrganizationByGameIdAndNameUrl(gameId, name)}
                                    onSelected={item => props.onSelected(item)}
                                    key={TransferDestination.ORGANIZATION}
                />
        )
    }
}