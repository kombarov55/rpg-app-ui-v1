import React from "react";
import ExpandableListItemStyle from "../../../../styles/ExpandableListItemStyle";
import CheckButton from "../../../Common/Buttons/CheckButton";
import SkillUpgradeComponent from "./SkillUpgradeComponent";
import InputLabel from "../../../Common/Labels/InputLabel";

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
                             onClick={isChecked => this.setState({checked: isChecked})}
                />
                {this.state.checked && this.props.skill.upgradable &&
                <div>
                    <InputLabel text={"Уровни навыка:"}/>
                    {this.props.skill.upgrades.map(upgrade =>
                        <SkillUpgradeComponent
                            name={upgrade.lvlNum + " уровень:"}
                            description={upgrade.description}
                            alwaysExpand={true}
                            onClick={isChecked => {
                                if (isChecked) {
                                    this.onUpgradeAdded(upgrade)
                                } else {
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
            -1
        console.log("maxLvlOfSelectedUpgrades:" + maxLvlOfSelectedUpgrades + ", upgrade.lvlNum: " + upgrade.lvlNum)

        return upgrade.lvlNum <= maxLvlOfSelectedUpgrades + 1
    }
}
