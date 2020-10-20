import React from "react";
import List from "../Lists/List";
import {get} from "../../../util/Http";
import ListItem from "../ListElements/ListItem";

export default class RemoteAutocomplete extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            input: "",
            filteredItems: []
        }

        this.fetch("")
    }

    render() {
        return (
            <div>
                <input placeholder={"..."}
                       value={this.state.input}
                       onChange={e => this.fetch(e.target.value)}
                />
                <List
                    noItemsText={"Не найдено.."}
                    values={this.state.filteredItems.map(item =>
                        <ListItem text={item[this.props.fieldToDisplay]}
                                  onClick={() => this.props.onSelected(item)}
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
}