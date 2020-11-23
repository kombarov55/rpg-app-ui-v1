import React from "react";
import List from "../../../Common/Lists/List";
import ListItem from "../../../Common/ListElements/ListItem";
import FormMode from "../../../../data-layer/enums/FormMode";
import CurrencyForm from "../Form/CurrencyForm";

/**
 * currencies: List<CurrencyDto>
 */
export default class extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            formVisible: false,
            form: null,
            formMode: FormMode.CREATE
        }
    }

    render() {
        return (
            <div>
                <List title={"Валюты: (макс. 3)"}
                      noItemsText={"Нет валют"}
                      values={this.props.currencies.map(currency =>
                          <ListItem text={currency.name}
                                    onEdit={() => this.setState({
                                        formVisible: true,
                                        formMode: FormMode.EDIT,
                                        form: currency
                                    })}
                          />
                      )}
                      isAddButtonVisible={!this.state.formVisible}
                      onAddClicked={() => this.setState({
                          formVisible: true,
                          formMode: FormMode.CREATE
                      })}
                />
                {
                    this.state.formVisible &&
                    (this.state.formMode === FormMode.CREATE ?
                            <CurrencyForm onSubmit={form => {
                                this.setState({formVisible: false})
                                this.props.onAddCurrency(form)
                            }}/> :

                            <CurrencyForm initialState={this.state.form}
                                          onSubmit={form => {
                                              this.setState({formVisible: false})
                                              this.props.onEditCurrency(form)
                                          }}
                            />
                    )

                }
            </div>
        )
    }
}