import React from "react";
import ExpandableListItem from "../Common/ListElements/ExpandableListItem";
import BulletList from "../Common/Lists/BulletList";
import CreditRequestStatus from "../../data-layer/enums/CreditRequestStatus";
import Btn from "../Common/Buttons/Btn";

export default class extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ExpandableListItem name={`Заявка от ${this.props.creditRequest.requester.name}`}
                                expandableElements={[
                                    <BulletList values={[
                                        `Длительность: ${this.props.creditRequest.duration}`,
                                        `Сумма: ${this.props.creditRequest.amount}: ${this.props.creditRequest.currencyName}`,
                                        `Цель: ${this.props.creditRequest.purpose}`,
                                        `Статус: ${CreditRequestStatus.getLabel(this.props.creditRequest.status)}`
                                    ]}
                                    />,
                                    <Btn text={"Одобрить"} onClick={() => this.props.onApprove()}/>,
                                    <Btn text={"Отказать"} onClick={() => this.props.onReject()}/>
                                ]}
                                alwaysExpand={true}
            />
        )
    }
}