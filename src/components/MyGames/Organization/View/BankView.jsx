import React from "react";
import {connect} from "react-redux"
import FormViewStyle from "../../../../styles/FormViewStyle";
import {changeView} from "../../../../data-layer/ActionCreators";
import {organizationDetailsView} from "../../../../Views";
import Btn from "../../../Common/Buttons/Btn";
import CreditRequestComponent from "../Components/CreditRequestComponent";
import {get, httpDelete, post} from "../../../../util/Http";
import {
    addCreditOfferUrl,
    approveCreditRequest,
    findPendingCreditRequestsByOrganizationId,
    rejectCreditRequest,
    removeCreditOfferUrl,
    submitCreditRequestUrl
} from "../../../../util/Parameters";
import Popup from "../../../../util/Popup";
import CreditRequestListItem from "../../../ListItem/CreditRequestListItem";
import List from "../../../Common/Lists/List";
import CreditOffersComponent from "../Components/CreditOffersComponent";

export default connect(
    state => ({
        activeOrganization: state.activeOrganization,
        currencies: state.activeGame.currencies,
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
            creditOffers: props.activeOrganization.creditOffers,
            creditRequests: []
        }
        this.refresh()
    }

    render() {
        return (
            <div style={FormViewStyle}>

                <CreditRequestComponent creditOffers={this.state.creditOffers}
                                        onSubmitCreditOffer={form => this.onSubmitCreditRequest(form)}
                />

                <CreditOffersComponent creditOffers={this.state.creditOffers}
                                       currencies={this.props.currencies}
                                       onSaveCreditOffer={form => this.onSaveCreditOffer(form)}
                                       onDeleteCreditOffer={creditOffer => this.onDeleteCreditOffer(creditOffer)}
                />

                <List title={"Заявки на кредит:"}
                      values={this.state.creditRequests.map(creditRequest =>
                          <CreditRequestListItem creditRequest={creditRequest}
                                                 onApprove={(() => this.onApprove(creditRequest))}
                                                 onReject={() => this.onReject(creditRequest)}
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
            organizationId: this.props.activeOrganization.id,
            requesterId: this.props.characterId
        }, () => {
            this.refresh(() => Popup.info("Заявка на кредит создана. Ожидайте решения мастера"))
        })
    }

    onApprove(creditRequest) {
        post(approveCreditRequest, {
            creditRequestId: creditRequest.id
        }, () => this.refresh(() => this.refresh(() => Popup.info("Вы одобрили заявку на кредит."))))
    }

    onReject(creditRequest) {
        post(rejectCreditRequest, {
            creditRequestId: creditRequest.id
        }, () => this.refresh(() => Popup.info("Вы отклонили заявку на кредит.")))
    }

    onSaveCreditOffer(form) {
        post(addCreditOfferUrl(this.props.activeOrganization.id), form, rs => {
            this.setState(state => ({creditOffers: state.creditOffers.concat(rs)}))
            Popup.info("Кредитное предложение добавлено.")
            this.setState({creditOfferVisible: false})
        })
    }

    onDeleteCreditOffer(creditOffer) {
        console.log(creditOffer)

        httpDelete(removeCreditOfferUrl(creditOffer.id), rs => {
            console.log(rs)

            this.setState(state => ({creditOffers: state.creditOffers.filter(v => v.id !== rs.id)}))
            Popup.info("Кредитное предложение удалено.")
            this.setState({creditOfferVisible: false})
        })
    }

    refresh(then = () => {}) {
        get(findPendingCreditRequestsByOrganizationId(this.props.activeOrganization.id), rs => {
            this.setState({creditRequests: rs})
            then()
        })
    }
})