import React from "react";
import List from "../../../Common/Lists/List";
import FormMode from "../../../../data-layer/enums/FormMode";
import SpellSchoolForm from "../Form/SpellSchoolForm";
import {post, put} from "../../../../util/Http";
import {addSpellSchoolUrl, editSpellSchoolUrl} from "../../../../util/Parameters";
import Popup from "../../../../util/Popup";
import ExpandableListItemWithBullets from "../../../Common/ListElements/ExpandableListItemWithBullets";
import priceCombinationListToString from "../../../../util/priceCombinationListToString";

export default class ComplexSkillCategoryComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            spellSchoolFormVisible: false,
            spellSchoolForm: null,
            spellSchoolFormMode: FormMode.CREATE,
            spellSchools: props.spellSchools
        }
    }

    render() {
        return (
            <div>
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
                                      this.props.toSpellSchoolView(spellSchool)
                                  }}

                                  alwaysExpand={true}
                                  key={spellSchool.id}
                              />
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