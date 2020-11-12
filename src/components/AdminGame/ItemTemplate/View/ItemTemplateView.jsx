import React from "react";
import {connect} from "react-redux"
import {changeView} from "../../../../data-layer/ActionCreators";
import {adminGameView} from "../../../../Views";
import Btn from "../../../Common/Buttons/Btn";
import FormMode from "../../../../data-layer/enums/FormMode";
import FormViewStyle from "../../../../styles/FormViewStyle";
import {get, httpDelete, post, put} from "../../../../util/Http";
import Popup from "../../../../util/Popup";
import {
    currenciesByGameIdUrl,
    itemCategoryByIdUrl,
    itemCategoryUrl,
    itemTemplateByIdUrl,
    itemTemplateUrl,
    itemTypeByIdUrl,
    itemTypeUrl,
    shortSkillsByGameIdUrl
} from "../../../../util/Parameters";
import ItemCategoryComponent from "../Component/ItemCategoryComponent";
import ItemTypeComponent from "../Component/ItemTypeComponent";
import ItemTemplateComponent from "../Component/ItemTemplateComponent";

export default connect(
    state => ({
        gameId: state.activeGame.id
    }),

    dispatch => ({
        back: () => dispatch(changeView(adminGameView))
    })
)(class MerchandiseView extends React.Component {
    constructor(props) {
        super(props)

        this.state = this.initialState

        get(itemCategoryUrl(props.gameId), rs => this.setState({itemCategories: rs}))
        get(itemTypeUrl(props.gameId), rs => this.setState({itemTypes: rs}))
        get(shortSkillsByGameIdUrl(props.gameId), rs => this.setState({skills: rs}))
        get(currenciesByGameIdUrl(props.gameId), rs => this.setState({currencies: rs}))
        get(itemTemplateUrl(props.gameId), rs => this.setState({merchandiseList: rs}))
    }

    initialState = {
        itemCategories: [],
        itemTypes: [],
        itemTemplates: [],

        skills: [],
        currencies: []
    }

    render() {
        return (
            <div style={FormViewStyle}>

                <ItemCategoryComponent itemCategories={this.state.itemCategories}
                                       onDeleteItemCategory={itemCategory => this.onDeleteItemCategory(itemCategory)}
                                       onSaveItemCategory={itemCategory => this.onSaveItemCategory(itemCategory)}
                                       onUpdateItemCategory={itemCategory => this.onUpdateItemCategory(itemCategory)}
                />

                <ItemTypeComponent itemTypes={this.state.itemTypes}
                                   onDeleteItemType={itemType => this.onDeleteItemType(itemType)}
                                   onSaveItemType={itemType => this.onSaveItemType(itemType)}
                                   onUpdateItemType={itemType => this.onUpdateItemType(itemType)}
                />

                <ItemTemplateComponent itemTemplates={this.state.itemTemplates}
                                       itemCategories={this.state.itemCategories}
                                       itemTypes={this.state.itemTypes}
                                       currencies={this.state.currencies}
                                       skills={this.state.skills}
                                       onSaveItemTemplate={itemTemplate => this.onSaveItemTemplate(itemTemplate)}
                                       onDeleteItemTemplate={itemTemplate => this.onDeleteItemTemplate(itemTemplate)}
                                       onUpdateItemTemplate={itemTemplate => this.onUpdateItemTemplate(itemTemplate)}
                />

                <Btn text={"Назад"} onClick={() => this.props.back()}/>
            </div>
        )
    }

    onSaveItemCategory(form) {
        post(itemCategoryUrl(this.props.gameId), form, rs => {
            this.setState({itemCategories: this.state.itemCategories.concat(rs)})
            Popup.info("Категория создана")
        })
    }

    onUpdateItemCategory(form) {
        put(itemCategoryUrl(this.props.gameId), form, rs => {
            this.setState({
                itemCategories: this.state.itemCategories.filter(it => it.id !== rs.id).concat(rs)
            })
            Popup.info("Категория обновлена")
        })
    }

    onDeleteItemCategory(category) {
        httpDelete(itemCategoryByIdUrl(this.props.gameId, category.id), () => {
            this.setState(state => ({itemCategories: state.itemCategories.filter(it => it !== category)}))
            Popup.info("Категория удалена")
        })
    }

    onDeleteItemType(itemType) {
        httpDelete(
            itemTypeByIdUrl(this.props.gameId, itemType.id), () => {
                this.setState(state => ({
                    itemTypes: state.itemTypes.filter(it => it.id !== itemType.id)
                }))
                Popup.info("Тип удалён")
            })
    }

    onSaveItemType(form) {
        post(itemTypeUrl(this.props.gameId), form, rs => {
            this.setState(state => ({
                itemTypes: state.itemTypes.concat(rs),
                merchandiseTypeFormVisible: false
            }))
            Popup.info("Тип создан.")
        })
    }

    onUpdateItemType(form) {
        put(itemTypeByIdUrl(this.props.gameId, form.id), form, rs => {
            this.setState(state => ({
                itemTypes: state.itemTypes.filter(it => it.id !== rs.id).concat(rs),
                merchandiseTypeFormVisible: false
            }))
            Popup.info("Тип обновлен.")
        })
    }

    onSaveItemTemplate(form) {
        post(itemTemplateUrl(this.props.gameId), form, rs => {
            this.setState(state => ({
                itemTemplates: state.itemTemplates.concat(rs),
                merchandiseFormVisible: false
            }))
            Popup.info("Товар был создан.")
        })
    }

    onUpdateItemTemplate(form) {
        put(itemTemplateByIdUrl(this.props.gameId, form.id), form, rs => {
            this.setState(state => ({
                itemTemplates: state.itemTemplates.filter(it => it.id !== rs.id).concat(rs),
                merchandiseFormVisible: false
            }))
            Popup.info("Товар был обновлён")
        })
    }


    onDeleteItemTemplate(itemTemplate) {
        httpDelete(itemTemplateByIdUrl(this.props.gameId, itemTemplate.id), () => {
                this.setState(state => ({itemTemplates: state.itemTemplates.filter(it => it.id !== itemTemplate.id)}))
                Popup.info("Товар удалён")
            }
        )
    }
})