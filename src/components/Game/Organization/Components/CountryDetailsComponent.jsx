import React from "react";
import List from "../../../Common/Lists/List";
import FormMode from "../../../../data-layer/enums/FormMode";
import ListItem from "../../../Common/ListElements/ListItem";
import ShopForm from "../Form/ShopForm";
import {httpDelete, post, put} from "../../../../util/Http";
import {addCountryShopUrl, removeCountryShopUrl} from "../../../../util/Parameters";
import Popup from "../../../../util/Popup";

export default class CountryDetailsComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = this.formInitialState
    }

    formInitialState = {
        addShopVisible: false,
        shopForm: null,
        shopFormMode: FormMode.CREATE
    }

    render() {
        return (
            <div>
                <List title={"Магазины:"}
                      noItemsText={"Отсутствуют"}
                      isAddButtonVisible={this.state.addShopVisible}
                      values={this.props.organization.shops.map(shop =>
                          <ListItem text={shop.name}
                                    onDelete={() => this.onDeleteShopClicked(shop)}
                          />
                      )}
                />
                {
                    this.state.addShopVisible &&
                    (this.state.shopFormMode === FormMode.CREATE ?
                            <ShopForm
                                onSubmit={form => this.onAddShopClicked(form)}
                            /> :
                            <ShopForm
                                initialState={this.store.shopForm}
                                onSubmit={form => this.onAddShopClicked(form)}
                            />
                    )
                }
            </div>
        )
    }

    onAddShopClicked(form) {
        post(addCountryShopUrl(this.props.organization.url), form, rs => {
            this.props.setOrganization(rs)
            Popup.info("Магазин добавлен")
            this.setState({
                addShopVisible: false
            })
        })
    }

    onEditShopClicked(form) {
        put(addCountryShopUrl(this.props.organization.url), form, rs => {
            this.props.setOrganization(rs)
            Popup.info("Магазин добавлен")
            this.setState({
                addShopVisible: false
            })
        })
    }

    onDeleteShopClicked(shop) {
        httpDelete(removeCountryShopUrl(this.props.organization.id, shop.id), rs => {
            this.props.setOrganization(rs)
            Popup.info("Магазин удалён")
        })
    }
}