import React from "react";
import {connect} from "react-redux"
import {changeView} from "../../../data-layer/ActionCreators";
import {gameView} from "../../../Views";
import Btn from "../../Common/Buttons/Btn";
import FormMode from "../../../data-layer/enums/FormMode";
import FormViewStyle from "../../../styles/FormViewStyle";
import List from "../../Common/Lists/List";
import ListItem from "../../Common/ListElements/ListItem";
import MerchandiseCategoryForm from "../MerchandiseCategoryForm";
import MerchandiseTypeForm from "../MerchandiseTypeForm";
import MerchandiseForm from "../MerchandiseForm";
import {get, httpDelete, post, put} from "../../../util/Http";
import Popup from "../../../util/Popup";
import {
    currenciesByGameIdUrl,
    merchandiseCategoryByIdUrl,
    merchandiseCategoryUrl,
    merchandiseTypeByIdUrl,
    merchandiseTypeUrl, shortSkillsByGameIdUrl
} from "../../../util/Parameters";

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
    }

    initialState = {
        merchandiseCategories: [],
        merchandiseTypes: [],
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

                <List
                    title={"Товары:"}
                    isAddButtonVisible={!this.state.merchandiseFormVisible}
                    noItemsText={"Нет товаров"}
                    onAddClicked={() => this.onAddMerchandiseClicked()}
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

                <Btn text={"DEBUG"} onClick={() => console.log(this.state)}/>
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
        console.log(form)
    }

    updateMerchandise(form) {
        console.log(form)
    }

    onBackClicked() {
        this.props.toPrevView()
    }
})