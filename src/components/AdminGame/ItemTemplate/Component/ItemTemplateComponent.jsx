import React from "react";
import List from "../../../Common/Lists/List";
import ExpandableListItemWithBullets from "../../../Common/ListElements/ExpandableListItemWithBullets";
import GetDestinationByName from "../../../../data-layer/enums/GetDestinationByName";
import SkillInfluenceToString from "../../../../util/SkillInfluenceToString";
import FormMode from "../../../../data-layer/enums/FormMode";
import ItemTemplateForm from "../Form/ItemTemplateForm";

export default class ItemTemplateComponent extends React.Component {

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
                <List title={"Шаблоны предметов:"}
                      isAddButtonVisible={!this.state.formVisible}
                      onAddClicked={() => this.setState({
                          formVisible: true,
                          formMode: FormMode.CREATE
                      })}
                      values={this.props.itemTemplates.map(itemTemplate =>
                          <ExpandableListItemWithBullets
                              img={itemTemplate.img}
                              name={itemTemplate.name}
                              description={itemTemplate.description == null ? "[Нет описания]" : itemTemplate.description}
                              onEditClicked={() => this.setState({
                                  formMode: FormMode.EDIT,
                                  formVisible: true,
                                  form: itemTemplate
                              })}
                              onDeleteClicked={() => this.props.onDeleteItemTemplate(itemTemplate)}
                              bullets={[
                                  GetDestinationByName(itemTemplate.destination),
                                  "Категория: " + itemTemplate.category.name,
                                  "Тип: " + itemTemplate.type.name,
                                  itemTemplate.slots + " слот(ов)",
                                  itemTemplate.skillInfluences.map(it => SkillInfluenceToString(it)).join(", "),
                                  itemTemplate.canBeEquipped ? "Можно надеть" : "Нельзя надеть",
                                  itemTemplate.canBeCrafted ? "Можно скрафтить" : "Нельзя скрафтить",
                                  itemTemplate.canBeUsedInCraft ? "Можно использовать в крафте" : "Нельзя использовать в крафте"
                              ]}

                              alwaysExpand={true}
                              key={itemTemplate.id}
                          />
                      )}
                />

                {
                    this.state.formVisible && (
                        this.state.formMode === FormMode.CREATE ?
                            <ItemTemplateForm
                                itemCategories={this.props.itemCategories}
                                itemTypes={this.props.itemTypes}
                                currencies={this.props.currencies}
                                skills={this.props.skills}

                                onSubmit={form => {
                                    this.props.onSaveItemTemplate(form)
                                    this.setState({formVisible: false})
                                }}
                            /> :
                            <ItemTemplateForm
                                itemCategories={this.props.itemCategories}
                                itemTypes={this.props.itemTypes}
                                currencies={this.props.currencies}
                                skills={this.props.skills}

                                initialState={this.state.form}
                                onSubmit={form => {
                                    this.onUpdateItemTemplate(form)
                                    this.setState({formVisible: false})
                                }}
                            />
                    )
                }
            </div>
        )
    }
}