import React from "react";
import List from "../../../Common/Lists/List";
import Label from "../../../Common/Labels/Label";
import ExpandableListItem from "../../../Common/ListElements/ExpandableListItem";
import InputLabel from "../../../Common/Labels/InputLabel";
import priceCombinationListToString from "../../../../util/priceCombinationListToString";
import LvlUpgradeView from "../../LvlUpgradeView";
import SkillForm from "../../SkillForm";
import Icon from "../../../Common/Input/Icon";

export default class BasicSkillCategoryView extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            skillFormVisible: false
        }
    }

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
                              upperButtons={[
                                  this.props.onSkillEdited && <Icon className={"pi pi-pencil"} onClick={() => this.props.onSkillEdited(skill)}/>,
                                  this.props.onSkillDeleted && <Icon className={"pi pi-times"} onClick={() => this.props.onSkillDeleted(skill)}/>
                              ]}
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
                      isAddButtonVisible={!this.state.skillFormVisible}
                      onAddClicked={() => this.toggleSkillForm()}
                />
                {this.state.skillFormVisible &&
                <SkillForm currencies={this.props.currencies}
                           onSubmit={(form) => {
                               this.toggleSkillForm()
                               this.props.onSkillAdded(form)
                           }}/>
                }
            </div>
        )
    }

    toggleSkillForm() {
        this.setState(state => ({
            skillFormVisible: !state.skillFormVisible
        }))
    }


}