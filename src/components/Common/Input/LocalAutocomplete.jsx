import React from "react";
import List from "../Lists/List";
import ListItem from "../ListElements/ListItem";

/**
 * props: {
 *     items: [],
 *     fieldToDisplay: String
 * }
 */
export default class LocalAutocomplete extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            input: "",
            filteredItems: props.items,
            selectedItem: null
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
                               .items.filter(item => item[this.props.fieldToDisplay].toLowerCase().startsWith(e.target.value.toLowerCase()))
                       })}
                />
                <List values={[
                        ...this.state.filteredItems.map(item =>
                            <ListItem text={item[this.props.fieldToDisplay]}
                                      onClick={() => this.setState({selectedItem: item})}
                                      selected={this.state.selectedItem.id === item.id}
                            />
                        )
                    ]}
                />
            </div>
        )
    }

}