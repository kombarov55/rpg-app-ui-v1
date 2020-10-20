import React from "react";
import InnerFormStyle from "../../../../styles/InnerFormStyle";
import InputLabel from "../../../Common/Labels/InputLabel";
import {InputTextarea} from "primereact/inputtextarea";
import {SelectButton} from "primereact/selectbutton";
import OrganizationType from "../../../../data-layer/enums/OrganizationType";
import FormTitleLabel from "../../../Common/Labels/FormTitleLabel";
import SubmitButton from "../../../Common/Buttons/SubmitButton";
import Popup from "../../../../util/Popup";

export default class OrganizationForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = this.props.initialState != null ?
            this.props.initialState :
            this.initialState

    }

    initialState = {
        name: null,
        description: null,
        type: null
    }


    render() {
        return (
            <div style={InnerFormStyle}>
                <FormTitleLabel text={"Создание организации"}/>

                <InputLabel text={"Тип:"}/>
                <SelectButton
                    options={OrganizationType.values.map(v => ({label: v.value, value: v.name}))}
                    value={this.state.type}
                    onChange={e => this.setState({type: e.target.value})}
                />

                <InputLabel text={"Название:"}/>
                <input value={this.state.name}
                       onChange={e => this.setState({name: e.target.value})}
                />

                <InputLabel text={"Описание:"}/>
                <InputTextarea autoResize={true}
                               value={this.state.description}
                               onChange={e => this.setState({description: e.target.value})}
                />

                <SubmitButton text={"Сохранить"} onClick={() => {
                    if (
                        this.state.name == null ||
                        this.state.type == null
                    ) {
                        Popup.error("Пожалуйста, заполните все поля: [Название, Тип, Описание]")
                        return
                    }

                    this.props.onSubmit(this.state)
                    this.setState(this.initialState)
                }}/>
            </div>
        )
    }

}