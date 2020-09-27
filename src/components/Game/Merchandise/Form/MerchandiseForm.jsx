import React from "react";
import InnerFormStyle from "../../../../styles/InnerFormStyle";
import InputLabel from "../../../Common/Labels/InputLabel";
import SubmitButton from "../../../Common/Buttons/SubmitButton";
import {upload} from "../../../../util/HttpRequests";
import {SelectButton} from "primereact/selectbutton";
import PriceInput from "../../../Common/Input/PriceInput";
import List from "../../../Common/Lists/List";
import ListItem from "../../../Common/ListElements/ListItem";
import priceCombinationToString from "../../../../util/priceCombinationToString";
import SkillInfluenceForm from "./SkillInfluenceForm";
import FormMode from "../../../../data-layer/enums/FormMode";
import {connect} from "react-redux"
import {InputTextarea} from "primereact/inputtextarea";
import Destination from "../../../../data-layer/enums/Destination";

export default connect(
    state => ({
        gameId: state.activeGame.id
    }), null
)(class MerchandiseForm extends React.Component {

    /**
     * @param props: {
     *   types:      [{MerchandiseType}],
     *   categories: [{MerchandiseCategory}],
     *   skills:     [{Skill}]
     *   currencies: [{Currency}]
     * }
     */
    constructor(props) {
        super(props)

        this.state = Object.assign({
            skillInfluenceFormVisible: false,
            skillInfluenceFormMode: FormMode.CREATE,
            skillInfluenceObjToUpdate: null
        }, props.initialState != null ? props.initialState : this.initialState)
    }

    initialState = {
        name: "",
        img: "",
        description: "",
        category: "",
        type: "",
        slots: 1,
        prices: [],
        skillInfluences: [],
        destination: null,
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

                <InputLabel text={"Описание:"}/>
                <InputTextarea autoResize={true}
                               value={this.state.description}
                               onChange={e => this.setState({description: e.target.value})}
                />

                <InputLabel text={"Для кого товар?"}/>
                <SelectButton options={Destination.values.map(v => ({label: v.value, value: v.name}))}
                              value={this.state.destination}
                              onChange={e => this.setState({destination: e.target.value})}
                />

                <InputLabel text={"Категория:"}/>
                <SelectButton
                    options={this.props.merchandiseCategories.map(category => ({
                        label: category.name,
                        value: category
                    }))}
                    value={this.state.category}
                    onChange={e => this.setState({category: e.target.value})}
                />

                <InputLabel text={"Тип:"}/>
                <SelectButton
                    options={this.props.merchandiseTypes.map(type => ({label: type.name, value: type}))}
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
                <PriceInput currencies={this.props.currencies.map(it => it.name)}
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
                                skills={this.props.skills}
                                onSubmit={form => this.saveSkillInfluence(form)}
                            /> :
                            <SkillInfluenceForm
                                skills={this.props.skills}
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
            skillInfluences: state.skillInfluences.concat(form),
            skillInfluenceFormVisible: false
        }))
    }

    onSkillInfluenceDeleted(skillInfluence) {
        console.log(skillInfluence)
        this.setState(state => ({
            skillInfluences: state.skillInfluences.filter(it => it.skill.name !== skillInfluence.skill.name)
        }))
    }

    onSubmitClicked() {
        this.props.onSubmit({
            id: this.state.id,
            name: this.state.name,
            img: this.state.img,
            description: this.state.description,
            category: this.state.category,
            type: this.state.type,
            slots: this.state.slots,
            prices: this.state.prices,
            skillInfluences: this.state.skillInfluences,
            destination: this.state.destination
        })
        this.setState(this.initialState)
    }
})