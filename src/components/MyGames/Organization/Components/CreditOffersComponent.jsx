import React from "react";
import List from "../../../Common/Lists/List";
import CreditOfferForm from "../Form/CreditOfferForm";
import CreditOfferListItem from "../../../ListItem/CreditOfferListItem";

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
                <List title={"Кредитные предложения:"}
                      noItemsText={"Пока нет.."}
                      isAddButtonVisible={!this.state.formVisible}
                      onAddClicked={() => this.setState({formVisible: true})}
                      values={this.props.creditOffers.map(creditOffer =>
                          <CreditOfferListItem creditOffer={creditOffer}
                                               onDeleteClicked={() => this.props.onDeleteCreditOffer(creditOffer)}
                                               key={creditOffer.id}
                          />
                      )}
                />

                {
                    this.state.formVisible &&
                    <CreditOfferForm
                        currencies={this.props.currencies}
                        onSubmit={form => {
                            this.setState({formVisible: false})
                            this.props.onSaveCreditOffer(form)
                        }}
                    />
                }
            </div>
        )
    }
}