import React from "react"
import {connect} from "react-redux"
import FormViewStyle from "../../../../styles/FormViewStyle";
import ViewInfo from "../../../Common/Constructions/ViewInfo";
import List from "../../../Common/Lists/List";
import Btn from "../../../Common/Buttons/Btn";
import {gameView} from "../../../../Views";
import {changeView} from "../../../../data-layer/ActionCreators";
import {httpDelete, post, put} from "../../../../util/Http";
import {merchandiseCategoryUrl, merchandiseTypeByIdUrl, merchandiseTypeUrl} from "../../../../util/Parameters";
import Popup from "../../../../util/Popup";
import FormMode from "../../../../data-layer/enums/FormMode";

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

    onAddMerchandiseAmountClicked() {
        this.setState({merchandiseAmountFormVisible: true})

    }

    onBackClicked() {
        this.props.toPrevView()
    }
})