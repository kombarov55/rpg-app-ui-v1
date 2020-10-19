import React from "react";
import ExpandableListItemStyle from "../../../../styles/ExpandableListItemStyle";
import SchoolLvlComponent from "./SchoolLvlComponent";
import InputLabel from "../../../Common/Labels/InputLabel";

export default class SpellSchoolComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visibleSchoolLvls: [this.props.spellSchool.schoolLvls[0]],
            learnedSpells: []
        }

        this.minSpellCountToUnlockNextLevel = this.props.spellSchool.minSpellCountToUpgrade
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
                <InputLabel
                    text={"Необходимо " + this.props.spellSchool.minSpellCountToUpgrade + " заклинаний для открытия следующего круга."}/>

                {this.state.visibleSchoolLvls.map(schoolLvl =>
                    <SchoolLvlComponent schoolLvl={schoolLvl}
                                        canSelectMore={this.props.canSelectMore}
                                        minSpellCountToUnlockNextLvl={schoolLvl.minSpellCountToUpgrade}
                                        onNextLvlUnlocked={() => this.makeThisAndPreviousLevelsVisible(schoolLvl.lvl + 1)}
                                        onNextLvlLocked={() => {
                                            this.makeThisAndPreviousLevelsVisible(schoolLvl.lvl)
                                        }}
                                        onSpellAdded={spell => {
                                            this.addSpell(spell)
                                            this.props.onSpellAdded(spell)
                                        }}
                                        onSpellRemoved={spell => {
                                            this.removeSpell(spell)
                                            this.props.onSpellRemoved(spell)
                                        }}
                                        key={schoolLvl.id}
                    />
                )}
            </div>
        )
    }

    makeThisAndPreviousLevelsVisible(lvl) {
        if (lvl === 0) return

        const isVisible = this.state.visibleSchoolLvls.some(v => v.lvl === lvl)
        if (!isVisible) {
            this.setState(state => ({
                visibleSchoolLvls: state.visibleSchoolLvls.concat(this.getSchoolLvl(lvl))
            }))
        }

        this.makeThisAndPreviousLevelsVisible(lvl - 1)
    }

    addSpell(spell) {
        this.setState(state => ({learnedSpells: state.learnedSpells.concat(spell)}))
    }

    removeSpell(spell) {
        this.setState(state => ({learnedSpells: state.learnedSpells.filter(v => v.id !== spell.id)}))
    }


    getSchoolLvl(lvl) {
        return this.props.spellSchool.schoolLvls.find(v => v.lvl === lvl)
    }


}