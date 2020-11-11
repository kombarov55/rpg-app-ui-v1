import React from "react";
import List from "../../../Common/Lists/List";
import FormMode from "../../../../data-layer/enums/FormMode";
import ShopForm from "../Form/ShopForm";
import ExpandableListItemWithBullets from "../../../Common/ListElements/ExpandableListItemWithBullets";

export default class OrganizationShopsComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            formVisible: false,
            formMode: FormMode.CREATE,
            form: null
        }

    }

    render() {
        return (
            <div>
                <List title={"Магазины:"}
                      noItemsText={"Отсутствуют.."}
                      isAddButtonVisible={!this.state.formVisible}
                      onAddClicked={() => this.setState({
                          formMode: FormMode.CREATE,
                          formVisible: true,
                      })}
                      values={this.props.shops.map(shop =>
                          <ExpandableListItemWithBullets name={shop.name}
                                                         img={shop.img}
                                                         onEditClicked={() => this.setState({
                                                             formMode: FormMode.EDIT,
                                                             form: shop,
                                                             formVisible: true,
                                                         })}
                                                         onDeleteClicked={() => this.props.onShopDeleted(shop)}
                                                         onDetailsClicked={() => this.props.onDetailsClicked(shop)}
                                                         detailsButtonText={"Зайти"}

                                                         alwaysExpand={true}
                                                         key={shop.id}
                          />
                      )}
                />
                {
                    this.state.formVisible &&
                    (this.state.formMode === FormMode.CREATE ?
                            <ShopForm title={"Создание магазина организации"}
                                      onSubmit={form => {
                                          this.props.onShopAdded(form)
                                          this.setState({formVisible: false})
                                      }}
                            /> :
                            <ShopForm title={"Редактирование магазина организации"}
                                      initialState={this.state.form}
                                      onSubmit={form => {
                                          this.props.onShopEdited(form)
                                          this.setState({formVisible: false})
                                      }}
                            />
                    )
                }
            </div>
        )
    }
}