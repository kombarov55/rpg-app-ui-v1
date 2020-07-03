import React from "react";
import ListItemSmall from "./SmallListItem";
import Icon from "../Input/Icon";

export default class SmallEditableListItem extends React.PureComponent {
    render() {
        return (
            <ListItemSmall
                left={this.props.text}
                right={<Icon className={"pi pi-pencil"} onClick={(() => this.props.onEditClicked())}/>}
            />
        )
    }
}