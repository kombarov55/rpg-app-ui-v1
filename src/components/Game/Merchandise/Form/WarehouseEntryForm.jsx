import React from "react";
import InnerFormStyle from "../../../../styles/InnerFormStyle";
import InputLabel from "../../../Common/Labels/InputLabel";
import SubmitButton from "../../../Common/Buttons/SubmitButton";
import IsNumeric from "../../../../util/IsNumeric";
import FormTitleLabel from "../../../Common/Labels/FormTitleLabel";
import {SelectButton} from "primereact/selectbutton";

export default class WarehouseEntryForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = Object.assign({}, props.initialState != null ? props.initialState : this.initialState)
    }

    initialState = {
        filteredMerchandiseList: [],
        merchandise: null,
        amount: null
    }


    render() {
        return (
            <div style={InnerFormStyle}>
                <FormTitleLabel text={"Предмет + количество:"}/>

                <InputLabel text={"Предмет:"}/>
                <SelectButton options={this.props.merchandiseList.map(v => ({label: v.name, value: v}))}
                              value={this.state.merchandise}
                              onChange={e => this.setState({merchandise: e.target.value})}
                />
                <InputLabel text={"Количество:"}/>
                <input value={this.state.amount}
                       onChange={e => this.setState({amount: e.target.value})}
                />

                <SubmitButton text={"Сохранить"}
                              onClick={() => this.onSubmitClicked()}
                />
            </div>
        )
    }

    onSubmitClicked() {
        if (!IsNumeric(this.state.amount) || this.state.merchandise == null) return

        this.props.onSubmit(this.state)
        this.setState(this.initialState)
    }

}
