import React from "react";
import FormTitleLabel from "../../../Common/Labels/FormTitleLabel";
import SubmitButton from "../../../Common/Buttons/SubmitButton";
import InputLabel from "../../../Common/Labels/InputLabel";
import IconSelect from "../../../Common/Input/IconSelect";
import SkillIcons from "../../../../data-layer/enums/SkillIcons";
import FileUpload from "../../../Common/Input/FileUpload";
import {InputTextarea} from "primereact/inputtextarea";
import RemoteAutocomplete from "../../../Common/Input/RemoteAutocomplete";
import {findSpellByName} from "../../../../util/Parameters";
import List from "../../../Common/Lists/List";
import ExpandableListItem from "../../../Common/ListElements/ExpandableListItem";
import Validation from "../../../../util/Validation";

export default class extends React.Component {

    constructor(props) {
        super(props);

        this.state = props.initialState == null ?
            this.initialState :
            props.initialState
    }

    initialState = {
        name: "",
        img: "",
        description: "",
        requiredSpells: [],

        spellSelectionVisible: false
    }

    render() {
        return (
            <div>
                <FormTitleLabel text={"Заклинание:"}/>

                <InputLabel text={"Название:"}/>
                <input value={this.state.name}
                       onChange={e => this.setState({name: e.target.value})}
                />

                <InputLabel text={"Картинка:"}/>
                <IconSelect imgList={SkillIcons.values()}
                            onSelected={img => this.setState({img: img})}
                />

                <InputLabel text={"Или загрузите:"}/>
                <FileUpload onSubmit={img => this.setState({img: img})}/>

                <InputLabel text={"Описание:"}/>
                <InputTextarea autoResize={true}
                               value={this.state.description}
                               onChange={e => this.setState({description: e.target.value})}
                />

                <List title={"Необходимые для изучения заклинания:"}
                      values={this.state.requiredSpells.map(spell =>
                          <ExpandableListItem img={spell.img}
                                              name={spell.name}
                                              description={spell.description}
                                              onDeleteClicked={() => this.setState(state => ({requiredSpells: state.requiredSpells.filter(v => v.id !== spell.id)}))}

                                              alwaysExpand={true}
                                              key={spell.id}
                          />
                      )}
                      isAddButtonVisible={!this.state.spellSelectionVisible}
                      onAddClicked={() => this.setState({spellSelectionVisible: true})}
                />

                {
                    this.state.spellSelectionVisible &&
                    <RemoteAutocomplete fieldToDisplay={"name"}
                                        buildSyncUrl={input => findSpellByName(this.props.spellSchoolId, input)}
                                        onSelected={spell => this.setState(state => ({
                                            requiredSpells: state.requiredSpells.concat(spell),
                                            spellSelectionVisible: false
                                        }))}
                    />
                }

                <SubmitButton text={"Сохранить"}
                              onClick={() => {
                                  const success = Validation.run(
                                      Validation.nonNull(this.state.name, "Название"),
                                      Validation.nonNull(this.state.img, "Картинка"),
                                      Validation.nonNull(this.state.description, "Описание")
                                  )

                                  if (success) {
                                      this.props.onSubmit(this.state)
                                  }
                              }}
                />
            </div>
        )
    }
}