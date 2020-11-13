import React from "react";
import List from "../../../Common/Lists/List";
import ExpandableListItem from "../../../Common/ListElements/ExpandableListItem";
import BulletList from "../../../Common/Lists/BulletList";
import Btn from "../../../Common/Buttons/Btn";
import ItemComponent from "./ItemComponent";

export default class extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <List title={"Инвентарь:"}
                      values={this.props.items.map(item =>
                          <ItemComponent item={item}
                                         gameId={this.props.gameId}
                                         onDisposeItem={item => this.props.onDisposeItem(item)}
                                         onTransferItem={(destinationType, destination) => this.props.onTransferItem(item, destinationType, destination)}
                                         key={item.id}
                          />
                      )}
                />
            </div>
        )
    }
}