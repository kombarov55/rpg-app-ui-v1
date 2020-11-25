import React from "react";
import List from "../Lists/List";
import ListItem from "../ListElements/ListItem";
import getOrDefault from "../../../util/getOrDefault";

/**
 * props: {
 *     items: [],
 *     fieldToDisplay: String,
 *     onSelected: item => {}
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
        const fieldToDisplay = getOrDefault(this.props.fieldToDisplay, "name")

        return (
            <div>
                <input placeholder={"Введите название..."}
                       value={this.state.input}
                       onChange={e => this.setState({
                           input: e.target.value,
                           filteredItems: this
                               .props
                               .items.filter(item => item[fieldToDisplay].toLowerCase().startsWith(e.target.value.toLowerCase()))
                       })}
                />
                <List values={[
                        ...this.state.filteredItems.map(item =>
                            <ListItem text={item[fieldToDisplay]}
                                      onClick={() => {
                                          this.setState({selectedItem: item})
                                          this.props.onSelected(item)
                                      }}
                                      selected={this.state.selectedItem?.id === item.id}
                            />
                        )
                    ]}
                />
            </div>
        )
    }

}