import React from "react";
import List from "../../../Common/Lists/List";
import Label from "../../../Common/Labels/Label";
import ExpandableListItem from "../../../Common/ListElements/ExpandableListItem";
import InputLabel from "../../../Common/Labels/InputLabel";
import priceCombinationListToString from "../../../../util/priceCombinationListToString";
import LvlUpgradeView from "../../LvlUpgradeView";
import SkillForm from "../../SkillForm";
import Icon from "../../../Common/Input/Icon";
import FormMode from "../../../../data-layer/enums/FormMode";
import ExpandableListItemWithBullets from "../../../Common/ListElements/ExpandableListItemWithBullets";
import SkillUpgradeForm from "../../SkillUpgradeForm";
import SkillUpgradeEditForm from "../../Skill/Form/SkillUpgradeEditForm";
import {httpDelete, post, put} from "../../../../util/Http";
import {deleteSkillUpgradeUrl, updateSkillUpgradeUrl} from "../../../../util/Parameters";
import Popup from "../../../../util/Popup";
import IsLastElement from "../../../../util/IsLastElement";

export default class BasicSkillCategoryView extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            skillFormVisible: false,
            skillFormMode: FormMode.CREATE,
            skillForm: {},

            skillId: null,
            skillUpgradeFormVisible: false,
            skillUpgradeForm: null
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
                                  this.props.onSkillEdited && <Icon className={"pi pi-pencil"} onClick={() => this.onEditSkillClicked(skill)}/>,
                                  this.props.onSkillDeleted && <Icon className={"pi pi-times"} onClick={() => this.props.onSkillDeleted(skill)}/>
                              ]}
                              alwaysExpand={true}
                              expandableElements={[
                                  <div>{skill.description}</div>,
                                  skill.prices &&
                                  <InputLabel text={"Цена: " + priceCombinationListToString(skill.prices)}/>,
                                  skill.upgradable &&
                                      <List title={"Повышения:"}
                                            values={skill.upgrades.map(skillUpgrade =>
                                                <ExpandableListItemWithBullets
                                                    name={"Уровень: " + skillUpgrade.lvlNum}
                                                    description={skillUpgrade.description}
                                                    onEditClicked={() => this.setState({
                                                        skillUpgradeFormVisible: true,
                                                        skillUpgradeForm: skillUpgrade,
                                                        skillId: skill.id
                                                    })}
                                                    onDeleteClicked={() => this.onSkillUpgradeDeleted(skill.id, skillUpgrade.id)}
                                                    isDeleteVisible={IsLastElement(skillUpgrade, skill.upgrades)}
                                                    bullets={skillUpgrade.prices.map(listOfAmount =>
                                                        listOfAmount.map(amount => amount.name + ": " + amount.amount).join(" + ")
                                                    )}

                                                    alwaysExpand={true}
                                                    key={skillUpgrade.id}
                                                />
                                            )}
                                      />
                              ]}
                          />
                      )}
                      isAddButtonVisible={!this.state.skillFormVisible}
                      onAddClicked={() => this.toggleSkillForm()}
                />
                {
                    this.state.skillUpgradeFormVisible &&
                        <SkillUpgradeEditForm
                            currencyNames={this.props.currencies.map(v => v.name)}
                            initialState={this.state.skillUpgradeForm}
                            onSubmit={form => this.onEditSkillUpgradeSubmit(form)}
                        />
                }

                {this.state.skillFormVisible &&
                <SkillForm currencies={this.props.currencies}
                           initialState={this.state.skillForm}
                           onSubmit={form => this.onSkillSubmitted(form)}/>
                }
            </div>
        )
    }

    onAddSkillClicked() {
        this.toggleSkillForm()
        this.setState({
            skillFormMode: FormMode.CREATE,
            skillForm: {}
        })
    }

    onEditSkillClicked(skill) {
        this.toggleSkillForm()
        this.setState({
            skillFormMode: FormMode.EDIT,
            skillForm: skill
        })
    }

    onSkillSubmitted(form) {
        this.toggleSkillForm()
        console.log("basicSkillCategory#onSkillSubmitted: ")
        console.log({
            skillFormMode: this.state.skillFormMode,
            form: form
        })

        switch (this.state.skillFormMode) {
            case FormMode.CREATE:
                this.props.onSkillAdded(form)
                break;
            case FormMode.EDIT:
                this.props.onSkillEdited(form)
                break;
        }
    }

    toggleSkillForm() {
        this.setState(state => ({
            skillFormVisible: !state.skillFormVisible
        }))
    }

    onSkillUpgradeDeleted(skillId, skillUpgradeId) {
        httpDelete(deleteSkillUpgradeUrl(skillId, skillUpgradeId), rs => {
            this.props.updateSkill(rs)
            Popup.info("Повышение навыка удалено.")
        })
    }

    onEditSkillUpgradeSubmit(form) {
        put(updateSkillUpgradeUrl(this.props.gameId, this.state.skillId, form.id), form, rs => {
            this.props.updateSkill(rs)
            Popup.info("Информация о повышении уровня изменена.")
            this.setState({
                skillUpgradeFormVisible: false
            })
        })

    }
}