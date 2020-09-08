import React from "react";
import List from "../../../Common/Lists/List";
import Label from "../../../Common/Labels/Label";
import ExpandableListItem from "../../../Common/ListElements/ExpandableListItem";
import InputLabel from "../../../Common/Labels/InputLabel";
import priceCombinationListToString from "../../../../util/priceCombinationListToString";
import LvlUpgradeView from "../../LvlUpgradeView";

export default class BasicSkillCategoryView extends React.Component {

    render() {
        return (
            <div>
                <Label text={"Простой тип"}/>
                <List title={"Навыки:"}
                      noItemsText={"Нет навыков"}
                      values={this.props.skills.map(skill =>
                          <ExpandableListItem
                              img={skill.img}
                              name={skill.name}
                              alwaysExpand={true}
                              expandableElements={[
                                  <div>{skill.description}</div>,
                                  skill.prices &&
                                  <InputLabel text={"Цена: " + priceCombinationListToString(skill.prices)}/>,
                                  skill.upgradable && skill.upgrades.map(it => <LvlUpgradeView
                                      lvlNum={it.lvlNum}
                                      description={it.description}
                                      prices={it.prices}/>)
                              ]}
                          />
                      )}
                />
            </div>
        )
    }


}