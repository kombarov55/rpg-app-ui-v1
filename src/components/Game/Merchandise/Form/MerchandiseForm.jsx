import React from "react";
import InnerFormStyle from "../../../../styles/InnerFormStyle";
import InputLabel from "../../../Common/Labels/InputLabel";
import SubmitButton from "../../../Common/Buttons/SubmitButton";
import {upload} from "../../../../util/HttpRequests";
import {SelectButton} from "primereact/selectbutton";
import List from "../../../Common/Lists/List";
import ListItem from "../../../Common/ListElements/ListItem";
import SkillInfluenceForm from "./SkillInfluenceForm";
import FormMode from "../../../../data-layer/enums/FormMode";
import {connect} from "react-redux"
import {InputTextarea} from "primereact/inputtextarea";
import Destination from "../../../../data-layer/enums/Destination";
import {InputSwitch} from "primereact/inputswitch";
import Popup from "../../../../util/Popup";

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
        skillInfluences: [],
        destination: null,
        canBeEquipped: false,
        canBeCrafted: false,
        canBeUsedInCraft: false
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

                <InputLabel text={"Можно ли надеть?"}/>
                <InputSwitch
                    checked={this.state.canBeEquipped}
                    onChange={e => this.setState({canBeEquipped: e.value})}
                />

                <InputLabel text={"Можно ли скрафтить?"}/>
                <InputSwitch
                    checked={this.state.canBeCrafted}
                    onChange={e => this.setState({canBeCrafted: e.value})}
                />

                <InputLabel text={"Можно ли использовать в крафте?"}/>
                <InputSwitch
                    checked={this.state.canBeUsedInCraft}
                    onChange={e => this.setState({canBeUsedInCraft: e.value})}
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
        if (
            this.state.name == "" ||
            this.state.description == "" ||
            this.state.category == "" ||
            this.state.type == "" ||
            this.state.destination == null
        ) {
           Popup.error("Пожалуйста, заполните все обязательные поля: [Название, Описание, Категория, Тип, Для кого товар]")
            return
        }

        this.props.onSubmit(this.state)
        this.setState(this.initialState)
    }
})