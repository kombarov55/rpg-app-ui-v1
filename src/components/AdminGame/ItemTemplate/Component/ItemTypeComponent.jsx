import React from "react";
import List from "../../../Common/Lists/List";
import ListItem from "../../../Common/ListElements/ListItem";
import FormMode from "../../../../data-layer/enums/FormMode";
import ItemTypeForm from "../Form/ItemTypeForm";

export default class ItemTypeComponent extends React.Component {

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
                    title={"Типы предметов:"}
                    isAddButtonVisible={!this.state.formVisible}
                    noItemsText={"Нет типов"}
                    values={this.props.itemTypes.map(itemType =>
                        <ListItem text={itemType.name}
                                  onDelete={() => this.props.onDeleteItemType(itemType)}
                                  onEdit={() => this.setState({
                                      formMode: FormMode.EDIT,
                                      formVisible: true,
                                      form: itemType
                                  })}
                        />
                    )}
                    onAddClicked={() => this.setState({
                        formVisible: true,
                        formMode: FormMode.CREATE
                    })}
                />

                {
                    this.state.formVisible && (
                        this.state.formMode === FormMode.CREATE ?
                            <ItemTypeForm
                                onSubmit={form => {
                                    this.props.onSaveItemType(form)
                                    this.setState({formVisible: false})
                                }}
                            /> :
                            <ItemTypeForm
                                initialState={this.state.form}
                                onSubmit={form => {
                                    this.props.onUpdateItemType(form)
                                    this.setState({formVisible: false})
                                }}
                            />
                    )
                }
            </div>
        )
    }
}