import React from "react";
import List from "../Lists/List";

export default class LocalAutocomplete extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            input: "",
            filteredItems: props.items
        }
    }

    render() {
        return (
            <div>
                <input placeholder={"Введите название..."}
                    value={this.state.input}
                       onChange={e => this.setState({
                           input: e.target.value,
                           filteredItems: this
                               .props
                               .items.filter(item => item[this.props.filteringField].toLowerCase().startsWith(e.target.value.toLowerCase()))
                       })}
                />
                <List
                    noItemsText={"Не найдено.."}
                    values={[
                        ...this.state.filteredItems.map(item => this.props.itemRenderer(item))
                    ]}
                />
            </div>
        )
    }

}