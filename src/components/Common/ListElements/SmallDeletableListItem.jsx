import React from "react";
import SmallListItem from "./CornerListItem";
import Icon from "../Input/Icon";

export default class SmallDeletableListItem extends React.PureComponent {
    render() {
        return (
            <SmallListItem
                left={this.props.text}
                right={<Icon className={"pi pi-times"} onClick={(() => this.props.onDelete())}/>}
            />
        )
    }
}