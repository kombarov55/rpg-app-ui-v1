import React from "react";
import SubmitButton from "../../../Common/Buttons/SubmitButton";
import LocalAutocomplete from "../../../Common/Input/LocalAutocomplete";
import InputLabel from "../../../Common/Labels/InputLabel";
import ListItem from "../../../Common/ListElements/ListItem";
import ExpandableListItem from "../../../Common/ListElements/ExpandableListItem";
import AdminRecipeListItem from "../../../ListItem/AdminRecipeListItem";
import List from "../../../Common/Lists/List";
import Btn from "../../../Common/Buttons/Btn";
import Validation from "../../../../util/Validation";
import RedButton from "../../../Common/Buttons/RedButton";

export default class extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            recipe: null,
            selectedItems: []
        }
    }

    render() {
        return (
            <div>
                <InputLabel text={"Выберите формулу:"}/>
                {
                    this.state.recipe != null ?
                        <AdminRecipeListItem recipe={this.state.recipe}
                                             onDelete={() => this.setState({
                                                 recipe: null,
                                                 selectedItems: []
                                             })}
                        /> :
                        <LocalAutocomplete items={this.props.recipes}
                                           onSelected={item => this.setState({
                                               recipe: item,
                                               selectedItems: []
                                           })}
                        />
                }

                {
                    (this.state.recipe != null && !this.haveEnoughSkill(this.state.recipe)) &&
                    <RedButton text={"Вам не хватает навыков для создания этого предмета."}/>
                }

                {
                    (this.state.recipe != null && this.haveEnoughSkill(this.state.recipe)) &&
                    <>
                        <InputLabel text={"Выберите предметы для крафта:"}/>
                        <List title={"Выбрано:"}
                              values={this.state.selectedItems.map(item =>
                                  <ListItem text={item.name}
                                            onDelete={() => this.setState(state => ({
                                                selectedItems: state.selectedItems.filter(v => v.id !== item.id)
                                            }))}
                                  />
                              )}
                        />

                        <List title={"Инвентарь:"}
                              values={this.props.items
                                  .filter(item => !this.isSelected(item))
                                  .filter(item => this.isIngredient(item))
                                  .map(item =>
                                      <ExpandableListItem img={item.img}
                                                          name={item.name}
                                                          description={item.description}
                                                          expandableElements={[
                                                              <Btn text={"Выбрать"} onClick={() => {
                                                                  if (this.state.recipe.ingredients.some(({itemTemplate}) => itemTemplate.id === item.templateId)) {
                                                                      this.setState(state => ({
                                                                          selectedItems: state.selectedItems.concat(item)
                                                                      }))
                                                                  }

                                                              }}/>
                                                          ]}
                                                          alwaysExpand={true}
                                      />
                                  )}
                        />

                        <SubmitButton text={"Создать"}
                                      onClick={() => {
                                          const success = Validation.run(
                                              Validation.nonNull(this.state.recipe),
                                              Validation.isTrue(this.state.recipe?.ingredients?.every(({itemTemplate, amount}) =>
                                                  this.state.selectedItems.filter(item => item.templateId === itemTemplate.id).length === amount
                                              ), "Недостаточно компонентов для крафта")
                                          )
                                          if (success) {
                                              this.props.onSubmit(this.state)
                                          }
                                      }}
                        />
                    </>
                }
            </div>
        )
    }

    isSelected(item) {
        return this.state.selectedItems.some(selectedItem => item.id === selectedItem.id)
    }

    isIngredient(item) {
        return this.state.recipe?.ingredients?.some(({itemTemplate}) => itemTemplate.id === item.templateId)
    }

    haveEnoughSkill(recipe) {
        const skillId = recipe.dependantSkill.id
        const lvl = recipe.minSkillLvl

        console.log({learnedSkills: this.props.learnedSkills, skillId: skillId, lvl: lvl})

        return this.props.learnedSkills.some((skillToLvlDto) => skillToLvlDto.skill.id === skillId && skillToLvlDto.amount >= lvl)
    }
}