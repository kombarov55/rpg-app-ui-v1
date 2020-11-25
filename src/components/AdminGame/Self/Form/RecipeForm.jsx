import React from "react";
import FormTitleLabel from "../../../Common/Labels/FormTitleLabel";
import SubmitButton from "../../../Common/Buttons/SubmitButton";
import InputLabel from "../../../Common/Labels/InputLabel";
import FormViewStyle from "../../../../styles/FormViewStyle";
import ListItem from "../../../Common/ListElements/ListItem";
import List from "../../../Common/Lists/List";
import SuccessChanceDependencyForm from "./SuccessChanceDependencyForm";
import RemoteAutocomplete from "../../../Common/Input/RemoteAutocomplete";
import {findCraftableItemTemplatesByGameIdAndNameUrl, findSkillByNameUrl} from "../../../../util/Parameters";
import Validation from "../../../../util/Validation";
import ItemTemplateAmountForm from "./ItemTemplateAmountForm";

export default class extends React.Component {

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
                <RemoteAutocomplete
                    buildSyncUrl={input => findCraftableItemTemplatesByGameIdAndNameUrl(this.props.gameId, input)}
                    onSelected={itemTemplate => this.setState({target: itemTemplate})}
                />

                <List title={"Предметы, участвующие в крафте:"}
                      noItemsText={"Отсутствуют.."}
                      isAddButtonVisible={!this.state.ingredientFormVisible}
                      onAddClicked={() => this.setState({ingredientFormVisible: true})}
                      values={this.state.ingredients.map(itemTemplateAmount =>
                          <ListItem text={`${itemTemplateAmount.itemTemplate.name} ${itemTemplateAmount.amount} шт.`}
                                    onDelete={() => this.setState(state => ({ingredients: state.ingredients.filter(v => v !== itemTemplateAmount)}))}
                          />
                      )}
                />
                {
                    this.state.ingredientFormVisible &&
                    <ItemTemplateAmountForm
                        gameId={this.props.gameId}
                        onSubmit={form => this.setState(state => ({
                            ingredients: state.ingredients.concat(form),
                            ingredientFormVisible: false
                        }))}
                    />
                }

                <InputLabel text={"Навык, влияющий на успех:"}/>
                <RemoteAutocomplete buildSyncUrl={input => findSkillByNameUrl(this.props.gameId, input)}
                                    onSelected={skill => this.setState({dependantSkill: skill})}
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
                          <ListItem
                              text={successChanceDependency.min + " до " + successChanceDependency.max + ": " + successChanceDependency.percent + "%"}
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
                                  const success = Validation.run(
                                      Validation.nonNull(this.state.target, "Цель"),
                                      Validation.notEmpty(this.state.ingredients, "Ингредиенты")
                                  )
                                  if (success) {
                                      this.props.onSubmit(this.state)
                                  }
                              }}
                />
            </div>
        )
    }
}