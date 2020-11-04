import React from "react";
import SubmitButton from "../../../Common/Buttons/SubmitButton";
import {SelectButton} from "primereact/selectbutton";
import InputLabel from "../../../Common/Labels/InputLabel";

export default class BuyerBalanceSelectionForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            balanceId: ""
        }
    }

    render() {
        return (
            <div>
                <InputLabel text={"С какого счёта будет производиться покупка?"}/>
                <SelectButton
                    options={this.props.balances.map(balanceDto => ({
                        label: `${balanceDto.name} (${this.getLabelByType(balanceDto.type)})`,
                        value: balanceDto.id
                    }))}
                    value={this.state.balanceId}
                    onChange={e => this.setState({balanceId: e.target.value})}
                />

                <SubmitButton text={`Купить за ${this.props.price}`}
                              onClick={() => {
                                  this.props.onSubmit(this.state)
                              }}
                />
            </div>
        )
    }

    getLabelByType(type) {
        switch (type) {
            case "CHARACTER":
                return "Персонаж"
            case "ORGANIZATION":
                return "Организация"
        }
    }

}