import React from "react";
import InputLabel from "../../../Common/Labels/InputLabel";
import SpellComponent from "./SpellComponent";

export default class SchoolLvlComponent extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <InputLabel text={this.props.schoolLvl.lvl + " круг:"}/>
                {this.props.schoolLvl.spells.map(spell =>
                    <SpellComponent name={spell.name}
                                    img={spell.img}
                                    description={spell.description}
                                    onSpellAdded={() => this.props.onSpellAdded(spell)}
                                    onSpellRemoved={() => this.props.onSpellRemoved(spell)}
                                    key={spell.id}
                    />
                )}
            </div>
        )
    }
}