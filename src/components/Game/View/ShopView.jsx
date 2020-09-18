import React from "react"
import {connect} from "react-redux"
import FormViewStyle from "../../../styles/FormViewStyle";
import ViewInfo from "../../Common/Constructions/ViewInfo";
import List from "../../Common/Lists/List";
import Btn from "../../Common/Buttons/Btn";
import {gameView} from "../../../Views";
import {changeView} from "../../../data-layer/ActionCreators";
import {httpDelete, post, put} from "../../../util/Http";
import {merchandiseCategoryUrl, merchandiseTypeByIdUrl, merchandiseTypeUrl} from "../../../util/Parameters";
import Popup from "../../../util/Popup";
import FormMode from "../../../data-layer/enums/FormMode";

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
            merchandiseTypeByIdUrl(this.props.gameId, merchandiseType.id), () => {
                this.setState(state => ({
                    merchandiseTypes: state.merchandiseTypes.filter(it => it.id !== merchandiseType.id)
                }))
                Popup.info("Тип товара удалён")
            }, () => Popup.error("Ошибка при удалении типа товара"))
    }

    saveMerchandiseCategory(form) {
        post(merchandiseCategoryUrl(this.props.gameId), form, rs => {
            this.setState({
                merchandiseCategories: this.state.merchandiseCategories.concat(rs),
                merchandiseCategoryFormVisible: false
            })

            Popup.info("Категория создана")
        }, () => Popup.error("Ошибка при создании категории товара. Обратитесь к администратору."))
    }

    updateMerchandiseCategory(form) {
        put(merchandiseCategoryUrl(this.props.gameId), form, rs => {
            this.setState({
                merchandiseCategories: this.state.merchandiseCategories.filter(it => it.id !== rs.id).concat(rs),
                merchandiseCategoryFormVisible: false
            })

            Popup.info("Категория обновлена")
        }, () => Popup.error("Ошибка при обновлении категории товара. Обратитесь к администратору."))
    }

    saveMerchandiseType(form) {
        post(merchandiseTypeUrl(this.props.gameId), form, rs => {
            this.setState(state => ({
                merchandiseTypes: state.merchandiseTypes.concat(rs),
                merchandiseTypeFormVisible: false
            }))
            Popup.info("Тип товара создан.")
        }, () => Popup.error("Ошибка при создании типа товара."))
    }

    updateMerchandiseType(form) {
        put(merchandiseTypeByIdUrl(this.props.gameId, form.id), form, rs => {
            this.setState(state => ({
                merchandiseTypes: state.merchandiseTypes.filter(it => it.id !== rs.id).concat(rs),
                merchandiseTypeFormVisible: false
            }))
            Popup.info("Тип товара обновлен.")
        }, () => Popup.error("Ошибка при обновлении типа товара."))
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

    onAddMerchandiseAmountClicked() {
        this.setState({merchandiseAmountFormVisible: true})

    }

    onBackClicked() {
        this.props.toPrevView()
    }
})