import React from "react";
import ExpandableListItemStyle from "../../../styles/ExpandableListItemStyle";

export default class NameImgDescription extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div style={ExpandableListItemStyle.containerStyle}>
                <div style={ExpandableListItemStyle.innerHorizontalStyle}>
                    <div style={ExpandableListItemStyle.imgAndNameStyle}>
                        {
                            this.props.img &&
                            <img style={ExpandableListItemStyle.imgStyle} src={this.props.img}/>
                        }
                        <div style={ExpandableListItemStyle.nameStyle}>{this.props.name}</div>
                    </div>
                </div>
                <div>{this.props.description}</div>
            </div>
        )
    }
}