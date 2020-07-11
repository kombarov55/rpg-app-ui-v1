import React from "react"
import {connect} from "react-redux"
import FormViewStyle from "../../../styles/FormViewStyle";
import ViewInfo from "../../Common/Constructions/ViewInfo";
import List from "../../Common/Lists/List";
import Btn from "../../Common/Buttons/Btn";
import {gameView} from "../../../Views";
import {changeView} from "../../../data-layer/ActionCreators";
import MerchandiseCategoryForm from "../MerchandiseCategoryForm";
import SmallDeletableListItem from "../../Common/ListElements/SmallDeletableListItem";
import {httpDelete, post} from "../../../util/Http";
import {deleteMerchandiseCategoryUrl, saveMerchandiseCategoryUrl} from "../../../util/Parameters";
import ListItem from "../../Common/ListElements/ListItem";
import Popup from "../../../util/Popup";

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
        merchandiseCategoryFormVisible: false,
        merchandiseTypeFormVisible: false,
        merchandiseFormVisible: false,
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
                                  onUpdate={() => alert("update")}
                        />
                    )}
                    isAddButtonVisible={!this.state.merchandiseCategoryFormVisible}
                    onAddClicked={() => this.onAddMerchandiseCategoryClicked()}
                />

                {
                    this.state.merchandiseCategoryFormVisible &&
                    <MerchandiseCategoryForm onSubmit={(form) => this.onMerchandiseCategoryFormSubmit(form)}/>
                }

                <List
                    title={"Типы товаров:"}
                    isAddButtonVisible={!this.state.merchandiseTypeFormVisible}
                    noItemsText={"Нет типов"}
                    onAddClicked={() => this.onAddMerchandiseTypeClicked()}
                />

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
        this.setState({merchandiseCategoryFormVisible: true})
    }

    onMerchandiseCategoryFormSubmit(form) {
        post(saveMerchandiseCategoryUrl(this.state.id), form, rs => {
            this.setState({
                merchandiseCategories: this.state.merchandiseCategories.concat(rs),
                merchandiseCategoryFormVisible: false
            })

            Popup.info("Категория создана")
        }, () => Popup.error("Ошибка при создании категории товара. Обратитесь к администратору."))
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

    onAddMerchandiseTypeClicked() {
        this.setState({merchandiseTypeFormVisible: true})
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