import React from "react";

export default class ExpandableListItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.initialState
    }

    initialState = {
        expand: false
    }

    render() {
        return (
            <div style={containerStyle}>
                <div style={innerHorizontalStyle}>
                    <div style={imgAndName} onClick={() => this.onClick()}>
                        {
                            this.props.img &&
                            <img style={imgStyle} src={this.props.img}/>
                        }
                        <div style={nameStyle}>{this.props.name}</div>
                    </div>
                    <div style={upperButtonsStyle}>{this.props.upperButtons}</div>
                </div>
                {
                    (this.props.alwaysExpand || this.state.expand) &&
                    this.props.expandableElements
                }
            </div>
        )
    }

    onClick() {
        (this.props.onClick != null ? this.props.onClick : this.expand)()
    }

    expand() {
        this.setState(state => ({expand: !state.expand}))
    }
}

const containerStyle = {
    display: "flex",
    flexDirection: "column",

    width: "100%",
    padding: "1vmax",
    margin: "0 0 0.5vmax 0",

    background: "#212121",
    borderRadius: "5px"
}

const innerHorizontalStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
}

const imgAndName = {
    display: "flex",
    flexDirection: "row"
}

const upperButtonsStyle = {}

const imgStyle = {
    width: "40px",
    height: "40px",
    margin: "0 2vmin 0 0"
}

const nameStyle = {
    fontSize: "3vmax",
    margin: " 0.5vmax 0 1vmax 0"
}

const descriptionStyle = {
    fontSize: "1.5vmax",
    margin: " 0.5vmax 0 1vmax 0"
}