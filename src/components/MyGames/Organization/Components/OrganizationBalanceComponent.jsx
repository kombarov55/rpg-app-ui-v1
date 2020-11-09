import React from "react";
import List from "../../../Common/Lists/List";
import ListItem from "../../../Common/ListElements/ListItem";
import Btn from "../../../Common/Buttons/Btn";
import MoneyForm from "../Form/MoneyForm";
import {getCharacterBalances} from "../../../../util/Parameters";
import {get} from "../../../../util/Http";

export default class OrganizationBalanceComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            addBalanceVisible: false,

            balances: []
        }
    }

    render() {
        return (
            <div>
                <List title={"Бюджет: "}
                      values={this.props.balance.map(v =>
                          <ListItem text={v.name + ": " + v.amount}/>
                      )}
                />
                {
                    this.state.addBalanceVisible ?
                        <MoneyForm title={"Введите сумму и счёт"}
                                   currencyNames={this.props.currencyNames}
                                   balances={this.state.balances}
                                   onSubmit={({name, amount, buyerBalance}) => {}}
                        />
                        :
                        <Btn text={"Пополнить бюджет со своего счёта"}
                             onClick={() => get(getCharacterBalances(this.props.characterId), rs => this.setState({
                                 addBalanceVisible: true,
                                 balances: rs
                             }))}
                        />
                }
            </div>
        )
    }
}