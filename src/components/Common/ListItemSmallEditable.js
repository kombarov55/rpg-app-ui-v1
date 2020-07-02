import React from "react";
import ListItemSmall from "./ListItemSmall";
import Icon from "./Icon";

export default class ListItemSmallEditable extends React.PureComponent {
    render() {
        return (
            <ListItemSmall
                left={this.props.text}
                right={<Icon className={"pi pi-pencil"} onClick={(() => this.props.onEditClicked())}/>}
            />
        )
    }
}