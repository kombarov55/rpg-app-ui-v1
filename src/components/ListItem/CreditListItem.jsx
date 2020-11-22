import React from "react";
import ExpandableListItem from "../Common/ListElements/ExpandableListItem";
import BulletList from "../Common/Lists/BulletList";
import FormatDate from "../../util/FormatDate";
import getOrDefault from "../../util/getOrDefault";

export default class extends React.Component {

    render() {
        return (
            <ExpandableListItem name={`${this.props.credit.amount} ${this.props.credit.currencyName} на ${this.props.credit.durationInDays} дней.`}
                expandableElements={[
                    <div>
                        <BulletList values={[
                            `Полученная сумма: ${this.props.credit.amount} ${this.props.credit.currencyName}`,
                            `Выплачено: ${this.props.credit.payedAmount}`,
                            `Дата открытия: ${FormatDate(new Date(this.props.credit.openingDate))}`,
                            `Дата окончания: ${FormatDate(new Date(this.props.credit.endingDate))}`,
                            `Длительность: ${this.props.credit.durationInDays} дней`,
                            `Дата последнего платежа: ${this.getLastPaymentDateFormatted(this.props.credit.lastPaymentDate)}`,
                            this.props.credit.isOverdue ? "Платёж просрочен" : "Просрочек нет",
                            `Минимальный платёж: ${this.props.credit.minimalPayment}`,
                            `Осталось дней: ${this.props.credit.remainingDays}`,
                            `Кредит взят у организации: "${this.props.credit.organizationName}"`
                        ]}
                        />
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