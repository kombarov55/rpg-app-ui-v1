import React from "react";
import InnerFormStyle from "../../styles/InnerFormStyle";
import InputLabel from "../Common/Labels/InputLabel";
import SubmitButton from "../Common/Buttons/SubmitButton";
import {upload} from "../../util/HttpRequests";
import {SelectButton} from "primereact/selectbutton";
import PriceInput from "../Common/Input/PriceInput";
import List from "../Common/Lists/List";
import ListItem from "../Common/ListElements/ListItem";
import priceCombinationToString from "../../util/priceCombinationToString";

export default class MerchandiseForm extends React.Component {

    constructor(props) {
        super(props)

        this.state = props.initialState != null ? props.initialState : this.initialState
    }

    initialState = {
        name: "",
        img: "",
        category: "",
        type: "",
        slots: 0,
        prices: [],
        skillInfluences: []
    }

    render() {
        return (
            <div style={InnerFormStyle}>
                <InputLabel text={"Название товара:"}/>
                <input value={this.state.name}
                       onChange={e => this.setState({name: e.target.value})}
                />

                <InputLabel text={"Картинка:"}/>
                <input type={"file"}
                       onChange={e => upload(e.target.files[0], filename => this.setState({img: filename}))}
                />

                <InputLabel text={"Категория:"}/>
                <SelectButton
                    options={this.props.merchandiseCategories.map(category => ({
                        label: category.name,
                        value: category.id
                    }))}
                    value={this.state.category}
                    onChange={e => this.setState({category: e.target.value})}
                />

                <InputLabel text={"Тип:"}/>
                <SelectButton
                    options={this.props.merchandiseTypes.map(type => ({label: type.name, value: type.id}))}
                    value={this.state.type}
                    onChange={e => this.setState({type: e.target.value})}
                />

                <InputLabel text={"Количество слотов:"}/>
                <input value={this.state.slots}
                       onChange={e => this.setState({slots: e.target.value})}
                />

                <InputLabel text={"Стоимость:"}/>
                <List noItemsText={"Нет вариантов покупки"}
                      values={this.state.prices.map(priceCombination =>
                          <ListItem text={priceCombinationToString(priceCombination)}
                                    onDelete={() => this.onPriceCombinationDeleted(priceCombination)}
                          />
                      )}
                />
                <PriceInput currencies={["Золото", "Серебро", "Опыт"]}
                            onSubmit={priceList => this.setState(state => ({prices: state.prices.concat([priceList])}))}
                />

                <InputLabel text={"Влияние на навыки:"}/>

                <SubmitButton text={"Сохранить"}
                              onClick={() => this.onSubmitClicked()}
                />
            </div>
        )
    }

    onPriceCombinationDeleted(priceCombination) {
        this.setState(state => ({
            prices: state.prices.filter(it => it !== priceCombination)
        }))
    }

    onSubmitClicked() {
        this.props.onSubmit(this.state)
        this.setState(this.initialState)
    }
}