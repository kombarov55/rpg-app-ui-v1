import React from "react";
import FormTitleLabel from "../../../Common/Labels/FormTitleLabel";
import InputLabel from "../../../Common/Labels/InputLabel";
import {upload} from "../../../../util/HttpRequests";
import {SelectButton} from "primereact/selectbutton";
import SubmitButton from "../../../Common/Buttons/SubmitButton";

export default class ShopForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = this.props.initialState != null ?
            this.props.initialState :
            this.initialState
    }

    initialState = {
        name: "",
        img: "",
        type: ""
    }

    render() {
        return (
            <div>
                <FormTitleLabel text={"Создание магазина организации"}/>

                <InputLabel text={"Название:"}/>
                <input value={this.state.name} onChange={e => this.setState({name: e.target.value})}/>

                <InputLabel text={"Картинка:"}/>
                <input type={"file"}
                       onChange={e => upload(
                           e.target.files[0],
                           filename => this.setState({img: filename})
                       )}
                />

                <SelectButton
                    options={[
                        {label: "Игроки", value: "PLAYERS"},
                        {label: "Организации", value: "ORGANIZATIONS"}
                    ]}
                    value={this.state.type}
                    onChange={e => this.setState({type: e.target.value})}
                />

                <SubmitButton text={"Сохранить"}
                              onClick={() => {
                                  if (this.state.name == "" || this.state.type == "") return

                                  this.props.onSubmit(this.state)
                                  this.setState(this.initialState)
                              }}
                />
            </div>
        )
    }

}