import React from "react";
import ListItem from "../Common/ListElements/ListItem";

export default class extends React.Component {

    render() {
        const maxEquippedAmount = this.props.maxEquippedAmount

        return (
            <ListItem text={`${maxEquippedAmount.itemCategory.name}: ${maxEquippedAmount.amount}`}
                      onDelete={() => this.props.onDelete()}
                      onEdit={() => this.props.onEdit()}
            />
        )
    }
}