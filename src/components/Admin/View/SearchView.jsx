import React from "react";
import {connect} from "react-redux"
import {changeView} from "../../../data-layer/ActionCreators";
import Btn from "../../Common/Buttons/Btn";
import FormViewStyle from "../../../styles/FormViewStyle";
import RemoteAutocomplete from "../../Common/Input/RemoteAutocomplete";
import {searchUserAccountByNameOrCharacterName} from "../../../util/Parameters";
import UserAccountSearchResultListItem from "../../ListItem/UserAccountSearchResultListItem";

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
                                            onEditUserGameRoleSubmit={(gameId, newRole) => this.changeUserGameRole(newRole, gameId)}
                                            onEditCharacterRoleSubmit={newRole => this.changeCharacterRole(newRole)}
                                        />}
                />

                <Btn text={"Назад"} onClick={() => this.props.back()}/>
            </div>
        )
    }

    changeUserGameRole(newRole, gameId) {
        alert(`${newRole} ${gameId}`)
    }

    changeCharacterRole(newRole) {
        alert(`${newRole}`)
    }
})