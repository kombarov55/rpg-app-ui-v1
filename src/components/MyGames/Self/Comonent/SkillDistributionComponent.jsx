import React from "react";
import ExpandableListItemStyle from "../../../../styles/ExpandableListItemStyle";
import CheckButton from "../../../Common/Buttons/CheckButton";
import List from "../../../Common/Lists/List";
import SkillUpgradeComponent from "./SkillUpgradeComponent";

export default class SkillDistributionComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            checked: false
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
                    <List title={"Уровни навыка:"}
                          values={this.props.skill.upgrades.map(upgrade =>
                              <SkillUpgradeComponent
                                  name={upgrade.lvlNum + " уровень:"}
                                  description={upgrade.description}
                                  alwaysExpand={true}
                                  onClick={isChecked => console.log(isChecked)}
                                  isButtonVisible={true}
                              />
                          )}
                    />
                }
            </div>
        )
    }
}
