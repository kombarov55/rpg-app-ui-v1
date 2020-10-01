import React from "react";
import Label from "../../../Common/Labels/Label";
import List from "../../../Common/Lists/List";
import FormMode from "../../../../data-layer/enums/FormMode";
import SpellSchoolForm from "../../Skill/Form/SpellSchoolForm";
import {post, put} from "../../../../util/Http";
import {addSpellSchoolUrl, editSpellSchoolUrl} from "../../../../util/Parameters";
import Popup from "../../../../util/Popup";
import ExpandableListItemWithBullets from "../../../Common/ListElements/ExpandableListItemWithBullets";
import priceCombinationListToString from "../../../../util/priceCombinationListToString";
import {spellSchoolView} from "../../../../Views";

export default class ComplexSkillCategoryView extends React.Component {

    constructor(props) {
        super(props);

        this.state = Object.assign({}, this.formInitialState, {
            spellSchools: props.spellSchools
        })
    }

    formInitialState = {

        spellSchoolFormVisible: false,
        spellSchoolForm: null,
        spellSchoolFormMode: FormMode.CREATE
    }

    render() {
        return (
            <div>
                <Label text={"Сложный тип"}/>
                <List title={"Школы навыков:"}
                      noItemsText={"Нет школ навыков"}
                      isAddButtonVisible={!this.state.spellSchoolFormVisible}
                      onAddClicked={() => this.setState({
                          spellSchoolFormVisible: true,
                          spellSchoolFormMode: FormMode.CREATE
                      })}
                      values={this.state.spellSchools.map(spellSchool =>

                              <ExpandableListItemWithBullets
                                  img={spellSchool.img}
                                  name={spellSchool.name}
                                  description={spellSchool.description}
                                  bullets={[
                                      "Мин. количество выученных заклинаний для перехода на сл. уровень: " + spellSchool.minSpellCountToUpgrade,
                                      "Цена покупки: " + priceCombinationListToString(spellSchool.purchasePriceCombinations)
                                  ]}

                                  onEditClicked={() => this.setState({
                                      spellSchoolForm: spellSchool,
                                      spellSchoolFormMode: FormMode.EDIT,
                                      spellSchoolFormVisible: true
                                  })}
                                  onDetailsClicked={() => {
                                      this.props.changeView(spellSchoolView)

                                  }}

                                  alwaysExpand={true}
                                  key={spellSchool.id}
                              />
                          /*

                          <ExpandableListItem
                              img={spellSchool.img}
                              name={spellSchool.name}
                              alwaysExpand={true}
                              expandableElements={[
                                  <div>{spellSchool.description}</div>,
                                  <InputLabel
                                      text={"Минимальное количество заклинаний для перехода на следующий уровень: " + spellSchool.minSpellCountToUpgrade}/>,
                                  <List title={"Круги заклинаний:"}
                                        noItemsText={"Нет кругов заклинаний"}
                                        values={spellSchool.schoolLvls.map(schoolLvl =>

                                            <ExpandableListItem
                                                name={"Уровень: " + schoolLvl.lvl}
                                                alwaysExpand={true}
                                                expandableElements={[
                                                    <List title={"Цены заклинаний:"}
                                                          noItemsText={"Бесплатно!"}
                                                          values={schoolLvl.upgradePriceCombinations.map(v =>
                                                              <div>{v.spellCount} заклинаний
                                                                  изучено: {priceCombinationListToString(v.priceCombinations)}</div>
                                                          )}
                                                    />,
                                                    // <InputLabel
                                                    //     text={"Цена перехода на следующий уровень: " + priceCombinationListToString(schoolLvl.upgradePriceCombinations.priceCombinations)}/>,
                                                    <List title={"Заклинания:"}
                                                          noItemsText={"Нет заклинаний"}
                                                          values={schoolLvl.spells.map(spell =>
                                                              <HorizontalListItem
                                                                  name={spell.name}
                                                                  imgSrc={spell.imgSrc}
                                                                  description={spell.description}
                                                              />
                                                          )}
                                                    />
                                                ]}
                                            />
                                        )}
                                  />
                              ]}
                          />

                           */
                      )}
                />
                {
                    this.state.spellSchoolFormVisible &&
                    (
                        this.state.spellSchoolFormMode == FormMode.CREATE ?
                            <SpellSchoolForm currencyNames={this.props.currencies.map(v => v.name)}
                                             onSubmit={form => this.onAddSpellSchoolSubmit(form)}
                            /> :
                            <SpellSchoolForm initialState={this.state.spellSchoolForm}
                                             currencyNames={this.props.currencies.map(v => v.name)}
                                             onSubmit={form => this.onEditSpellSchoolSubmit(form)}
                            />
                    )
                }
            </div>
        )
    }

    onAddSpellSchoolSubmit(form) {
        post(addSpellSchoolUrl(this.props.skillCategoryId), form, rs => {
            this.setState(state => ({
                spellSchoolFormVisible: false,
                spellSchools: state.spellSchools.concat(rs)
            }))
        })
        Popup.info("Школа навыков добавлена.")
    }

    onEditSpellSchoolSubmit(form) {
        put(editSpellSchoolUrl(form.id), form, rs => {
            this.setState(state => ({
                spellSchoolFormVisible: false,
                spellSchools: state.spellSchools.filter(v => v.id !== rs.id).concat(rs)
            }))
            Popup.info("Школа навыков обновлена.")
        })
    }
}