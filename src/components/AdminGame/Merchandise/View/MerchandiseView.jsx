import React from "react";
import {connect} from "react-redux"
import {changeView} from "../../../../data-layer/ActionCreators";
import {gameView} from "../../../../Views";
import Btn from "../../../Common/Buttons/Btn";
import FormMode from "../../../../data-layer/enums/FormMode";
import FormViewStyle from "../../../../styles/FormViewStyle";
import List from "../../../Common/Lists/List";
import ListItem from "../../../Common/ListElements/ListItem";
import MerchandiseCategoryForm from "../Form/MerchandiseCategoryForm";
import MerchandiseTypeForm from "../Form/MerchandiseTypeForm";
import MerchandiseForm from "../Form/MerchandiseForm";
import {get, httpDelete, post, put} from "../../../../util/Http";
import Popup from "../../../../util/Popup";
import {
    currenciesByGameIdUrl,
    merchandiseByIdUrl,
    merchandiseCategoryByIdUrl,
    merchandiseCategoryUrl,
    merchandiseTypeByIdUrl,
    merchandiseTypeUrl,
    merchandiseUrl,
    shortSkillsByGameIdUrl
} from "../../../../util/Parameters";
import ExpandableListItemWithBullets from "../../../Common/ListElements/ExpandableListItemWithBullets";
import SkillInfluenceToString from "../../../../util/SkillInfluenceToString";
import GetDestinationByName from "../../../../data-layer/enums/GetDestinationByName";

export default connect(
    state => ({
        changeViewParams: state.changeViewParams
    }),

    dispatch => ({
        toPrevView: () => dispatch(changeView(gameView))
    })
)(class MerchandiseView extends React.Component {
    constructor(props) {
        super(props)

        this.gameId = props.changeViewParams.gameId

        this.state = this.initialState

        get(merchandiseCategoryUrl(this.gameId), rs => this.setState({merchandiseCategories: rs}))
        get(merchandiseTypeUrl(this.gameId), rs => this.setState({merchandiseTypes: rs}))
        get(shortSkillsByGameIdUrl(this.gameId), rs => this.setState({skills: rs}))
        get(currenciesByGameIdUrl(this.gameId), rs => this.setState({currencies: rs}))
        get(merchandiseUrl(this.gameId), rs => this.setState({merchandiseList: rs}))
    }

    initialState = {
        merchandiseCategories: [],
        merchandiseTypes: [],
        merchandiseList: [],

        skills: [],
        currencies: [],

        merchandiseCategoryFormMode: FormMode.CREATE,
        merchandiseCategoryObjToUpdate: null,
        merchandiseCategoryFormVisible: false,

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
                <List
                    title={"Категории товаров:"}
                    noItemsText={"Нет категорий"}
                    values={this.state.merchandiseCategories.map(category =>
                        <ListItem text={category.name}
                                  onDelete={() => this.onMerchandiseCategoryItemDelete(category)}
                                  onEdit={() => this.onEditMerchandiseCategoryClicked(category)}
                        />
                    )}
                    isAddButtonVisible={!this.state.merchandiseCategoryFormVisible}
                    onAddClicked={() => this.onAddMerchandiseCategoryClicked()}
                />
                {
                    this.state.merchandiseCategoryFormVisible && (
                        this.state.merchandiseCategoryFormMode === FormMode.CREATE ?
                            <MerchandiseCategoryForm
                                onSubmit={form => this.saveMerchandiseCategory(form)}
                            /> :
                            <MerchandiseCategoryForm
                                initialState={this.state.merchandiseCategoryObjToUpdate}
                                onSubmit={form => this.updateMerchandiseCategory(form)}
                            />
                    )
                }

                <List
                    title={"Типы товаров:"}
                    isAddButtonVisible={!this.state.merchandiseTypeFormVisible}
                    noItemsText={"Нет типов"}
                    values={this.state.merchandiseTypes.map(merchandiseType =>
                        <ListItem text={merchandiseType.name}
                                  onDelete={() => this.onDeleteMerchandiseTypeClicked(merchandiseType)}
                                  onEdit={() => this.onEditMerchandiseTypeClicked(merchandiseType)}
                        />
                    )}
                    onAddClicked={() => this.onAddMerchandiseTypeClicked()}
                />

                {
                    this.state.merchandiseTypeFormVisible && (
                        this.state.merchandiseTypeFormMode === FormMode.CREATE ?
                            <MerchandiseTypeForm
                                onSubmit={form => this.saveMerchandiseType(form)}
                            /> :
                            <MerchandiseTypeForm
                                initialState={this.state.merchandiseTypeObjToUpdate}
                                onSubmit={form => this.updateMerchandiseType(form)}
                            />
                    )
                }

                <List title={"Товары:"}
                      isAddButtonVisible={!this.state.merchandiseFormVisible}
                      noItemsText={"Нет товаров"}
                      onAddClicked={() => this.onAddMerchandiseClicked()}
                      values={this.state.merchandiseList.map(merchandise =>
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
                            <MerchandiseForm
                                merchandiseCategories={this.state.merchandiseCategories}
                                merchandiseTypes={this.state.merchandiseTypes}
                                currencies={this.state.currencies}
                                skills={this.state.skills}

                                onSubmit={form => this.addMerchandise(form)}
                            /> :
                            <MerchandiseForm
                                merchandiseCategories={this.state.merchandiseCategories}
                                merchandiseTypes={this.state.merchandiseTypes}
                                currencies={this.state.currencies}
                                skills={this.state.skills}

                                initialState={this.state.merchandiseObjToUpdate}
                                onSubmit={form => this.updateMerchandise(form)}
                            />
                    )
                }

                <Btn text={"Назад"} onClick={() => this.onBackClicked()}/>
            </div>
        )
    }

    onAddMerchandiseCategoryClicked() {
        this.setState({
            merchandiseCategoryFormVisible: true,
            merchandiseCategoryFormMode: FormMode.CREATE
        })
    }

    onEditMerchandiseCategoryClicked(category) {
        this.setState({
            merchandiseCategoryFormVisible: true,
            merchandiseCategoryFormMode: FormMode.EDIT,
            merchandiseCategoryObjToUpdate: category
        })
    }

    onAddMerchandiseTypeClicked() {
        this.setState({
            merchandiseTypeFormVisible: true,
            merchandiseTypeFormMode: FormMode.CREATE
        })
    }

    onEditMerchandiseTypeClicked(merchandiseType) {
        this.setState({
            merchandiseTypeFormVisible: true,
            merchandiseTypeFormMode: FormMode.EDIT,
            merchandiseTypeObjToUpdate: merchandiseType
        })
    }

    onDeleteMerchandiseTypeClicked(merchandiseType) {
        httpDelete(
            merchandiseTypeByIdUrl(this.gameId, merchandiseType.id), () => {
                this.setState(state => ({
                    merchandiseTypes: state.merchandiseTypes.filter(it => it.id !== merchandiseType.id)
                }))
                Popup.info("Тип товара удалён")
            }, () => Popup.error("Ошибка при удалении типа товара"))
    }

    saveMerchandiseCategory(form) {
        post(merchandiseCategoryUrl(this.gameId), form, rs => {
            this.setState({
                merchandiseCategories: this.state.merchandiseCategories.concat(rs),
                merchandiseCategoryFormVisible: false
            })

            Popup.info("Категория создана")
        }, () => Popup.error("Ошибка при создании категории товара. Обратитесь к администратору."))
    }

    updateMerchandiseCategory(form) {
        put(merchandiseCategoryUrl(this.gameId), form, rs => {
            this.setState({
                merchandiseCategories: this.state.merchandiseCategories.filter(it => it.id !== rs.id).concat(rs),
                merchandiseCategoryFormVisible: false
            })

            Popup.info("Категория обновлена")
        }, () => Popup.error("Ошибка при обновлении категории товара. Обратитесь к администратору."))
    }

    saveMerchandiseType(form) {
        post(merchandiseTypeUrl(this.gameId), form, rs => {
            this.setState(state => ({
                merchandiseTypes: state.merchandiseTypes.concat(rs),
                merchandiseTypeFormVisible: false
            }))
            Popup.info("Тип товара создан.")
        }, () => Popup.error("Ошибка при создании типа товара."))
    }

    updateMerchandiseType(form) {
        put(merchandiseTypeByIdUrl(this.gameId, form.id), form, rs => {
            this.setState(state => ({
                merchandiseTypes: state.merchandiseTypes.filter(it => it.id !== rs.id).concat(rs),
                merchandiseTypeFormVisible: false
            }))
            Popup.info("Тип товара обновлен.")
        }, () => Popup.error("Ошибка при обновлении типа товара."))
    }

    onMerchandiseCategoryItemDelete(category) {
        httpDelete(
            merchandiseCategoryByIdUrl(this.gameId, category.id), () => {
                this.setState(state => ({
                    merchandiseCategories: state.merchandiseCategories.filter(it => it !== category)
                }))
                Popup.info("Категория удалена")
            }, () => Popup.error("Ошибка при удалении категории"))
    }

    onAddMerchandiseClicked() {
        this.setState({merchandiseFormVisible: true})
    }

    addMerchandise(form) {
        post(merchandiseUrl(this.gameId), form, rs => {
            this.setState(state => ({
                merchandiseList: state.merchandiseList.concat(rs),
                merchandiseFormVisible: false
            }))
            Popup.info("Товар был создан.")
        }, () => Popup.error("Ошибка при сохранении товара. Обратитесь к администратору."))
    }

    updateMerchandise(form) {
        put(merchandiseByIdUrl(this.gameId, form.id), form, rs => {
            this.setState(state => ({
                merchandiseList: state.merchandiseList.filter(it => it.id !== rs.id).concat(rs),
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
        httpDelete(merchandiseByIdUrl(this.gameId, merchandise.id), ignored => {
                this.setState(state => ({
                    merchandiseList: state.merchandiseList.filter(it => it.id !== merchandise.id)
                }))
                Popup.info("Товар удалён")
            }, () => Popup.error("Ошибка при удалении товара. Обратитесь к администратору.")
        )


    }

    onBackClicked() {
        this.props.toPrevView()
    }
})