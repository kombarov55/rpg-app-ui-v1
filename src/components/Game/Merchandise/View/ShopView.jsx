import React from "react"
import {connect} from "react-redux"
import FormViewStyle from "../../../../styles/FormViewStyle";
import ViewInfo from "../../../Common/Constructions/ViewInfo";
import List from "../../../Common/Lists/List";
import Btn from "../../../Common/Buttons/Btn";
import {gameView} from "../../../../Views";
import {changeView} from "../../../../data-layer/ActionCreators";
import {get, httpDelete, post, put} from "../../../../util/Http";
import {
    deleteWarehouseEntryUrl,
    merchandiseUrl,
    saveWarehouseEntryUrl,
    updateWarehouseEntryUrl
} from "../../../../util/Parameters";
import FormMode from "../../../../data-layer/enums/FormMode";
import WarehouseEntryForm from "../Form/WarehouseEntryForm";
import Popup from "../../../../util/Popup";
import ListItem from "../../../Common/ListElements/ListItem";

export default connect(
    state => ({
        gameId: state.activeGame.id,
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
        get(merchandiseUrl(this.props.gameId), rs => this.setState({merchandiseList: rs}))
    }

    initialState = {
        merchandiseList: [],

        warehouseEntryFormMode: FormMode.CREATE,
        warehouseEntryObjToUpdate: null,
        warehouseEntryFormVisible: false
    }

    render() {
        return (
            <div style={FormViewStyle}>
                <ViewInfo
                    name={"Магазин"}
                    description={"Магазин для игроков"}
                />

                <List
                    title={"Заполнить магазин:"}
                    isAddButtonVisible={!this.state.warehouseEntryFormVisible}
                    noItemsText={"Магазин пуст"}
                    onAddClicked={() => this.onAddWarehouseEntryClicked()}
                    values={this.state.warehouseEntries.map(warehouseEntry =>
                        <ListItem text={warehouseEntry.merchandise.name + ": " + warehouseEntry.amount + " шт."}
                                  onEdit={() => this.onEditWarehouseEntryClicked(warehouseEntry)}
                                  onDelete={() => this.deleteWarehouseEntry(warehouseEntry)}
                        />
                    )}
                />
                {
                    this.state.warehouseEntryFormVisible &&
                    (this.state.warehouseEntryFormMode === FormMode.CREATE ?
                            <WarehouseEntryForm
                                merchandiseList={this.state.merchandiseList}
                                onSubmit={form => this.saveWarehouseEntry(form)}
                            /> :
                            <WarehouseEntryForm
                                merchandiseList={this.state.merchandiseList}
                                initialState={this.state.warehouseEntryObjToUpdate}
                                onSubmit={form => this.updateWarehouseEntry(form)}
                            />
                    )
                }

                <Btn text={"Назад"} onClick={() => this.onBackClicked()}/>
            </div>
        )
    }

    onAddWarehouseEntryClicked() {
        this.setState({
            warehouseEntryFormVisible: true,
            warehouseEntryFormMode: FormMode.CREATE,
            warehouseEntryObjToUpdate: null
        })

    }

    onEditWarehouseEntryClicked(warehouseEntry) {
        this.setState({
            warehouseEntryFormVisible: true,
            warehouseEntryFormMode: FormMode.EDIT,
            warehouseEntryObjToUpdate: warehouseEntry
        })
    }

    saveWarehouseEntry(warehouseEntry) {
        post(saveWarehouseEntryUrl(this.state.id), warehouseEntry, rs => {
            this.setState(state => ({
                warehouseEntries: state.warehouseEntries.concat(rs)
            }))

            Popup.info("Товар добавлен в магазин")
        }, () => Popup.error("Ошибка при добавлении товара. Обратитесь к администратору."))
    }

    updateWarehouseEntry(warehouseEntry) {
        put(updateWarehouseEntryUrl(this.state.id, warehouseEntry.id), warehouseEntry, rs => {
            this.setState(state => ({
                warehouseEntries: state.warehouseEntries.filter(v => v.id !== rs.id).concat(rs)
            }))

            Popup.info("Товар обновлен")
        }, () => Popup.error("Ошибка при обновлении товара. Обратитесь к администратору."))
    }

    deleteWarehouseEntry(warehouseEntry) {
        httpDelete(deleteWarehouseEntryUrl(warehouseEntry.id), rs => {
            this.setState(state => ({
                warehouseEntries: state.warehouseEntries.filter(v => v.id !== rs.id)
            }))
            Popup.info("Товар удалён из магазина")
        }, () => Popup.error("Ошибка удаления товара из магазина. Обратитесь к администратору."))
    }

    onBackClicked() {
        this.props.toPrevView()
    }
})