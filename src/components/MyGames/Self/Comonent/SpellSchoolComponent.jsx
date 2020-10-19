import React from "react";
import ExpandableListItemStyle from "../../../../styles/ExpandableListItemStyle";
import SchoolLvlComponent from "./SchoolLvlComponent";
import InputLabel from "../../../Common/Labels/InputLabel";
import getOrDefault from "../../../../util/getOrDefault";
import Popup from "../../../../util/Popup";

export default class SpellSchoolComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            /**
             * [{lvl: Int, count: Int}]
             */
            lvlToLearnedSpellCount: []
        }

        this.minSpellCountToUnlockNextLevel = props.spellSchool.minSpellCountToUpgrade
    }

    render() {
        return (
            <div style={ExpandableListItemStyle.containerStyle}>
                <div style={ExpandableListItemStyle.innerHorizontalStyle}>
                    <div style={ExpandableListItemStyle.imgAndNameStyle}>
                        {
                            this.props.spellSchool.img &&
                            <img style={ExpandableListItemStyle.imgStyle} src={this.props.spellSchool.img}/>
                        }
                        <div style={ExpandableListItemStyle.nameStyle}>{this.props.spellSchool.name}</div>
                    </div>
                </div>
                <div>{this.props.spellSchool.description}</div>
                <InputLabel text={"Выберите " + this.props.spellSchool.minSpellCountToUpgrade + " заклинаний чтобы открыть следующий уровень"}/>
                {this.props.spellSchool.schoolLvls.filter(v => this.isSchoolLvlVisible(v)).map(schoolLvl =>
                    <SchoolLvlComponent schoolLvl={schoolLvl}
                                        onSpellAdded={spell => {
                                            this.props.onSpellAdded(spell)
                                            this.incLvlToLearnedSpellCount(schoolLvl.lvl)
                                            this.spellAmountInfoPopup(schoolLvl.lvl)
                                        }}
                                        onSpellRemoved={spell => {
                                            this.props.onSpellRemoved(spell)
                                            this.decLvlToLearnedSpellCount(schoolLvl.lvl)
                                            this.spellAmountInfoPopup(schoolLvl.lvl)
                                        }}
                                        key={schoolLvl.id}
                    />
                )}
            </div>
        )
    }

    isSchoolLvlVisible(schoolLvl) {
        const lvl = schoolLvl.lvl
        const prevLvl = this.props.spellSchool.schoolLvls.find(v => v.lvl === lvl - 1)

        if (prevLvl == null) {
            return true
        }

        return this.enoughSpellsLearned(prevLvl)
    }


    enoughSpellsLearned(schoolLvl) {
        const lvl = schoolLvl.lvl
        const learnedSpellsOnThatLevel = this.getCountOfLearnedSpellsOnLvl(lvl)

        let minLearnedSpellsCount = this.minSpellCountToUnlockNextLevel
        const isEnough = learnedSpellsOnThatLevel >= minLearnedSpellsCount

        return isEnough;
    }

    incLvlToLearnedSpellCount(lvl) {
        const savedEntity = this.state.lvlToLearnedSpellCount.find(v => v.lvl === lvl)
        if (savedEntity == null) {
            this.setState(state => ({
                lvlToLearnedSpellCount: state.lvlToLearnedSpellCount.concat({lvl: lvl, count: 1})
            }))
        } else {
            this.setState(state => ({
                lvlToLearnedSpellCount: state.lvlToLearnedSpellCount
                    .filter(v => v !== savedEntity)
                    .concat({lvl: lvl, count: savedEntity.count + 1})
            }))
        }
    }

    decLvlToLearnedSpellCount(lvl) {
        const savedEntity = this.state.lvlToLearnedSpellCount.find(v => v.lvl === lvl)
        if (savedEntity == null) {
            this.setState(state => ({
                lvlToLearnedSpellCount: state.lvlToLearnedSpellCount.concat({lvl: lvl, count: 1})
            }))
        } else {
            this.setState(state => ({
                lvlToLearnedSpellCount: state.lvlToLearnedSpellCount
                    .filter(v => v !== savedEntity)
                    .concat({lvl: lvl, count: savedEntity.count - 1})
            }))
        }
    }

    getCountOfLearnedSpellsOnLvl(lvl) {
        return getOrDefault(this.state.lvlToLearnedSpellCount.find(v => v.lvl === lvl), {count: 0}).count
    }

    spellAmountInfoPopup(lvl) {
        const learnedSpellCount = this.getCountOfLearnedSpellsOnLvl(lvl) + 1

        if (learnedSpellCount < this.minSpellCountToUnlockNextLevel) {
            const diff = this.minSpellCountToUnlockNextLevel - learnedSpellCount
            Popup.info("Изучите ещё " + diff + " заклинаний чтобы открыть следующий круг.")
        } else {
            const nextLvlExists = this.props.spellSchool.schoolLvls.some(v => v.lvl === lvl + 1)
            if (learnedSpellCount === this.minSpellCountToUnlockNextLevel && nextLvlExists) {
                Popup.success("Вы открыли " + (lvl + 1) + " круг!")
            }
        }
    }
}