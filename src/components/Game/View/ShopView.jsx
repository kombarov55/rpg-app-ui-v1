import React from "react"
import {connect} from "react-redux"
import FormViewStyle from "../../../styles/FormViewStyle";
import ViewInfo from "../../Common/Constructions/ViewInfo";
import List from "../../Common/Lists/List";
import Btn from "../../Common/Buttons/Btn";
import {gameView} from "../../../Views";
import {changeView} from "../../../data-layer/ActionCreators";
import MerchandiseCategoryForm from "../MerchandiseCategoryForm";
import {httpDelete, post, put} from "../../../util/Http";
import {
    deleteMerchandiseCategoryUrl,
    merchandiseTypeByIdUrl, merchandiseTypeUrl,
    saveMerchandiseCategoryUrl
} from "../../../util/Parameters";
import ListItem from "../../Common/ListElements/ListItem";
import Popup from "../../../util/Popup";
import FormMode from "../../../data-layer/enums/FormMode";
import MerchandiseTypeForm from "../MerchandiseTypeForm";

export default connect(
    state => ({
        growl: state.growl,
        changeViewParams: state.changeViewParams
    }),
    dispatch => ({
        toPrevView: () => dispatch(changeView(gameView))
    })
)(class ShopView extends React.Component {

    constructor(props) {
        super(props)

        const {shop} = this.props.changeViewParams

        this.state = Object.assign({}, shop, this.initialState)
    }

    initialState = {
        merchandiseCategoryFormMode: FormMode.CREATE,
        merchandiseCategoryObjToUpdate: null,
        merchandiseCategoryFormVisible: false,

        merchandiseTypeFormMode: FormMode.CREATE,
        merchandiseTypeObjToUpdate: null,
        merchandiseTypeFormVisible: false,

        merchandiseFormMode: FormMode.CREATE,
        merchandiseObjToUpdate: null,
        merchandiseFormVisible: false,

        merchandiseAmountFormMode: FormMode.CREATE,
        merchandiseAmountObjToUpdate: null,
        merchandiseAmountFormVisible: false
    }

    render() {
        return (
            <div style={FormViewStyle}>
                <ViewInfo
                    name={"Магазин"}
                    description={"Магазин для игроков"}
                />

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

                <List
                    title={"Товары:"}
                    isAddButtonVisible={!this.state.merchandiseFormVisible}
                    noItemsText={"Нет товаров"}
                    onAddClicked={() => this.onAddMerchandiseClicked()}
                />

                <List
                    title={"Заполнить магазин:"}
                    isAddButtonVisible={!this.state.merchandiseAmountFormVisible}
                    noItemsText={"Магазин пуст"}
                    onAddClicked={() => this.onAddMerchandiseAmountClicked()}
                />

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
            merchandiseTypeByIdUrl(this.state.id, merchandiseType.id), () => {
                this.setState(state => ({
                    merchandiseTypes: state.merchandiseTypes.filter(it => it.id !== merchandiseType.id)
                }))
                Popup.info("Тип товара удалён")
            }, () => Popup.error("Ошибка при удалении типа товара"))
    }

    saveMerchandiseCategory(form) {
        post(saveMerchandiseCategoryUrl(this.state.id), form, rs => {
            this.setState({
                merchandiseCategories: this.state.merchandiseCategories.concat(rs),
                merchandiseCategoryFormVisible: false
            })

            Popup.info("Категория создана")
        }, () => Popup.error("Ошибка при создании категории товара. Обратитесь к администратору."))
    }

    updateMerchandiseCategory(form) {
        put(saveMerchandiseCategoryUrl(this.state.id), form, rs => {
            this.setState({
                merchandiseCategories: this.state.merchandiseCategories.filter(it => it.id !== rs.id).concat(rs),
                merchandiseCategoryFormVisible: false
            })

            Popup.info("Категория обновлена")
        }, () => Popup.error("Ошибка при обновлении категории товара. Обратитесь к администратору."))
    }

    saveMerchandiseType(form) {
        post(merchandiseTypeUrl(this.state.id), form, rs => {
            this.setState(state => ({
                merchandiseTypes: state.merchandiseTypes.concat(rs),
                merchandiseTypeFormVisible: false
            }))
            Popup.info("Тип товара создан.")
        }, () => Popup.error("Ошибка при создании типа товара."))
    }

    updateMerchandiseType(form) {
        put(merchandiseTypeByIdUrl(this.state.id, form.id), form, rs => {
            this.setState(state => ({
                merchandiseTypes: state.merchandiseTypes.filter(it => it.id !== rs.id).concat(rs),
                merchandiseTypeFormVisible: false
            }))
            Popup.info("Тип товара обновлен.")
        }, () => Popup.error("Ошибка при обновлении типа товара."))
    }

    onMerchandiseCategoryItemDelete(category) {
        httpDelete(
            deleteMerchandiseCategoryUrl(this.state.id, category.id), () => {
                this.setState(state => ({
                    merchandiseCategories: state.merchandiseCategories.filter(it => it !== category)
                }))
                Popup.info("Категория удалена")
            }, () => Popup.error("Ошибка при удалении категории"))
    }

    onAddMerchandiseClicked() {
        this.setState({merchandiseFormVisible: true})
    }

    onAddMerchandiseAmountClicked() {
        this.setState({merchandiseAmountFormVisible: true})

    }

    onBackClicked() {
        this.props.toPrevView()
    }
})