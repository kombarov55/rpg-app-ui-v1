import React from "react";
import FormMode from "../../../../data-layer/enums/FormMode";
import InputLabel from "../../../Common/Labels/InputLabel";
import Btn from "../../../Common/Buttons/Btn";
import CountryTaxForm from "../Form/CountryTaxForm";
import {httpDelete, post} from "../../../../util/Http";
import {addCreditOfferUrl, removeCreditOfferUrl} from "../../../../util/Parameters";
import Popup from "../../../../util/Popup";
import Label from "../../../Common/Labels/Label";

export default class extends React.Component {

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
                <Label text={"Налоги:"}/>
                <InputLabel text={"Подоходный налог граждан:"}/>
                {`${this.props.organization.incomeTax}%`}

                {
                    this.state.taxFormVisible ?
                        <CountryTaxForm currencies={this.props.currencies.map(v => v.name)}
                                        onSubmit={form => {
                                            this.setState({taxFormVisible: false})
                                            this.props.onChangeTaxInfo(form)
                                        }}
                        /> :
                        <Btn text={"Редактировать информацию о налогах"}
                             onClick={() => this.setState({taxFormVisible: true})}
                        />
                }

                <Btn text={"Банк"} onClick={() => this.props.toBankView()}/>

            </div>
        )
    }
}