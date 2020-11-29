import React from "react";
import getOrDefault from "../../../util/getOrDefault";
import Img from "../Labels/Img";

/**
 * itemKey: String = "img"
 * items: List<T>
 * onSelected: T => {}
 * onSelectRemoved: T => {},
 * size: Int?
 * emptyIcon: String?
 */
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
                    this.getItems().map(item =>
                        <Img src={item[imgKey]}
                             selected={item === this.state.selectedItem}
                             onClick={() => {
                                 if (!getOrDefault(item.unselectable, false) && this.state.selectedItem?.id === item.id) {
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

    getItems() {
        if (this.props.size == null) {
            return this.props.items
        } else {
            const fillingItemsLength = this.props.size - this.props.items.length
            const suffix = Array(fillingItemsLength).fill({img: "rounded-square.png", unselectable: true})
            return this.props.items.concat(suffix)
        }
    }
}