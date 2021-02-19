import React from "react";
import ExpandableListItem from "../Common/ListElements/ExpandableListItem";
import List from "../Common/Lists/List";
import UserAccountGameRoleListItem from "./UserAccountGameRoleListItem";
import CharacterRoleListItem from "./CharacterRoleListItem";
import FormTitleLabel from "../Common/Labels/FormTitleLabel";
import SubmitButton from "../Common/Buttons/SubmitButton";
import {SelectButton} from "primereact/selectbutton";
import Roles from "../../data-layer/enums/Roles";

export default class extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            form: <></>
        }
    }

    render() {
        const {userAccountDto, onEditUserGameRoleSubmit, onEditCharacterRoleSubmit} = this.props
        const {id, photo50Url, firstName, lastName, role, rolesInGames, characters} = userAccountDto

        return (
            <>
                <ExpandableListItem img={photo50Url}
                                    name={`${firstName} ${lastName}`}
                                    description={role}
                                    expandableElements={[
                                        <>
                                            <List title={"Роли в играх"}
                                                  values={rolesInGames.map(userAccountGameRole =>
                                                      <UserAccountGameRoleListItem
                                                          title={userAccountGameRole.title}
                                                          role={userAccountGameRole.role}
                                                          key={userAccountGameRole.gameId}
                                                          onEditClicked={() => this.setState({
                                                              form: <UserAccountGameRoleForm
                                                                  prevRole={userAccountGameRole.role}
                                                                  onSubmit={role => {
                                                                      onEditUserGameRoleSubmit(id, userAccountGameRole.gameId, role)
                                                                      this.setState({form: <></>})
                                                                  }}
                                                              />
                                                          })}

                                                      />
                                                  )}
                                            />
                                            <List title={"Персонажи"}
                                                  values={characters.map(character =>
                                                      <CharacterRoleListItem
                                                          key={character.id}
                                                          characterDto={character}
                                                          onEditClicked={() => this.setState({
                                                              form: <CharacterRoleForm
                                                                  prevRole={character.role}
                                                                  onSubmit={role => {
                                                                      onEditCharacterRoleSubmit(character.id, role)
                                                                      this.setState({form: <></>})
                                                                  }}
                                                              />
                                                          })}
                                                      />)}
                                            />

                                            {this.state.form}
                                        </>
                                    ]}
                />
            </>
        )
    }
}

class UserAccountGameRoleForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            role: Roles.findByLabel(props.prevRole)
        }
    }

    render() {
        return (
            <>
                <FormTitleLabel text={"Изменение роли в игре"}/>
                <SelectButton options={Roles.values()}
                              value={this.state.role}
                              onChange={e => this.setState({role: e.target.value})}
                />
                <SubmitButton onClick={() => this.props.onSubmit(this.state.role)}
                              text={"Сохранить"}
                />
            </>
        )
    }
}

class CharacterRoleForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            role: Roles.findByLabel(props.prevRole)
        }
    }

    render() {
        return (
            <>
                <FormTitleLabel text={"Изменение роли персонажа"}/>
                <SelectButton options={Roles.values()}
                              value={this.state.role}
                              onChange={e => this.setState({role: e.target.value})}
                />
                <SubmitButton onClick={() => this.props.onSubmit(this.state.role)}
                              text={"Сохранить"}
                />
            </>
        )
    }
}