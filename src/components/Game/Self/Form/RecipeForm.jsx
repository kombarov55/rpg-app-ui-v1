import React from "react";
import FormTitleLabel from "../../../Common/Labels/FormTitleLabel";
import SubmitButton from "../../../Common/Buttons/SubmitButton";
import InputLabel from "../../../Common/Labels/InputLabel";
import FormViewStyle from "../../../../styles/FormViewStyle";
import ListItem from "../../../Common/ListElements/ListItem";
import List from "../../../Common/Lists/List";
import WarehouseEntryForm from "../../Merchandise/Form/WarehouseEntryForm";
import {SelectButton} from "primereact/selectbutton";
import SuccessChanceDependencyForm from "./SuccessChanceDependencyForm";

export default class RecipeForm extends React.Component {

    constructor(props) {
        super(props);

        const initialState = props.initialState == null ?
            this.initialState :
            props.initialState

        this.state = Object.assign({}, initialState, this.formState)
    }

    initialState = {
        target: null,
        ingredients: [],
        dependantSkill: null,
        minSkillLvl: null,
        successChanceDependencies: []
    }

    formState = {
        ingredientFormVisible: false,
        successChanceDependencyFormVisible: false
    }

    render() {
        return (
            <div style={FormViewStyle}>
                <FormTitleLabel text={"Формула крафта:"}/>
                <InputLabel text={"Цель:"}/>
                <SelectButton
                    options={this.props.targetOptions.map(v => ({label: v.name, value: v}))}
                    value={this.state.target}
                    onChange={e => this.setState({target: e.target.value})}
                />

                <List title={"Предметы, участвующие в крафте:"}
                      noItemsText={"Отсутствуют.."}
                      isAddButtonVisible={!this.state.ingredientFormVisible}
                      onAddClicked={() => this.setState({ingredientFormVisible: true})}
                      values={this.state.ingredients.map(warehouseEntry =>
                          <ListItem text={warehouseEntry.merchandise.name + ": " + warehouseEntry.amount + " шт."}
                                    onDelete={() => this.setState(state => ({ingredients: state.ingredients.filter(v => v !== warehouseEntry)}))}
                          />
                      )}
                />
                {
                    this.state.ingredientFormVisible &&
                    <WarehouseEntryForm
                        merchandiseList={this.props.ingredientOptions}
                        onSubmit={warehouseEntry => this.setState(state => ({
                            ingredients: state.ingredients.concat(warehouseEntry),
                            ingredientFormVisible: false
                        }))}
                    />
                }

                <InputLabel text={"Навык, влияющий на успех:"}/>
                <SelectButton
                    options={this.props.dependantSkillOptions.map(v => ({label: v.name, value: v}))}
                    value={this.state.dependantSkill}
                    onChange={e => this.setState({dependantSkill: e.target.value})}
                />

                <InputLabel text={"Минимальный уровень навыка для создания предмета:"}/>
                <input value={this.state.minSkillLvl}
                       onChange={e => this.setState({minSkillLvl: e.target.value})}
                />

                <List title={"Зависимость уровня навыка на шанс успеха:"}
                      noItemsText={"Не указана..."}
                      isAddButtonVisible={!this.state.successChanceDependencyFormVisible}
                      onAddClicked={() => this.setState({successChanceDependencyFormVisible: true})}
                      values={this.state.successChanceDependencies.map(successChanceDependency =>
                          <ListItem text={successChanceDependency.min + " до " + successChanceDependency.max + ": " + successChanceDependency.percent + "%"}
                                    onDelete={() => this.setState(state => ({successChanceDependencies: state.successChanceDependencies.filter(v => v !== successChanceDependency)}))}
                          />
                      )}
                />
                {
                    this.state.successChanceDependencyFormVisible &&
                        <SuccessChanceDependencyForm
                            onSubmit={successChanceDependency => this.setState(state => ({
                                successChanceDependencies: state.successChanceDependencies.concat(successChanceDependency),
                                successChanceDependencyFormVisible: false
                            }))}
                        />
                }

                <SubmitButton text={"Сохранить"}
                              onClick={() => {
                                  this.props.onSubmit(this.state)
                              }}
                />
            </div>
        )
    }
}