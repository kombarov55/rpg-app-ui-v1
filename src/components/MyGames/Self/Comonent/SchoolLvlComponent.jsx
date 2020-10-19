import React from "react";
import SpellComponent from "./SpellComponent";
import FormTitleLabel from "../../../Common/Labels/FormTitleLabel";

export default class SchoolLvlComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            addedSpells: []
        }
    }

    render() {
        return (
            <div>
                <FormTitleLabel text={this.props.schoolLvl.lvl + " круг:"}/>
                {this.props.schoolLvl.spells.map(spell =>
                    <SpellComponent name={spell.name}
                                    img={spell.img}
                                    description={spell.description}
                                    isCheckButtonVisible={this.props.canSelectMore || this.isSpellAlreadyAdded(spell)}
                                    onSpellAdded={() => {
                                        this.setState(state => ({addedSpells: state.addedSpells.concat(spell)}))
                                        this.props.onSpellAdded(spell)
                                    }}
                                    onSpellRemoved={() => {
                                        this.setState(state => ({addedSpells: state.addedSpells.filter(v => v.id !== spell.id)}))
                                        this.props.onSpellRemoved(spell)
                                    }}
                                    key={spell.id}
                    />
                )}
            </div>
        )
    }

    isSpellAlreadyAdded(spell) {
        return this.state.addedSpells.some(v => v.id === spell.id)
    }
}