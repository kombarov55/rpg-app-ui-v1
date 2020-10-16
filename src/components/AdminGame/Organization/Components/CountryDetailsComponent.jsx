import React from "react";
import FormMode from "../../../../data-layer/enums/FormMode";
import InputLabel from "../../../Common/Labels/InputLabel";
import Btn from "../../../Common/Buttons/Btn";
import CountryTaxForm from "../Form/CountryTaxForm";
import {httpDelete, post, put} from "../../../../util/Http";
import {addCreditOfferUrl, organizationByGameIdAndIdUrl, removeCreditOfferUrl} from "../../../../util/Parameters";
import Popup from "../../../../util/Popup";
import List from "../../../Common/Lists/List";
import ExpandableListItemWithBullets from "../../../Common/ListElements/ExpandableListItemWithBullets";
import CreditOfferForm from "../Form/CreditOfferForm";
import Label from "../../../Common/Labels/Label";

export default class CountryDetailsComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = this.formInitialState
    }

    formInitialState = {
        addShopVisible: false,
        shopForm: null,
        shopFormMode: FormMode.CREATE,

        taxFormVisible: false,

        creditOfferVisible: false
    }

    render() {
        return (
            <div>
                <Label text={"Налоги:"}/>
                <InputLabel text={"Налог на вход/выход из игры:"}/>
                {
                    this.props.organization.entranceTax.length != 0 ?
                        this.props.organization.entranceTax.map(v => v.name + ": " + v.amount).join(" + ") :
                        "Не указан"
                }

                <InputLabel text={"Подоходный налог граждан:"}/>
                {this.props.organization.incomeTax + "%"}

                {
                    this.state.taxFormVisible ?
                        <CountryTaxForm currencies={this.props.currencies.map(v => v.name)}
                                        onSubmit={form => this.onCountryTaxFormSubmit(form)}
                        /> :
                        <Btn text={"Редактировать информацию о налогах"}
                             onClick={() => this.setState({taxFormVisible: true})}
                        />
                }

                <List title={"Кредитные предложения:"}
                      noItemsText={"Пока нет.."}
                      isAddButtonVisible={!this.state.creditOfferVisible}
                      onAddClicked={() => this.setState({creditOfferVisible: true})}
                      values={this.props.organization.creditOffers.map(creditOffer =>
                          <ExpandableListItemWithBullets
                              name={creditOffer.name}
                              description={creditOffer.description}
                              bullets={[
                                  "Ставка: " + creditOffer.rate + "%",
                                  "Макс. длительность: " + creditOffer.maxDurationInDays + " дней",
                                  "Валюта: " + creditOffer.currency.name,
                                  "Мин. сумма кредитования: " + creditOffer.minAmount,
                                  "Макс. сумма кредитования: " + creditOffer.maxAmount
                              ]}

                              onDeleteClicked={() => this.onDeleteCreditOfferClicked(creditOffer)}

                              alwaysExpand={true}
                              key={creditOffer.id}
                          />
                      )}
                />

                {
                    this.state.creditOfferVisible &&
                    <CreditOfferForm
                        currencies={this.props.currencies}
                        onSubmit={form => this.onCreditOfferSubmit(form)}
                    />
                }

            </div>
        )
    }

    onCountryTaxFormSubmit(form) {
        const body = Object.assign({}, this.props.organization, {
            incomeTax: form.incomeTax,
            entranceTax: form.entranceTax
        })

        put(organizationByGameIdAndIdUrl(this.props.gameId, this.props.organization.id), body, rs => {
            this.props.setOrganization(rs)
            Popup.info("Информация о налогах обновлена.")
            this.setState({taxFormVisible: false})
        })
    }

    onCreditOfferSubmit(form) {
        post(addCreditOfferUrl(this.props.organization.id), form, rs => {
            this.props.setOrganization(rs)
            Popup.info("Кредитное предложение добавлено.")
            this.setState({creditOfferVisible: false})
        })
    }

    onDeleteCreditOfferClicked(creditOffer) {
        httpDelete(removeCreditOfferUrl(this.props.organization.id, creditOffer.id), rs => {
            this.props.setOrganization(rs)
            Popup.info("Кредитное предложение удалено.")
            this.setState({creditOfferVisible: false})
        })
    }


}