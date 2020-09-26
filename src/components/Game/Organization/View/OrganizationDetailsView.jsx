import React from "react";
import {connect} from "react-redux"
import FormTitleLabel from "../../../Common/Labels/FormTitleLabel";
import Btn from "../../../Common/Buttons/Btn";
import {changeView} from "../../../../data-layer/ActionCreators";
import {gameView} from "../../../../Views";
import FormViewStyle from "../../../../styles/FormViewStyle";

export default connect(
    store => ({
        organization: store.activeOrganization
    }), dispatch => ({
        back: () => dispatch(changeView(gameView))
    }))
(class OrganizationDetailsView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }


    render() {
        return (
            <div style={FormViewStyle}>
                <FormTitleLabel text={this.props.organization.name}/>
                <Btn text={"Назад"} onClick={() => this.props.back()}/>
            </div>
        )
    }
})