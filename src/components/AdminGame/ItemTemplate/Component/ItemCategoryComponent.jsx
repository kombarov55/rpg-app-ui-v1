import React from "react";
import List from "../../../Common/Lists/List";
import ListItem from "../../../Common/ListElements/ListItem";
import ItemCategoryForm from "../Form/ItemCategoryForm";
import FormMode from "../../../../data-layer/enums/FormMode";

export default class ItemCategoryComponent extends React.Component {

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
                <List
                    title={"Категории предметов:"}
                    noItemsText={"Нет категорий"}
                    isAddButtonVisible={!this.state.formVisible}
                    onAddClicked={() => this.setState({
                        formMode: FormMode.CREATE,
                        formVisible: true
                    })}
                    values={this.props.itemCategories.map(category =>
                        <ListItem text={category.name}
                                  onDelete={() => this.props.onDeleteItemCategory(category)}
                                  onEdit={() => this.setState({
                                      formMode: FormMode.EDIT,
                                      form: category,
                                      formVisible: true
                                  })}
                        />
                    )}
                />
                {
                    this.state.formVisible && (
                        this.state.formMode === FormMode.CREATE ?
                            <ItemCategoryForm
                                onSubmit={form => this.props.onSaveItemCategory(form)}
                            /> :
                            <ItemCategoryForm
                                initialState={this.state.form}
                                onSubmit={form => this.props.onUpdateItemCategory(form)}
                            />
                    )
                }
            </div>
        )
    }
}