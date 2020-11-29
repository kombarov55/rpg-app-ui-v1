import React from "react";
import ItemComponent from "./ItemComponent";
import Grid from "../../../Common/Lists/Grid";
import FormTitleLabel from "../../../Common/Labels/FormTitleLabel";
import InputLabel from "../../../Common/Labels/InputLabel";
import Destination from "../../../../data-layer/enums/Destination";

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedItem: null
        }
    }

    render() {
        return (
            <div>
                <FormTitleLabel text={"Инвентарь:"}/>
                <Grid items={this.props.items}
                      size={this.props.inventorySize}
                      onSelected={item => this.setState({selectedItem: item})}
                      onSelectRemoved={item => this.setState({selectedItem: null})}
                />
                <InputLabel text={`Заполнено: ${this.props.items.length}/${this.props.inventorySize}`}/>
                {
                    this.state.selectedItem != null &&
                    <ItemComponent item={this.state.selectedItem}
                                   gameId={this.props.gameId}
                                   parentDestination={Destination.PLAYER}
                                   onDisposeItem={item => {
                                       this.setState({selectedItem: null})
                                       this.props.onDisposeItem(item)
                                   }}
                                   onTransferItem={(destinationType, destination) => {
                                       this.setState({selectedItem: null})
                                       this.props.onTransferItem(this.state.selectedItem, destinationType, destination)
                                   }}
                                   onEquipItem={() => {
                                       this.setState({selectedItem: null})
                                       this.props.onEquipItem(this.state.selectedItem)
                                   }}
                    />
                }
            </div>
        )
    }
}