import React from "react";
import ViewInfo from "../../Common/Constructions/ViewInfo";
import {get} from "../../../util/Http";
import {connect} from "react-redux"
import {userAccountUrl} from "../../../util/Parameters";
import Btn from "../../Common/Buttons/Btn";
import {changeView} from "../../../data-layer/ActionCreators";
import {adminPageView} from "../../../Views";
import FormViewStyle from "../../../styles/FormViewStyle";

export default connect(
    state => ({
        userId: state.activeUserAccount.vkUserId
    }),
    null,
    (stateProps, dispatchProps, ownProps) => {
        const {dispatch} = dispatchProps

        return {
            ...stateProps,
            ...ownProps,
            back: () => dispatch(changeView(adminPageView))
        }
    }
)(class UserAccountDetailsView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userAccount: {}
        }

        get(userAccountUrl(this.props.userId), rs => this.setState({userAccount: rs}))
    }

    render() {
        return (
            <div style={FormViewStyle}>
                <ViewInfo name={this.state.userAccount.firstName + " " + this.state.userAccount.lastName}
                          img={this.state.userAccount.photo50Url}/>

                <Btn text={"Назад"} onClick={() => this.props.back()}/>
            </div>
        )
    }
})