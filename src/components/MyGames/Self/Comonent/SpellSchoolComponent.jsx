import React from "react";
import ExpandableListItemStyle from "../../../../styles/ExpandableListItemStyle";
import SchoolLvlComponent from "./SchoolLvlComponent";

export default class SpellSchoolComponent extends React.Component {

    constructor(props) {
        super(props);

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
                {this.props.spellSchool.schoolLvls.map(schoolLvl =>
                    <SchoolLvlComponent schoolLvl={schoolLvl}
                                        onSpellAdded={spell => this.props.onSpellAdded(spell)}
                                        onSpellRemoved={spell => this.props.onSpellRemoved(spell)}
                                        key={schoolLvl.id}
                    />
                )}
            </div>
        )
    }
}