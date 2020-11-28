import React from "react";
import List from "../Lists/List";
import {get} from "../../../util/Http";
import ListItem from "../ListElements/ListItem";
import getOrDefault from "../../../util/getOrDefault";

/**
 * props: {
 *    fieldToDisplay: String
 *    buildSyncUrl: (input: String) => url: String
 *    onSelected: Consumer<Item>
 * }
 */
export default class RemoteAutocomplete extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            input: "",
            filteredItems: [],
            selectedItem: null
        }

        this.fetch("")
    }

    render() {
        return (
            <div>
                <input placeholder={"Поиск..."}
                       value={this.state.input}
                       onChange={e => this.fetch(e.target.value)}
                />
                <List values={this.state.filteredItems.map(item =>
                    <ListItem text={item[getOrDefault(this.props.fieldToDisplay, "name")]}
                              onClick={() => this.onSelect(item)}
                              selected={this.state.selectedItem?.id === item.id}
                              key={item.id}
                    />
                )}
                />
            </div>
        )
    }

    fetch(input) {
        this.setState({input: input})
        get(this.props.buildSyncUrl(input), rs => this.setState({filteredItems: rs}))
    }

    onSelect(item) {
        this.setState({selectedItem: item})
        this.props.onSelected(item)
    }
}