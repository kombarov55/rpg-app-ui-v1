import React from "react";
import getOrDefault from "../../../util/getOrDefault";

export default class extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedItem: null
        }

    }

    render() {
        const imgKey = getOrDefault(this.props.imgKey, "img")

        return (
            <div style={this.gridStyle}>
                {
                    this.props.items.map(item =>
                        <Img src={item[imgKey]}
                             selected={item === this.state.selectedItem}
                             onClick={() => {
                                 if (this.state.selectedItem?.id === item.id) {
                                     this.setState({selectedItem: null})
                                     if (this.props.onSelectRemoved != null) {
                                         this.props.onSelectRemoved(item)
                                     }
                                 } else {
                                     this.setState({selectedItem: item})
                                     if (this.props.onSelected != null) {
                                         this.props.onSelected(item)
                                     }
                                 }


                             }}

                             key={item}
                        />
                    )
                }
            </div>
        )
    }
}

class Img extends React.Component {
    render() {
        return (
            <img
                style={
                    this.props.selected ?
                        this.selectedImgStyle :
                        this.imgStyle
                }
                src={this.props.src}
                onClick={() => this.props.onClick()}
            />
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