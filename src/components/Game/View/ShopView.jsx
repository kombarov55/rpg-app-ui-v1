import React from "react"
import {connect} from "react-redux"
import FormViewStyle from "../../../styles/FormViewStyle";
import ViewInfo from "../../Common/Constructions/ViewInfo";
import List from "../../Common/Lists/List";
import Btn from "../../Common/Buttons/Btn";
import {gameView} from "../../../Views";
import {changeView} from "../../../data-layer/ActionCreators";

export default connect(
    state => ({}),
    dispatch => ({
        toPrevView: () => dispatch(changeView(gameView))
    })
)(class ShopView extends React.Component {
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
                />

                <List
                    title={"Типы товаров:"}
                    noItemsText={"Нет типов"}
                />

                <List
                    title={"Товары:"}
                    noItemsText={"Нет товаров"}
                />

                <List
                    title={"Заполнить магазин:"}
                    noItemsText={"Магазин пуст"}
                />

                <Btn text={"Назад"} onClick={() => this.onBackClicked()}/>
            </div>
        )
    }

    onBackClicked() {
        this.props.toPrevView()
    }
})