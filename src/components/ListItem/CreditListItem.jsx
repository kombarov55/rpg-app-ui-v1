import React from "react";
import ExpandableListItem from "../Common/ListElements/ExpandableListItem";
import BulletList from "../Common/Lists/BulletList";
import FormatDate from "../../util/FormatDate";
import Btn from "../Common/Buttons/Btn";
import InputLabel from "../Common/Labels/InputLabel";
import Validation from "../../util/Validation";

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            formVisible: false
        }
    }


    render() {
        return (
            <ExpandableListItem
                name={`${this.props.credit.amount} ${this.props.credit.currencyName} на ${this.props.credit.durationInDays} дней.`}
                expandableElements={[
                    <div>
                        <BulletList values={[
                            `Полученная сумма: ${this.props.credit.amount} ${this.props.credit.currencyName}`,
                            `Выплачено: ${this.props.credit.payedAmount}`,
                            `Осталось выплатить: ${this.props.credit.debtAmount}`,
                            `Дата открытия: ${FormatDate(new Date(this.props.credit.openingDate))}`,
                            `Дата окончания: ${FormatDate(new Date(this.props.credit.endingDate))}`,
                            `Длительность: ${this.props.credit.durationInDays} дней`,
                            `Дата последнего платежа: ${this.getLastPaymentDateFormatted(this.props.credit.lastPaymentDate)}`,
                            this.props.credit.isOverdue ? "Платёж просрочен" : "Просрочек нет",
                            `Осталось дней: ${this.props.credit.remainingDays}`,
                            `Кредит взят у организации: "${this.props.credit.organizationName}"`
                        ]}
                        />
                        <Btn text={"Внести сумму"} onClick={() => this.setState({formVisible: true})}/>
                        {
                            this.state.formVisible &&
                            <div>
                                <InputLabel text={"Какую сумму внести?"}/>
                                <input value={this.state.amount}
                                       onChange={e => this.setState({amount: e.target.value})}
                                />
                                <Btn text={"Внести"} onClick={() => {
                                    const success = Validation.run(
                                        Validation.between(this.state.amount, 0, this.props.credit.debtAmount, "сумма")
                                    )

                                    if (success) {
                                        this.props.onPartialPayClicked(this.state.amount)
                                        this.setState({formVisible: false})
                                    }
                                }}/>
                            </div>
                        }
                        <Btn text={"Закрыть кредит"} onClick={() => this.props.onPayWholeCreditClicked()}/>
                    </div>
                ]}
                alwaysExpand={true}
            />
        )
    }

    getLastPaymentDateFormatted(lastPaymentDate) {
        if (lastPaymentDate != null) {
            return FormatDate(new Date(lastPaymentDate))
        } else {
            return "отсутствует"
        }
    }
}