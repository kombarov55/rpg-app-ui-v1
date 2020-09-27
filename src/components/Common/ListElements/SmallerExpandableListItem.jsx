import React from "react";

export default class SmallerExpandableListItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.initialState
    }

    initialState = {
        expand: false
    }

    render() {
        return (
            <div style={this.props.selected ? selectedContainerStyle : defaultContainerStyle}>
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
                <div style={descriptionStyle}>{this.props.description}</div>
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

const defaultContainerStyle = {
    display: "flex",
    flexDirection: "column",

    width: "100%",
    padding: "0.25vmax 0.5vmax",
    margin: "0 0 0.5vmax 0",

    background: "#002651",
    borderRadius: "5px"
}

const selectedContainerStyle = {
    display: "flex",
    flexDirection: "column",

    width: "100%",
    padding: "0.25vmax 0.5vmax",
    margin: "0 0 0.5vmax 0",

    background: "#592e83",
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
    width: "30px",
    height: "30px",
    margin: "1vmin 2vmin 0 0"
}

const nameStyle = {
    fontSize: "2vmax",
    margin: " 0.5vmax 0 1vmax 0"
}

const descriptionStyle = {
    fontSize: "1.5vmax",
    margin: " 0.5vmax 0 1vmax 0"
}