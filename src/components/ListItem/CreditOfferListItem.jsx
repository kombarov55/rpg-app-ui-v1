import React from "react";
import ExpandableListItemWithBullets from "../Common/ListElements/ExpandableListItemWithBullets";

export default class extends React.Component {
    render() {
        return (
            <ExpandableListItemWithBullets
                name={this.props.creditOffer.name}
                description={this.props.creditOffer.description}
                bullets={[
                    "Ставка: " + this.props.creditOffer.rate + "%",
                    `Длительность: ${this.props.creditOffer.minDurationInDays} до ${this.props.creditOffer.maxDurationInDays} дней`,
                    "Валюта: " + this.props.creditOffer.currency.name,
                    "Мин. сумма кредитования: " + this.props.creditOffer.minAmount,
                    "Макс. сумма кредитования: " + this.props.creditOffer.maxAmount
                ]}

                onDeleteClicked={() => this.props.onDeleteClicked()}

                alwaysExpand={true}
            />
        )
    }
}