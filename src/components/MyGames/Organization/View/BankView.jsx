import React from "react";
import {connect} from "react-redux"
import FormViewStyle from "../../../../styles/FormViewStyle";
import {changeView} from "../../../../data-layer/ActionCreators";
import {organizationDetailsView} from "../../../../Views";
import Btn from "../../../Common/Buttons/Btn";
import CreditRequestComponent from "../Components/CreditRequestComponent";
import {get, post} from "../../../../util/Http";
import {findPendingCreditRequestsByOrganizationId, submitCreditRequestUrl} from "../../../../util/Parameters";
import Popup from "../../../../util/Popup";
import CreditRequestListItem from "../../../ListItem/CreditRequestListItem";
import List from "../../../Common/Lists/List";
import CreditRequestStatus from "../../../../data-layer/enums/CreditRequestStatus";

export default connect(
    state => ({
        activeOrganization: state.activeOrganization,
        characterId: state.activeCharacter.id
    }),
    null,
    (stateProps, dispatchProps, ownProps) => {
        const {dispatch} = dispatchProps

        return {
            ...stateProps,
            ...ownProps,

            back: () => dispatch(changeView(organizationDetailsView))
        }
    }
)(class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            organization: props.activeOrganization,
            creditRequests: []
        }
        get(findPendingCreditRequestsByOrganizationId(props.activeOrganization.id), rs => this.setState({creditRequests: rs}))
    }

    render() {
        return (
            <div style={FormViewStyle}>

                <CreditRequestComponent creditOffers={this.state.creditOffers}
                                        onSubmitCreditOffer={form => this.onSubmitCreditRequest(form)}
                />

                <List title={"Заявки на кредит:"}
                      values={this.state.creditRequests.map(creditRequest =>
                          <CreditRequestListItem creditRequest={creditRequest}
                                                 key={creditRequest.id}
                          />
                      )}
                />

                <Btn text={"Назад"} onClick={() => this.props.back()}/>
            </div>
        )
    }

    onSubmitCreditRequest(form) {
        post(submitCreditRequestUrl, {
            creditOfferId: form.selectedCreditOffer.id,
            amount: form.amount,
            duration: form.duration,
            purpose: form.purpose,
            organizationId: this.state.id,
            requesterId: this.props.characterId
        }, () => Popup.info("Заявка на кредит создана. Ожидайте решения мастера"))
    }
})