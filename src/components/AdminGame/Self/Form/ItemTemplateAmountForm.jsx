import React from "react";
import SubmitButton from "../../../Common/Buttons/SubmitButton";
import RemoteAutocomplete from "../../../Common/Input/RemoteAutocomplete";
import {findUsableInCraftItemTemplatesByGameIdAndNameUrl} from "../../../../util/Parameters";
import Validation from "../../../../util/Validation";
import InputLabel from "../../../Common/Labels/InputLabel";

export default class extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            itemTemplate: null,
            amount: null
        }
    }

    render() {
        return (
            <div>
                <RemoteAutocomplete
                    buildSyncUrl={input => findUsableInCraftItemTemplatesByGameIdAndNameUrl(this.props.gameId, input)}
                    onSelected={itemTemplate => this.setState({itemTemplate: itemTemplate})}
                />

                <InputLabel text={"Количество:"}/>
                <input value={this.state.amount}
                       onChange={e => this.setState({amount: e.target.value})}
                />

                <SubmitButton text={"Добавить"}
                              onClick={() => {
                                  const success = Validation.run(
                                      Validation.nonNull(this.state.itemTemplate, "Предмет"),
                                      Validation.between(this.state.amount, 0, Number.MAX_SAFE_INTEGER, "Количество")
                                  )
                                  if (success) {
                                      this.props.onSubmit(this.state)
                                  }
                              }}
                />
            </div>
        )
    }
}