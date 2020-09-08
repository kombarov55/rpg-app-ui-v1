import React from "react";
import Label from "../../../Common/Labels/Label";
import List from "../../../Common/Lists/List";
import ExpandableListItem from "../../../Common/ListElements/ExpandableListItem";
import InputLabel from "../../../Common/Labels/InputLabel";
import HorizontalListItem from "../../../Common/ListElements/HorizontalListItem";
import priceCombinationListToString from "../../../../util/priceCombinationListToString";

export default class ComplexSkillCategoryView extends React.Component {
    render() {
        return (
            <div>
                <Label text={"Сложный тип"}/>
                <List title={"Школы навыков:"}
                      noItemsText={"Нет школ навыков"}
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
                                                    <InputLabel
                                                        text={"Цена перехода на следующий уровень: " + priceCombinationListToString(schoolLvl.upgradePriceCombinations)}/>,
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
            </div>
        )
    }
}