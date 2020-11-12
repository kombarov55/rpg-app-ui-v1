import React from "react";
import {connect} from "react-redux"
import {changeView} from "../../../../data-layer/ActionCreators";
import {adminGameView} from "../../../../Views";
import Btn from "../../../Common/Buttons/Btn";
import FormMode from "../../../../data-layer/enums/FormMode";
import FormViewStyle from "../../../../styles/FormViewStyle";
import List from "../../../Common/Lists/List";
import ListItem from "../../../Common/ListElements/ListItem";
import ItemTypeForm from "../Form/ItemTypeForm";
import ItemTemplateForm from "../Form/ItemTemplateForm";
import {get, httpDelete, post, put} from "../../../../util/Http";
import Popup from "../../../../util/Popup";
import {
    currenciesByGameIdUrl,
    itemCategoryByIdUrl,
    itemCategoryUrl,
    itemTemplateByIdUrl,
    itemTemplateUrl,
    itemTypeByIdUrl,
    itemTypeUrl,
    shortSkillsByGameIdUrl
} from "../../../../util/Parameters";
import ExpandableListItemWithBullets from "../../../Common/ListElements/ExpandableListItemWithBullets";
import SkillInfluenceToString from "../../../../util/SkillInfluenceToString";
import GetDestinationByName from "../../../../data-layer/enums/GetDestinationByName";
import ItemCategoryComponent from "../Component/ItemCategoryComponent";

export default connect(
    state => ({
        gameId: state.activeGame.id
    }),

    dispatch => ({
        back: () => dispatch(changeView(adminGameView))
    })
)(class MerchandiseView extends React.Component {
    constructor(props) {
        super(props)

        this.state = this.initialState

        get(itemCategoryUrl(props.gameId), rs => this.setState({itemCategories: rs}))
        get(itemTypeUrl(props.gameId), rs => this.setState({itemTypes: rs}))
        get(shortSkillsByGameIdUrl(props.gameId), rs => this.setState({skills: rs}))
        get(currenciesByGameIdUrl(props.gameId), rs => this.setState({currencies: rs}))
        get(itemTemplateUrl(props.gameId), rs => this.setState({merchandiseList: rs}))
    }

    initialState = {
        itemCategories: [],
        itemTypes: [],
        itemTemplates: [],

        skills: [],
        currencies: [],

        merchandiseTypeFormMode: FormMode.CREATE,
        merchandiseTypeObjToUpdate: null,
        merchandiseTypeFormVisible: false,

        merchandiseFormMode: FormMode.CREATE,
        merchandiseObjToUpdate: null,
        merchandiseFormVisible: false
    }

    render() {
        return (
            <div style={FormViewStyle}>

                <ItemCategoryComponent itemCategories={this.state.itemCategories}
                                       onDeleteItemCategory={itemCategory => this.onDeleteItemCategory(itemCategory)}
                                       onSaveItemCategory={itemCategory => this.onSaveItemCategory(itemCategory)}
                                       onUpdateItemCategory={itemCategory => this.onUpdateItemCategory(itemCategory)}
                />

                <List
                    title={"Типы предметов:"}
                    isAddButtonVisible={!this.state.merchandiseTypeFormVisible}
                    noItemsText={"Нет типов"}
                    values={this.state.itemTypes.map(itemType =>
                        <ListItem text={itemType.name}
                                  onDelete={() => this.onDeleteItemTypeClicked(itemType)}
                                  onEdit={() => this.onEditItemTypeClicked(itemType)}
                        />
                    )}
                    onAddClicked={() => this.onAddItemTypeClicked()}
                />

                {
                    this.state.merchandiseTypeFormVisible && (
                        this.state.merchandiseTypeFormMode === FormMode.CREATE ?
                            <ItemTypeForm
                                onSubmit={form => this.saveItemType(form)}
                            /> :
                            <ItemTypeForm
                                initialState={this.state.merchandiseTypeObjToUpdate}
                                onSubmit={form => this.updateItemType(form)}
                            />
                    )
                }

                <List title={"Шаблоны предметов"}
                      isAddButtonVisible={!this.state.merchandiseFormVisible}
                      onAddClicked={() => this.onAddMerchandiseClicked()}
                      values={this.state.itemTemplates.map(merchandise =>
                          <ExpandableListItemWithBullets
                              img={merchandise.img}
                              name={merchandise.name}
                              description={merchandise.description == null ? "[Нет описания]" : merchandise.description}
                              onEditClicked={() => this.onMerchandiseEditClicked(merchandise)}
                              onDeleteClicked={() => this.onMerchandiseDeleteClicked(merchandise)}
                              bullets={[
                                  GetDestinationByName(merchandise.destination),
                                  "Категория: " + merchandise.category.name,
                                  "Тип: " + merchandise.type.name,
                                  merchandise.slots + " слот(ов)",
                                  merchandise.skillInfluences.map(it => SkillInfluenceToString(it)).join(", "),
                                  merchandise.canBeEquipped ? "Можно надеть" : "Нельзя надеть",
                                  merchandise.canBeCrafted ? "Можно скрафтить" : "Нельзя скрафтить",
                                  merchandise.canBeUsedInCraft ? "Можно использовать в крафте" : "Нельзя использовать в крафте"
                              ]}

                              alwaysExpand={true}
                              key={merchandise.id}
                          />
                      )}
                />

                {
                    this.state.merchandiseFormVisible && (
                        this.state.merchandiseFormMode === FormMode.CREATE ?
                            <ItemTemplateForm
                                itemCategories={this.state.itemCategories}
                                itemTypes={this.state.itemTypes}
                                currencies={this.state.currencies}
                                skills={this.state.skills}

                                onSubmit={form => this.addMerchandise(form)}
                            /> :
                            <ItemTemplateForm
                                itemCategories={this.state.itemCategories}
                                itemTypes={this.state.itemTypes}
                                currencies={this.state.currencies}
                                skills={this.state.skills}

                                initialState={this.state.merchandiseObjToUpdate}
                                onSubmit={form => this.updateMerchandise(form)}
                            />
                    )
                }

                <Btn text={"Назад"} onClick={() => this.props.back()}/>
            </div>
        )
    }

    onSaveItemCategory(form) {
        post(itemCategoryUrl(this.props.gameId), form, rs => {
            this.setState({itemCategories: this.state.itemCategories.concat(rs)})
            Popup.info("Категория создана")
        })
    }

    onUpdateItemCategory(form) {
        put(itemCategoryUrl(this.props.gameId), form, rs => {
            this.setState({
                itemCategories: this.state.itemCategories.filter(it => it.id !== rs.id).concat(rs)
            })
            Popup.info("Категория обновлена")
        })
    }

    onDeleteItemCategory(category) {
        httpDelete(itemCategoryByIdUrl(this.props.gameId, category.id), () => {
            this.setState(state => ({itemCategories: state.itemCategories.filter(it => it !== category)}))
            Popup.info("Категория удалена")
        })
    }

    onDeleteItemTypeClicked(itemType) {
        httpDelete(
            itemTypeByIdUrl(this.props.gameId, itemType.id), () => {
                this.setState(state => ({
                    itemTypes: state.itemTypes.filter(it => it.id !== itemType.id)
                }))
                Popup.info("Тип товара удалён")
            }, () => Popup.error("Ошибка при удалении типа товара"))
    }

    saveItemType(form) {
        post(itemTypeUrl(this.props.gameId), form, rs => {
            this.setState(state => ({
                itemTypes: state.itemTypes.concat(rs),
                merchandiseTypeFormVisible: false
            }))
            Popup.info("Тип товара создан.")
        }, () => Popup.error("Ошибка при создании типа товара."))
    }

    updateItemType(form) {
        put(itemTypeByIdUrl(this.props.gameId, form.id), form, rs => {
            this.setState(state => ({
                itemTypes: state.itemTypes.filter(it => it.id !== rs.id).concat(rs),
                merchandiseTypeFormVisible: false
            }))
            Popup.info("Тип товара обновлен.")
        }, () => Popup.error("Ошибка при обновлении типа товара."))
    }

    onAddMerchandiseClicked() {
        this.setState({merchandiseFormVisible: true})
    }

    addMerchandise(form) {
        post(itemTemplateUrl(this.props.gameId), form, rs => {
            this.setState(state => ({
                itemTemplates: state.itemTemplates.concat(rs),
                merchandiseFormVisible: false
            }))
            Popup.info("Товар был создан.")
        }, () => Popup.error("Ошибка при сохранении товара. Обратитесь к администратору."))
    }

    updateMerchandise(form) {
        put(itemTemplateByIdUrl(this.props.gameId, form.id), form, rs => {
            this.setState(state => ({
                itemTemplates: state.itemTemplates.filter(it => it.id !== rs.id).concat(rs),
                merchandiseFormVisible: false
            }))
            Popup.info("Товар был обновлён")
        }, () => Popup.error("Ошибка при обновлении товара. Обратитесь к администратору."))
    }

    onMerchandiseEditClicked(merchandise) {
        this.setState({
            merchandiseFormMode: FormMode.EDIT,
            merchandiseObjToUpdate: merchandise,
            merchandiseFormVisible: true
        })
    }

    onMerchandiseDeleteClicked(merchandise) {
        httpDelete(itemTemplateByIdUrl(this.props.gameId, merchandise.id), ignored => {
                this.setState(state => ({
                    itemTemplates: state.itemTemplates.filter(it => it.id !== merchandise.id)
                }))
                Popup.info("Товар удалён")
            }, () => Popup.error("Ошибка при удалении товара. Обратитесь к администратору.")
        )
    }
})