import React from "react";
import InputLabel from "../../../Common/Labels/InputLabel";
import List from "../../../Common/Lists/List";
import SkillUpgradeComponent from "./SkillUpgradeComponent";
import SkillAlreadyUpgradedComponent from "./SkillAlreadyUpgradedComponent";
import NotAvailableSkillUpgradeComponent from "./NotAvailableSkillUpgradeComponent";
import Btn from "../../../Common/Buttons/Btn";
import ExpandableListItem from "../../../Common/ListElements/ExpandableListItem";

export default class SkillComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            upgradeListVisible: false
        }
    }

    render() {
        return (
            <div>
                <ExpandableListItem
                    img={this.props.skill.img}
                    name={this.props.skill.name}
                    description={this.props.skill.description}
                    expandableElements={[
                        <div>
                            <InputLabel text={`Текущий уровень: ${this.props.currentLvl}`}/>
                            {this.props.skill.upgradable && (
                                !this.state.upgradeListVisible ?
                                    <Btn text={"Прокачать навык"}
                                         onClick={() => this.setState({upgradeListVisible: true})}
                                    /> :
                                    <div>
                                        <List title={"Уровни навыка:"}
                                              noItemsText={"Пусто.."}
                                              values={this.props.skill.upgrades.map(skillUpgrade =>
                                                  this.getSkillUpgradeComponent(this.props.skill, skillUpgrade, this.props.currentLvl)
                                              )}
                                        />
                                        <Btn text={"Скрыть список прокачки"}
                                             onClick={() => this.setState({upgradeListVisible: false})}
                                        />
                                    </div>
                            )}
                        </div>
                    ]}

                    alwaysExpand={true}
                    key={this.props.skill.id}
                />
            </div>
        )
    }

    getSkillUpgradeComponent(skill, skillUpgrade, learnedLvl) {
        if (skillUpgrade.lvlNum <= learnedLvl) {
            return <SkillAlreadyUpgradedComponent skillUpgrade={skillUpgrade}
                                                  key={skillUpgrade.id}
            />
        }

        if (skillUpgrade.lvlNum === learnedLvl + 1) {
            return <SkillUpgradeComponent skillUpgrade={skillUpgrade}
                                          key={skillUpgrade.id}
                                          onUpgradeClicked={amounts => this.props.onUpgradeClicked(skillUpgrade, amounts)}

            />
        } else {
            return <NotAvailableSkillUpgradeComponent skillUpgrade={skillUpgrade}
                                                      key={skillUpgrade.id}
            />
        }
    }
}