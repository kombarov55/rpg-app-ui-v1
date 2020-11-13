import React from "react";
import List from "../../../Common/Lists/List";
import ItemComponent from "../../CharacterList/Component/ItemComponent";

export default class OrganizationItemsComponent extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <List title={"Склад:"}
                  noItemsText={"Пусто.."}
                  values={this.props.items.map(item =>
                      <ItemComponent item={item}
                                     gameId={this.props.gameId}
                                     onDisposeItem={item => this.props.onDisposeItem(item)}
                                     onTransferItem={(destinationType, destination) => this.props.onTransferItem(item, destinationType, destination)}
                                     key={item.id}
                      />
                  )}
            />
        )
    }
}