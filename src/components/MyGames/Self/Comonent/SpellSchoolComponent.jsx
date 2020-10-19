import React from "react";
import ExpandableListItemStyle from "../../../../styles/ExpandableListItemStyle";
import SchoolLvlComponent from "./SchoolLvlComponent";
import NameImgDescription from "../../../Common/Constructions/NameImgDescription";

export default class SpellSchoolComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={ExpandableListItemStyle.containerStyle}>
                <NameImgDescription name={this.props.spellSchool.name}
                                    img={this.props.spellSchool.img}
                                    description={this.props.spellSchool.description}
                />
                {this.props.spellSchool.schoolLvls.length > 0 && [this.props.spellSchool.schoolLvls[0]].map(schoolLvl =>
                    <SchoolLvlComponent schoolLvl={schoolLvl}
                                        canSelectMore={this.props.canSelectMore}
                                        onSpellAdded={spell => this.props.onSpellAdded(spell)}
                                        onSpellRemoved={spell => this.props.onSpellRemoved(spell)}
                                        key={schoolLvl.id}
                    />
                )}
            </div>
        )
    }
}