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
import SkillInfluenceForm from "./SkillInfluenceForm";
import FormMode from "../../data-layer/enums/FormMode";
import {connect} from "react-redux"
import {currenciesByGameIdUrl, skillsByGameIdUrl} from "../../util/Parameters";
import {get} from "../../util/Http"

export default connect(
    state => ({
        gameId: state.activeGame.id
    }), null
)(class MerchandiseForm extends React.Component {

    constructor(props) {
        super(props)

        this.state = props.initialState != null ? props.initialState : this.initialState

        get(skillsByGameIdUrl(this.props.gameId), rs => this.setState({skills: rs}))
        get(currenciesByGameIdUrl(this.props.gameId), rs => this.setState({currencies: rs}))
    }

    initialState = {
        name: "",
        img: "",
        category: "",
        type: "",
        slots: 0,
        prices: [],
        skillInfluences: [],

        skills: [],
        currencies: [],

        skillInfluenceFormVisible: false,
        skillInfluenceFormMode: FormMode.CREATE,
        skillInfluenceObjToUpdate: null
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
                <PriceInput currencies={this.state.currencies.map(it => it.name)}
                            onSubmit={priceList => this.setState(state => ({prices: state.prices.concat([priceList])}))}
                />

                <InputLabel text={"Влияние на навыки:"}/>
                <List noItemsText={"Пусто"}
                      values={this.state.skillInfluences.map(skillInfluence =>
                          <ListItem
                              text={skillInfluence.skill.name + " " + skillInfluence.modifier.name + " " + skillInfluence.amount}
                              onDelete={() => this.onSkillInfluenceDeleted(skillInfluence)}
                          />
                      )}
                      isAddButtonVisible={!this.state.skillInfluenceFormVisible}
                      onAddClicked={() => this.onAddInfluenceClicked()}
                />
                {
                    this.state.skillInfluenceFormVisible && (
                        this.state.skillInfluenceFormMode === FormMode.CREATE ?
                            <SkillInfluenceForm
                                skills={this.state.skills}
                                onSubmit={form => this.saveSkillInfluence(form)}
                            /> :
                            <SkillInfluenceForm
                                skills={this.state.skills}
                                initialState={this.state.skillInfluenceObjToUpdate}
                                onSubmit={form => this.saveSkillInfluence(form)}
                            />
                    )
                }


                <SubmitButton text={"Сохранить товар"}
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

    onAddInfluenceClicked() {
        this.setState({
            skillInfluenceFormVisible: true,
            skillInfluenceFormMode: FormMode.CREATE
        })
    }

    saveSkillInfluence(form) {
        this.setState(state => ({
            skillInfluences: state.skillInfluences.concat(form)
        }))
    }

    onSkillInfluenceDeleted(skillInfluence) {
        console.log(skillInfluence)
        this.setState(state => ({
            skillInfluences: state.skillInfluences.filter(it => it.skill !== skillInfluence.skill)
        }))
    }

    onSubmitClicked() {
        this.props.onSubmit(this.state)
        this.setState(this.initialState)
    }
})