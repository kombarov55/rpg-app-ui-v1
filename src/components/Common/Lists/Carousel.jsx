import React from "react";
import getOrDefault from "../../../util/getOrDefault";

export default class Carousel extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div style={this.style}>
                {this.props.items.map(item =>
                    <CarouselItem img={item[getOrDefault(this.props.imgKey, "img")]}
                                  title={item[getOrDefault(this.props.titleKey, "title")]}
                                  onClick={() => this.props.onSelected(item)}
                                  key={item.id}

                    />
                )}
            </div>
        )
    }

    style = {
        "display": "flex",
        "flexDirection": "row",
        "width": "100%",
        "overflowX": "scroll",
        "overflowY": "hidden"
    }
}

class CarouselItem extends React.Component {
    render() {
        return (
            <div style={this.itemStyle} onClick={() => this.props.onClick()}>
                <img style={this.imgStyle}
                     src={this.props.img}
                />
                <div style={this.titleStyle}>{this.props.title}</div>
            </div>
        );
    }

    itemStyle = {
        "display": "flex",
        "flexDirection": "column",
        "alignItems": "center",
        "padding": "1.5vh 3vw"
    }

    imgStyle = {
        "height": "25vmax",
        "width": "40vmin"
    }

    titleStyle = {
        "padding": "1vh 0",
        "fontSize": "2vmax"
    }
}