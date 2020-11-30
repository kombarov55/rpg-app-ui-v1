import React from "react";
import ExpandableListItemStyle from "../../../styles/ExpandableListItemStyle";
import Icon from "../Input/Icon";
import getOrDefault from "../../../util/getOrDefault";

export default class ExpandableListItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.initialState
    }

    initialState = {
        expand: false
    }

    render() {
        const {img, name, description, onEditClicked, isDeleteVisible, onDeleteClicked, alwaysExpand, expandableElements} = this.props

        return (
            <div style={ExpandableListItemStyle.containerStyle}>
                <div style={ExpandableListItemStyle.innerHorizontalStyle}>
                    <div style={ExpandableListItemStyle.imgAndNameStyle} onClick={() => this.expand()}>
                        {
                            this.props.img &&
                            <img style={ExpandableListItemStyle.imgStyle} src={this.props.img}/>
                        }
                        <div style={ExpandableListItemStyle.nameStyle}>{this.props.name}</div>
                    </div>
                    <div style={ExpandableListItemStyle.upperButtonsStyle}>
                        {this.props.onEditClicked && <Icon className={"pi pi-pencil"} onClick={() => this.props.onEditClicked()}/>}
                        {(getOrDefault(this.props.isDeleteVisible, true) && this.props.onDeleteClicked) && <Icon className={"pi pi-times"} onClick={() => this.props.onDeleteClicked()}/>}
                    </div>
                </div>
                <div>{this.props.description}</div>
                {
                    (this.props.alwaysExpand || this.state.expand) &&
                    this.props.expandableElements
                }
            </div>
        )
    }

    expand() {
        this.setState(state => ({expand: !state.expand}))
    }
}