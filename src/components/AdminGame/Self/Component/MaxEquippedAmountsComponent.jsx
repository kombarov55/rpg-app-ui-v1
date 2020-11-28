import React from "react";
import List from "../../../Common/Lists/List";
import MaxEquippedAmountListItem from "../../../ListItem/MaxEquippedAmountListItem";
import FormMode from "../../../../data-layer/enums/FormMode";
import MaxEquippedAmountsForm from "../Form/MaxEquippedAmountsForm";
import {get} from "../../../../util/Http";
import {itemCategoryUrl} from "../../../../util/Parameters";

export default class extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            formVisible: false,
            formMode: FormMode.CREATE,
            form: null,

            itemCategories: []
        }
    }

    render() {
        return (
            <>
                <List title={"Максимальное количество одетых слотов по категориям:"}
                      values={this.props.maxEquippedAmounts.map(maxEquippedAmount =>
                          <MaxEquippedAmountListItem maxEquippedAmount={maxEquippedAmount}
                                                     onDelete={() => this.props.onDeleted(maxEquippedAmount)}
                                                     onEdit={() => get(itemCategoryUrl(this.props.gameId), rs => this.setState({
                                                         formVisible: true,
                                                         formMode: FormMode.EDIT,
                                                         form: maxEquippedAmount,
                                                         itemCategories: rs
                                                     }))}

                          />
                      )}

                      isAddButtonVisible={!this.state.formVisible}
                      onAddClicked={() => get(itemCategoryUrl(this.props.gameId), rs => this.setState({
                          formVisible: true,
                          formMode: FormMode.CREATE,
                          itemCategories: rs
                      }))}
                />
                {
                    this.state.formVisible &&
                    (this.state.formMode === FormMode.CREATE ?
                            <MaxEquippedAmountsForm itemCategories={this.state.itemCategories}
                                                    onSubmit={form => {
                                                        this.setState({formVisible: false})
                                                        this.props.onAdded(form)
                                                    }}
                            /> :
                            <MaxEquippedAmountsForm itemCategories={this.state.itemCategories}
                                                    initialState={this.state.form}
                                                    onSubmit={form => {
                                                        this.setState({formVisible: false})
                                                        this.props.onEdited(form)
                                                    }}
                            />
                    )
                }
            </>
        )
    }
}