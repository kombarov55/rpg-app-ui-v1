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
import SubmitButton from "../../../Common/Buttons/SubmitButton";
import SmallerExpandableListItem from "../../../Common/ListElements/SmallerExpandableListItem";

export default class OrganizationForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = this.props.initialState != null ?
            this.props.initialState :
            this.initialState

        this.setState(this.formState)
    }

    initialState = {
        name: "",
        description: "",
        type: null,
        heads: [],
        initialBudget: []
    }

    formState = {
        addHeadInput: null,
        filteredUserAccountList: [],

        addHeadVisible: false,
        addInitialBudgetVisible: false
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
                      isAddButtonVisible={!this.state.addHeadVisible && this.state.heads.length < 3}
                      onAddClicked={() => this.setState({addHeadVisible: true})}
                      values={this.state.heads.map(v =>
                          <ExpandableListItem
                              img={v.img}
                              name={v.fullName}

                              key={v.fullName}
                          />)}
                />
                {
                    this.state.addHeadVisible &&
                        <List title={"Выбор игрока:"}
                              noItemsText={"Все доступные игроки уже выбраны!"}
                              values={this.props.userAccounts.filter(v => !this.state.heads.includes(v)).map(userAccount =>
                              <SmallerExpandableListItem
                                  img={userAccount.img}
                                  name={userAccount.fullName}
                                  description={userAccount.role}
                                  onClick={() => this.setState(state => ({
                                      heads: state.heads.concat(userAccount),
                                      addHeadVisible: false
                                  }))}

                                  alwaysExpand={true}
                                  key={userAccount.id}
                              />
                              )}
                        />
                }

                <InputLabel text={"Начальный бюджет:"}/>
                <List title={"Начальный бюджет:"}
                      noItemsText={"Не указан"}
                      isAddButtonVisible={!this.state.addInitialBudgetVisible}
                      onAddClicked={() => this.setState({addInitialBudgetVisible: true})}
                      values={this.state.initialBudget.map(amount =>
                          <ListItem text={amount.name + ": " + amount.amount}
                                    onDelete={() => this.setState(state => ({
                                        initialBudget: state.initialBudget.filter(v => v.name !== amount.name)
                                    }))}
                          />)}
                />
                {
                    this.state.addInitialBudgetVisible &&
                    <PriceInput
                        currencies={this.props.currencies}
                        onSubmit={form => this.setState(state => ({
                            initialBudget: state.initialBudget.filter(v => v.name !== form[0].name).concat(form[0]),
                            addInitialBudgetVisible: false
                        }))}
                    />
                }


                <SubmitButton text={"Сохранить"} onClick={() => {
                    console.log(this.state)

                    if (this.state.name == "" || this.state.heads.length == 0 || this.state.type == null) return

                    this.props.onSubmit(this.state)
                    this.setState(this.initialState)
                }}/>


            </div>
        )
    }

}