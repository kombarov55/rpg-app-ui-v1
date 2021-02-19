import React from "react";
import List from "../Lists/List";
import {get} from "../../../util/Http";
import ListItem from "../ListElements/ListItem";
import getOrDefault from "../../../util/getOrDefault";

/**
 * props: {
 *    fieldToDisplay: String
 *    buildSyncUrl: (input: String) => url: String,
 *    filteredItems: List<Item>
 *    onSelected: Consumer<Item>
     renderer: item => JSX
 * }
 */
export default class RemoteAutocomplete extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            input: "",
            items: [],
            selectedItem: null
        }

        this.fetch("")

        this.itemRenderer = props.itemRenderer != null ?
            props.itemRenderer :
            item => <ListItem text={item[getOrDefault(this.props.fieldToDisplay, "name")]}
                              onClick={() => this.onSelect(item)}
                              selected={this.state.selectedItem?.id === item.id}
                              key={item.id}/>
    }

    render() {
        return (
            <div>
                <input placeholder={"Поиск..."}
                       value={this.state.input}
                       onChange={e => this.fetch(e.target.value)}
                />
                <List>{
                    this.getItems().map(item => this.itemRenderer(item))
                }</List>
            </div>
        )
    }

    fetch(input) {
        this.setState({input: input})
        get(this.props.buildSyncUrl(input), rs => this.setState({items: rs}))
    }

    onSelect(item) {
        this.setState({selectedItem: item})
        this.props.onSelected(item)
    }

    getItems() {
        const items = this.state.items
        if (this.props.filteredItems == null) {
            return items
        } else {
            return items.filter(v1 => this.props.filteredItems.every(v2 => v1.id !== v2.id))
        }
    }
}