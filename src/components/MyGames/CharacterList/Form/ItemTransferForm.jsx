import React from "react";
import FormTitleLabel from "../../../Common/Labels/FormTitleLabel";
import SubmitButton from "../../../Common/Buttons/SubmitButton";
import {SelectButton} from "primereact/selectbutton";
import TransferDestination from "../../../../data-layer/enums/TransferDestination";
import RemoteAutocomplete from "../../../Common/Input/RemoteAutocomplete";
import {findCharacterByNameUrl, findOrganizationByGameIdAndNameUrl} from "../../../../util/Parameters";
import Popup from "../../../../util/Popup";

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

                {this.getAutocomplete()}

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