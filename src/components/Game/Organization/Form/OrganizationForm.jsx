import React from "react";
import InnerFormStyle from "../../../../styles/InnerFormStyle";
import InputLabel from "../../../Common/Labels/InputLabel";
import {InputTextarea} from "primereact/inputtextarea";
import {SelectButton} from "primereact/selectbutton";
import OrganizationType from "../../../../data-layer/enums/OrganizationType";
import FormTitleLabel from "../../../Common/Labels/FormTitleLabel";
import List from "../../../Common/Lists/List";
import ExpandableListItem from "../../../Common/ListElements/ExpandableListItem";
import PriceInput from "../../../Common/Input/PriceInput";
import ListItem from "../../../Common/ListElements/ListItem";
import priceCombinationToString from "../../../../util/priceCombinationToString";
import SubmitButton from "../../../Common/Buttons/SubmitButton";

export default class OrganizationForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = this.props.initialState != null ?
            this.props.initialState :
            this.initialState
    }

    initialState = {
        name: "",
        description: "",
        type: null,
        heads: [],
        initialBudget: []
    }


    render() {
        return (
            <div style={InnerFormStyle}>
                <FormTitleLabel text={"Создание организации"}/>

                <InputLabel text={"Тип:"}/>
                <SelectButton
                    options={OrganizationType.values.map(v => ({label: v.value, value: v}))}
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

                <List title={"Главы организации: (до 3 чел.)"}
                      noItemsText={"Не выбраны"}
                      isAddButtonVisible={true}
                      values={this.props.userAccounts.map(v =>
                          <ExpandableListItem
                              img={v.img}
                              name={v.fullName}

                              key={v.fullName}
                          />)}
                />

                <InputLabel text={"Начальный бюджет:"}/>
                <List title={"Начальный бюджет:"}
                      noItemsText={"Не указан"}
                      values={this.state.initialBudget.map(amount =>
                          <ListItem text={amount.name + ": " + amount.amount}
                                    onDelete={() => this.setState(state => ({
                                        initialBudget: state.initialBudget.filter(v => v.name !== amount.name)
                                    }))}
                          />)}
                />
                <PriceInput
                    currencies={this.props.currencies}
                    onSubmit={form => this.setState(state => ({
                        initialBudget: state.initialBudget.concat(form)
                    }))}
                />

                <SubmitButton text={"Сохранить"} onClick={() => console.log(this.state)} />


            </div>
        )
    }

}