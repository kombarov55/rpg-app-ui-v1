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

export default connect(
    state => ({}),
    dispatch => ({
        toPrevView: () => dispatch(changeView(gameView))
    })
)(class ShopView extends React.Component {

    constructor(props) {
        super(props)

        this.state = this.initialState
    }

    initialState = {
        merchandiseCategories: [],

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
                        <SmallDeletableListItem text={category.name}/>
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
        this.setState({
            merchandiseCategories: this.state.merchandiseCategories.concat(form),
            merchandiseCategoryFormVisible: false
        })
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