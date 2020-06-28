import React from "react";
import BulletList from "../Common/BulletList";

export default class ListItemExpand extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.initialState
    }

    initialState = {
        expand: false
    }

    render() {
        return (
            <div style={containerStyle} onClick={() => this.onClick()}>
                <div style={innerHorizontalStyle}>
                    {
                        this.props.img &&
                        <img style={imgStyle} src={this.props.img}/>
                    }
                    <div style={nameStyle}>{this.props.name}</div>
                </div>
                {this.state.expand &&
                <>
                    <div style={descriptionStyle}>{this.props.description}</div>
                    <BulletList values={this.props.bullets}
                    />
                </>
                }
            </div>
        )
    }

    onClick() {
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
    flexDirection: "row"
}

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