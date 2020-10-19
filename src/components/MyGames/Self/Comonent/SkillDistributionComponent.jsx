import React from "react";
import ExpandableListItemStyle from "../../../../styles/ExpandableListItemStyle";
import CheckButton from "../../../Common/Buttons/CheckButton";
import SkillUpgradeComponent from "./SkillUpgradeComponent";
import InputLabel from "../../../Common/Labels/InputLabel";
import ExpandableListItemWithBullets from "../../../Common/ListElements/ExpandableListItemWithBullets";

export default class SkillDistributionComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            checked: false,

            selectedUpgrades: []
        }
    }

    render() {
        return (
            <div style={ExpandableListItemStyle.containerStyle}>
                <div style={ExpandableListItemStyle.innerHorizontalStyle}>
                    <div style={ExpandableListItemStyle.imgAndNameStyle}>
                        {
                            this.props.skill.img &&
                            <img style={ExpandableListItemStyle.imgStyle} src={this.props.skill.img}/>
                        }
                        <div style={ExpandableListItemStyle.nameStyle}>{this.props.skill.name}</div>
                    </div>
                </div>
                {this.props.skill.description}
                <CheckButton uncheckedText={"Выбрать"}
                             checkedText={"Выбрано"}
                             onClick={isChecked => {
                                 this.setState({checked: isChecked})
                                 if (isChecked) {
                                     this.props.onSelected()
                                 } else {
                                     this.props.onSelectRemoved()
                                 }
                             }}
                />
                {this.state.checked && this.props.skill.upgradable &&
                <div>
                    <InputLabel text={"Уровни навыка:"}/>
                    <ExpandableListItemWithBullets
                        name={this.props.skill.upgrades[0].lvlNum + " уровень:"}
                        description={this.props.skill.upgrades[0].description}
                        bullets={["Навык по умолчанию."]}
                        alwaysExpand={true}
                    />
                    {this.props.skill.upgrades.slice(1).map(upgrade =>
                        <SkillUpgradeComponent
                            name={upgrade.lvlNum + " уровень:"}
                            description={upgrade.description}
                            alwaysExpand={true}
                            onClick={isChecked => {
                                if (isChecked) {
                                    this.props.onUpgradeCountChanged(this.state.selectedUpgrades.length + 1)
                                    this.onUpgradeAdded(upgrade)
                                } else {
                                    this.props.onUpgradeCountChanged(this.state.selectedUpgrades.filter(storedUpgrade => storedUpgrade.lvlNum < upgrade.lvlNum).length)
                                    this.onUpgradeRemoved(upgrade)
                                }


                            }}
                            isButtonVisible={this.isUpgradeComponentButtonVisible(upgrade)}
                        />
                    )}
                </div>
                }
            </div>
        )
    }

    onUpgradeAdded(upgrade) {
        this.setState(state => ({
            selectedUpgrades: state.selectedUpgrades.concat(upgrade)
        }))
    }

    onUpgradeRemoved(upgrade) {
        this.setState(state => ({
            selectedUpgrades: state.selectedUpgrades.filter(storedUpgrade => storedUpgrade.lvlNum < upgrade.lvlNum)
        }))
    }

    isUpgradeComponentButtonVisible(upgrade) {
        const maxLvlOfSelectedUpgrades = this.state.selectedUpgrades.length !== 0 ?
            Math.max(...this.state.selectedUpgrades.map(v => v.lvlNum)) :
            0

        console.log({maxLvlOfSelectedUpgrades: maxLvlOfSelectedUpgrades, lvlNum: upgrade.lvlNum})

        return upgrade.lvlNum <= maxLvlOfSelectedUpgrades + 1
    }
}
