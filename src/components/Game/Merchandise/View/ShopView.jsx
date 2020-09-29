import React from "react"
import {connect} from "react-redux"
import FormViewStyle from "../../../../styles/FormViewStyle";
import ViewInfo from "../../../Common/Constructions/ViewInfo";
import List from "../../../Common/Lists/List";
import Btn from "../../../Common/Buttons/Btn";
import {gameView} from "../../../../Views";
import {changeView, setAvailableMerchandise} from "../../../../data-layer/ActionCreators";
import {get, httpDelete, post, put} from "../../../../util/Http";
import {
    deleteItemForSaleUrl,
    merchandiseByGameIdAndDestination,
    saveItemForSaleUrl,
    updateItemForSaleUrl
} from "../../../../util/Parameters";
import FormMode from "../../../../data-layer/enums/FormMode";
import Popup from "../../../../util/Popup";
import ListItem from "../../../Common/ListElements/ListItem";
import ItemForSaleForm from "../Form/ItemForSaleForm";
import ShopType from "../../../../data-layer/enums/ShopType";
import Destination from "../../../../data-layer/enums/Destination";

export default connect(
    state => ({
        gameId: state.activeGame.id,
        changeViewParams: state.changeViewParams,
        currencies: state.activeGame.currencies,
        availableMerchandise: state.availableMerchandise
    }),
    dispatch => ({
        setAvailableMerchandise: merchandiseList => dispatch(setAvailableMerchandise(merchandiseList)),
        toPrevView: () => dispatch(changeView(gameView))
    })
)(class ShopView extends React.Component {

    constructor(props) {
        super(props)

        const {shop} = this.props.changeViewParams

        this.state = Object.assign({}, shop, this.initialState)

        get(merchandiseByGameIdAndDestination(
            this.props.gameId,
            this.state.type == ShopType.PLAYERS ?
                Destination.PLAYER :
                [
                    Destination.COUNTRY, Destination.INSTITUTION, Destination.HOUSE,
                    Destination.SHIP, Destination.MARKETPLACE
                ].join(",")
        ), rs => this.props.setAvailableMerchandise(rs))
    }

    initialState = {
        merchandiseList: [],

        itemForSaleFormMode: FormMode.CREATE,
        itemForSaleObjToUpdate: null,
        itemForSaleFormVisible: false
    }

    render() {
        return (
            <div style={FormViewStyle}>
                <ViewInfo
                    name={"Магазин"}
                    description={"Магазин для игроков"}
                />

                <List
                    title={"Товары на продажу:"}
                    isAddButtonVisible={!this.state.itemForSaleFormVisible}
                    noItemsText={"Магазин пуст"}
                    onAddClicked={() => this.onAddItemForSaleClicked()}
                    values={this.state.itemsForSale.map(itemForSale =>
                        <ListItem text={itemForSale.merchandise.name + ": " + itemForSale.amount + " шт."}
                                  onEdit={() => this.onEditItemForSaleClicked(itemForSale)}
                                  onDelete={() => this.deleteItemForSale(itemForSale)}
                        />
                    )}
                />
                {
                    this.state.itemForSaleFormVisible &&
                    (this.state.itemForSaleFormMode === FormMode.CREATE ?
                            <ItemForSaleForm
                                currencies={this.props.currencies}
                                merchandiseList={this.props.availableMerchandise}
                                onSubmit={form => this.saveItemForSale(form)}
                            /> :
                            <ItemForSaleForm
                                initialState={this.state.itemForSaleObjToUpdate}
                                currencies={this.props.currencies}
                                merchandiseList={this.props.availableMerchandise}
                                onSubmit={form => this.saveItemForSale(form)}
                            />
                    )
                }

                <Btn text={"Назад"} onClick={() => this.onBackClicked()}/>
            </div>
        )
    }

    onAddItemForSaleClicked() {
        this.setState({
            itemForSaleFormVisible: true,
            itemForSaleFormMode: FormMode.CREATE,
            itemForSaleObjToUpdate: null
        })

    }

    onEditItemForSaleClicked(itemForSale) {
        this.setState({
            itemForSaleFormVisible: true,
            itemForSaleFormMode: FormMode.EDIT,
            itemForSaleObjToUpdate: itemForSale
        })
    }

    saveItemForSale(itemForSale) {
        post(saveItemForSaleUrl(this.props.gameId, this.state.id), itemForSale, rs => {
            this.setState({
                itemsForSale: rs.itemsForSale,
                itemForSaleVisible: false
            })

            Popup.info("Товар добавлен в магазин")
        }, () => Popup.error("Ошибка при добавлении товара. Обратитесь к администратору."))
    }

    updateItemForSale(itemForSale) {
        put(updateItemForSaleUrl(this.props.gameId, this.state.id, itemForSale.id), itemForSale, rs => {
            this.setState(state => ({
                itemsForSale: state.itemsForSale.filter(v => v.id !== rs.id).concat(rs),
                itemForSaleVisible: false
            }))

            Popup.info("Товар обновлен")
        }, () => Popup.error("Ошибка при обновлении товара. Обратитесь к администратору."))
    }

    deleteItemForSale(itemForSale) {
        httpDelete(deleteItemForSaleUrl(this.props.gameId, this.state.id, itemForSale.id), rs => {
            this.setState(state => ({
                itemsForSale: state.itemsForSale.filter(v => v.id !== rs.id)
            }))
            Popup.info("Товар снят с продажи")
        }, () => Popup.error("Ошибка при снятии товара с продажи. Обратитесь к администратору."))
    }

    onBackClicked() {
        this.props.toPrevView()
    }
})