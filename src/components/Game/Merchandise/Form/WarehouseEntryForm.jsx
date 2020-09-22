import React from "react";
import InnerFormStyle from "../../../../styles/InnerFormStyle";
import InputLabel from "../../../Common/Labels/InputLabel";
import SubmitButton from "../../../Common/Buttons/SubmitButton";
import IsNumeric from "../../../../util/IsNumeric";
import FormTitleLabel from "../../../Common/Labels/FormTitleLabel";
import {AutoComplete} from "primereact/autocomplete";
import HorizontalListItem from "../../../Common/ListElements/HorizontalListItem";

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
                <FormTitleLabel text={"Товар на склад"}/>
                <AutoComplete
                    value={this.state.merchandise}
                    suggestions={this.state.filteredMerchandiseList}
                    completeMethod={e => this.completeMethod(e.query)}
                    field={"name"}
                    onChange={e => this.setState({merchandise: e.value})}
                    itemTemplate={item => this.itemTemplate(item)}
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

    completeMethod(name) {
        setTimeout(() => {
            this.setState({
                filteredMerchandiseList: !name.trim().length ?
                    this.props.merchandiseList :
                    this.props.merchandiseList.filter(v => v.name.toLowerCase().startsWith(name.toLowerCase()))
            })
        }, 250)
    }

    itemTemplate(merchandise) {
        return (
            <HorizontalListItem
                name={merchandise.name}
                imgSrc={merchandise.img}
            />)
    }

    onSubmitClicked() {
        if (!IsNumeric(this.state.amount) || this.state.merchandise == null) return

        this.props.onSubmit(this.state)
        this.setState(this.initialState)
    }

}
