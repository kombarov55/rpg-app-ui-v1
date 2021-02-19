import React, {useState} from "react";
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
        const {photo50Url, firstName, lastName, role, rolesInGames, characters} = userAccountDto

        return (
            <>
                <ExpandableListItem img={photo50Url}
                                    name={`${firstName} ${lastName}`}
                                    description={role}
                                    expandableElements={[
                                        <>
                                            <List title={"Роли в играх"}
                                                  values={rolesInGames.map(v =>
                                                      <UserAccountGameRoleListItem
                                                          title={v.title}
                                                          role={v.role}
                                                          key={v.gameId}
                                                          onEditClicked={() => this.setState({
                                                              form: <UserAccountGameRoleForm
                                                                  prevRole={v.role}
                                                                  onSubmit={role => {
                                                                      onEditUserGameRoleSubmit(v.gameId, role)
                                                                      this.setState({form: <></>})
                                                                  }}
                                                              />
                                                          })}

                                                      />
                                                  )}
                                            />
                                            <List title={"Персонажи"}
                                                  values={characters.map(v =>
                                                      <CharacterRoleListItem
                                                          characterDto={v}
                                                          onEditClicked={() => this.setState({
                                                              form: <CharacterRoleForm
                                                                  prevRole={v.role}
                                                                  onSubmit={role => {
                                                                      onEditCharacterRoleSubmit(role)
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