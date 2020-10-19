import React from "react";
import ExpandableListItemStyle from "../../../../styles/ExpandableListItemStyle";
import SchoolLvlComponent from "./SchoolLvlComponent";
import InputLabel from "../../../Common/Labels/InputLabel";
import getOrDefault from "../../../../util/getOrDefault";

export default class SpellSchoolComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            /**
             * [{lvl: Int, count: Int}]
             */
            lvlToLearnedSpellCount: []
        }
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
                                        }}
                                        onSpellRemoved={spell => {
                                            this.props.onSpellRemoved(spell)
                                            this.decLvlToLearnedSpellCount(schoolLvl.lvl)
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
        const learnedSpellsOnThatLevel = getOrDefault(this.state.lvlToLearnedSpellCount.find(v => v.lvl === lvl), {count: 0}).count

        return learnedSpellsOnThatLevel >= this.props.spellSchool.minSpellCountToUpgrade;
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
}