import React from "react";
import InputLabel from "../../../Common/Labels/InputLabel";
import {SelectButton} from "primereact/selectbutton";
import MerchandisePublisherType from "../../../../data-layer/enums/ItemPublisherType";

export default class ShopSettingsComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            type: props.type
        }
    }

    render() {
        return (
            <div>
                <InputLabel text={"Кто может выставлять предметы на продажу?"}/>
                <SelectButton options={MerchandisePublisherType.values}
                              value={this.state.type}
                              onChange={e => {
                                  this.setState({type: e.target.value})
                                  this.props.onShopUpdated({type: e.target.value})
                              }}
                />
            </div>
        )
    }
}