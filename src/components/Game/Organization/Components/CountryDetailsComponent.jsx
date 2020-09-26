import React from "react";
import FormMode from "../../../../data-layer/enums/FormMode";
import InputLabel from "../../../Common/Labels/InputLabel";
import priceCombinationToString from "../../../../util/priceCombinationToString";
import Btn from "../../../Common/Buttons/Btn";
import CountryTaxForm from "../Form/CountryTaxForm";
import {put} from "../../../../util/Http";
import {organizationByGameIdAndIdUrl} from "../../../../util/Parameters";
import Popup from "../../../../util/Popup";

export default class CountryDetailsComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = this.formInitialState
    }

    formInitialState = {
        addShopVisible: false,
        shopForm: null,
        shopFormMode: FormMode.CREATE,

        taxFormVisible: false
    }

    render() {
        return (
            <div>
                <InputLabel text={"Налог на вход/выход из игры:"}/>
                {
                    this.props.organization.entranceTax != null ?
                        this.props.organization.entranceTax.map(v => v.name + ": " + v.amount).join(" + ") :
                        "Не указан"
                }

                <InputLabel text={"Подоходный налог граждан:"}/>
                {
                    this.props.organization.incomeTax != null ?
                        this.props.organization.incomeTax + "%" :
                        "Не указан"
                }

                {
                    this.state.taxFormVisible ?
                        <CountryTaxForm currencies={this.props.currencies.map(v => v.name)}
                                        onSubmit={form => this.onCountryTaxFormSubmit(form)}
                        /> :
                        <Btn text={"Редактировать"}
                             onClick={() => this.setState({taxFormVisible: true})}
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


}