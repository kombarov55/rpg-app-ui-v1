import React from "react";
import ExpandableListItemWithBullets from "../Common/ListElements/ExpandableListItemWithBullets";

export default class extends React.Component {
    render() {
        const credit = this.props.credit
        
        return (
            <ExpandableListItemWithBullets name={`${credit.owner.name}: ${credit.debtAmount} ${credit.currencyName}`}
                                           bullets={[
                                               `Просрочка на ${credit.overdueDurationInDays} дней`
                                           ]}
                                           alwaysExpand={true}
            />
        )
    }
}