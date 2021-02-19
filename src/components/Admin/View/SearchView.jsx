import React from "react";
import {connect} from "react-redux"
import {changeView} from "../../../data-layer/ActionCreators";
import Btn from "../../Common/Buttons/Btn";
import FormViewStyle from "../../../styles/FormViewStyle";
import RemoteAutocomplete from "../../Common/Input/RemoteAutocomplete";
import {
    changeCharacterRoleUrl,
    changeUserAccountGameRoleUrl,
    changeUserAccountRoleUrl,
    searchUserAccountByNameOrCharacterName
} from "../../../util/Parameters";
import UserAccountSearchResultListItem from "../../ListItem/UserAccountSearchResultListItem";
import {post} from "../../../util/Http";
import Popup from "../../../util/Popup";

export default connect(
    state => ({}),
    null,
    (stateProps, dispatchProps, ownProps) => {
        const {dispatch} = dispatchProps

        return {
            ...stateProps,
            ...ownProps,

            back: () => dispatch(changeView())
        }
    }
)(class extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={FormViewStyle}>
                <RemoteAutocomplete buildSyncUrl={name => searchUserAccountByNameOrCharacterName(name)}
                                    fieldToDisplay={"firstName"}
                                    onSelected={some => console.log(some)}
                                    itemRenderer={item =>
                                        <UserAccountSearchResultListItem
                                            userAccountDto={item}
                                            onEditUserAccountRoleSubmit={(userAccountId, newRole) => this.changeUserRole(userAccountId, newRole)}
                                            onEditUserGameRoleSubmit={(userAccountId, gameId, newRole) => this.changeUserGameRole(userAccountId, gameId, newRole)}
                                            onEditCharacterRoleSubmit={(characterId, newRole) => this.changeCharacterRole(characterId, newRole)}
                                        />}
                />

                <Btn text={"Назад"} onClick={() => this.props.back()}/>
            </div>
        )
    }

    changeUserRole(userAccountId, newRole) {
        post(changeUserAccountRoleUrl, {userAccountId: userAccountId, newRole: newRole}, () => Popup.success("Роль была изменена."))
    }

    changeUserGameRole(userAccountId, gameId, newRole) {
        post(changeUserAccountGameRoleUrl, {userAccountId: userAccountId, gameId: gameId, newRole: newRole}, () => Popup.success("Роль была изменена."))
    }

    changeCharacterRole(characterId, newRole) {
        post(changeCharacterRoleUrl, {characterId: characterId, newRole: newRole}, () => Popup.success("Роль была изменена."))
    }
})