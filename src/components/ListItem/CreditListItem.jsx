import React from "react";
import ExpandableListItem from "../Common/ListElements/ExpandableListItem";
import BulletList from "../Common/Lists/BulletList";
import FormatDate from "../../util/FormatDate";

export default class extends React.Component {

    render() {
        return (
            <ExpandableListItem name={`${this.props.credit.amount} ${this.props.credit.currencyName} на ${this.props.credit.durationInDays} дней.`}
                expandableElements={[
                    <div>
                        <BulletList values={[
                            `Полученная сумма: ${this.props.credit.amount}: ${this.props.credit.currencyName}`,
                            `Выплачено: ${this.props.credit.payedAmount}`,
                            `Дата открытия: ${FormatDate(new Date(this.props.credit.openingDate))}`,
                            `Дата закрытия: ${FormatDate(new Date(this.props.credit.endingDate))}`,
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
}