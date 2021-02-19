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
                            img &&
                            <img style={ExpandableListItemStyle.imgStyle} src={img}/>
                        }
                        <div style={ExpandableListItemStyle.nameStyle}>{name}</div>
                    </div>
                    <div style={ExpandableListItemStyle.upperButtonsStyle}>
                        {onEditClicked && <Icon className={"pi pi-pencil"} onClick={() => onEditClicked()}/>}
                        {(getOrDefault(isDeleteVisible, true) && onDeleteClicked) && <Icon className={"pi pi-times"} onClick={() => onDeleteClicked()}/>}
                    </div>
                </div>
                <div>{description}</div>
                {
                    (alwaysExpand || this.state.expand) &&
                    expandableElements
                }
                {
                    !alwaysExpand && (
                        !this.state.expand ?
                            <Icon className={"pi pi-angle-down"}
                                  fontSize={"4vmax"}
                                  alignSelf={"center"}
                                  onClick={() => this.setState({expand: true})}
                            /> :
                            <Icon className={"pi pi-angle-up"}
                                  fontSize={"4vmax"}
                                  alignSelf={"center"}
                                  onClick={() => this.setState({expand: false})}
                            />
                    )
                }


            </div>
        )
    }

    expand() {
        this.setState(state => ({expand: !state.expand}))
    }
}