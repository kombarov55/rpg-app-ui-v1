import React, {Component} from "react";

export default class IconSelect extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedItem: null
        }
    }

    render() {
        return (
            <>
                <div style={this.gridStyle}>{this.props.imgList.map(src =>
                    <Img src={src}
                         selected={src === this.state.selectedItem}
                         onClick={() => {
                             this.setState({selectedItem: src})
                             if (this.props.onSelected != null) {
                                 this.props.onSelected(src)
                             }
                         }}

                         key={src}
                    />
                )}</div>
            </>
        )
    }

    gridStyle = {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",

        width: "100%",
        padding: "1vmin"
    }

}

class Img extends React.Component {
    render() {
        return (
            <div>
                <img
                    style={
                        this.props.selected ?
                            this.selectedImgStyle :
                            this.imgStyle
                    }
                    src={this.props.src}
                    onClick={() => this.props.onClick()}
                />
            </div>
        )
    }

    imgStyle = {
        width: "10vmin",
        height: "10vmin",
        margin: "1vmin"
    }

    selectedImgStyle = Object.assign({}, this.imgStyle, {
        border: "3px solid gold"
    })
}