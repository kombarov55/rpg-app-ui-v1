import React from "react";
import Btn from "../../../Common/Buttons/Btn";
import CreditOfferFillingForm from "../Form/CreditOfferFillingForm";

export default class extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            formVisible: false
        }
    }

    render() {
        return (
            <div>
                {
                    !this.state.formVisible ?
                        <Btn text={"Оставить заявку на кредит"}
                             onClick={() => this.setState({formVisible: true})}
                        /> :
                        <CreditOfferFillingForm creditOffers={this.props.creditOffers}
                                                onSubmit={form => this.props.onSubmitCreditOffer(form)}
                        />
                }

            </div>
        )
    }
}