import React from "react";
import List from "../../../Common/Lists/List";
import ListItem from "../../../Common/ListElements/ListItem";
import RemoteAutocomplete from "../../../Common/Input/RemoteAutocomplete";
import {findCharacterByNameUrl} from "../../../../util/Parameters";
import Btn from "../../../Common/Buttons/Btn";

export default class OrganizationHeadsComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            addHeadVisible: false,
            newHead: null
        }
    }

    render() {
        return (
            <div>
                <List title={"Главы организации:"}
                      isAddButtonVisible={!this.state.addHeadVisible}
                      onAddClicked={() => this.setState({addHeadVisible: true})}
                      values={this.props.heads.map(character =>
                          <ListItem text={character.name}
                                    onDelete={() => this.props.onRemoveHead(character)}
                                    key={character.id}
                          />
                      )}
                />
                {
                    this.state.addHeadVisible &&
                    <div>
                        <RemoteAutocomplete fieldToDisplay={"name"}
                                            buildSyncUrl={input => findCharacterByNameUrl(this.props.gameId, input)}
                                            onSelected={character => this.setState({newHead: character})}
                        />
                        <Btn text={"Добавить"}
                             onClick={() => {
                                 this.props.onAddHead(this.state.newHead)
                                 this.setState({
                                     addHeadVisible: false,
                                     newHead: null
                                 })
                             }}
                        />
                    </div>

                }
            </div>
        )
    }
}