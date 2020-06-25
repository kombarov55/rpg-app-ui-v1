import React from "react";
import ListItemSmall from "./ListItemSmall";
import Icon from "./Icon";

export default class ListItemSmallDeletable extends React.PureComponent {
    render() {
        return (
            <ListItemSmall
                left={this.props.text}
                right={<Icon className={"pi pi-times"} onClick={(() => this.props.onDelete())}/>}
            />
        )
    }
}