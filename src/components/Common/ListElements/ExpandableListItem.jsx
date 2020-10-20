import React from "react";
import ExpandableListItemStyle from "../../../styles/ExpandableListItemStyle";

export default class xpandableListItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.initialState
    }

    initialState = {
        expand: false
    }

    render() {
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
                    <div style={ExpandableListItemStyle.upperButtonsStyle}>{this.props.upperButtons}</div>
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