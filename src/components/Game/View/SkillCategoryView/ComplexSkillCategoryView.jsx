import React from "react";
import Label from "../../../Common/Labels/Label";
import List from "../../../Common/Lists/List";
import ExpandableListItem from "../../../Common/ListElements/ExpandableListItem";
import InputLabel from "../../../Common/Labels/InputLabel";
import HorizontalListItem from "../../../Common/ListElements/HorizontalListItem";
import priceCombinationListToString from "../../../../util/priceCombinationListToString";
import FormMode from "../../../../data-layer/enums/FormMode";
import SpellSchoolForm from "../../Skill/Form/SpellSchoolForm";

export default class ComplexSkillCategoryView extends React.Component {

    constructor(props) {
        super(props);

        this.state = this.formInitialState
    }

    formInitialState = {
        spellSchoolFormVisible: false,
        spellSchoolForm: null,
        spellSchoolFormMode: FormMode.CREATE
    }

    componentDidMount() {
        console.log("ComplexSkillCategoryView: spell schools:")
        console.log(this.props.spellSchools)
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
                      values={this.props.spellSchools.map(spellSchool =>
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
        console.log(form)
        this.setState({
            spellSchoolFormVisible: false
        })
    }

    onEditSpellSchoolSubmit(form) {
        console.log(form)
        this.setState({
            spellSchoolFormVisible: false
        })
    }

}