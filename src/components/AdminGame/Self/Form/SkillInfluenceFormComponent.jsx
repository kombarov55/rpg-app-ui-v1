import React, {useState} from "react";
import List from "../../../Common/Lists/List";
import SkillInfluenceToString from "../../../../util/SkillInfluenceToString";
import ListItem from "../../../Common/ListElements/ListItem";
import RemoteAutocomplete from "../../../Common/Input/RemoteAutocomplete";
import {findSkillByNameUrl} from "../../../../util/Parameters";
import {SelectButton} from "primereact/selectbutton";
import ArithmeticModifiers from "../../../../data-layer/enums/ArithmeticModifiers";
import InputLabel from "../../../Common/Labels/InputLabel";
import Btn from "../../../Common/Buttons/Btn";
import Validation from "../../../../util/Validation";

export default function ({gameId, skillInfluences, onAddSkillInfluence, onDeleteSkillInfluence}) {
    const [formVisible, setFormVisible] = useState(false)

    return (
        <>
            <List title={"Влияние на навыки:"}
                  isAddButtonVisible={!formVisible}
                  onAddClicked={() => setFormVisible(true)}
                  values={skillInfluences.map(skillInfluence =>
                      <ListItem text={SkillInfluenceToString(skillInfluence)}
                                onDelete={() => onDeleteSkillInfluence(skillInfluence)}
                      />
                  )}
            />

            {
                formVisible &&
                <SkillInfluenceForm gameId={gameId}
                                    filteredSkills={skillInfluences.map(v => v.skill)}
                                    onSubmit={form => {
                                        onAddSkillInfluence(form)
                                        setFormVisible(false)
                                    }}
                />

            }

        </>
    )
}

class SkillInfluenceForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            skill: null,
            modifier: null,
            amount: null
        }
    }

    render() {
        const {gameId, onSubmit, filteredSkills} = this.props

        return (
            <>
                {
                    this.state.skill != null ?
                        <ListItem text={this.state.skill.name}
                                  onDelete={() => this.setState({skill: null})}
                        /> :
                        <RemoteAutocomplete buildSyncUrl={input => findSkillByNameUrl(gameId, input)}
                                            filteredValues={filteredSkills}
                                            onSelected={skill => this.setState({skill: skill})}
                        />
                }

                <SelectButton options={ArithmeticModifiers.values.map(v => ({label: v.name, value: v}))}
                              value={this.state.modifier}
                              onChange={e => this.setState({modifier: e.target.value})}
                />

                <InputLabel text={"Количество:"}/>
                <input value={this.state.amount}
                       onChange={e => this.setState({amount: e.target.value})}
                />

                <Btn text={"Добавить"}
                     onClick={() => {
                         const success = Validation.run(
                             Validation.nonNull(this.state.skill, "Навык"),
                             Validation.nonNull(this.state.modifier, "Модификатор"),
                             Validation.between(this.state.amount, 0, Number.MAX_SAFE_INTEGER, "Количество")
                         )

                         if (success) {
                             onSubmit(this.state)
                         }
                     }}
                />
            </>
        )
    }

}