import React from "react";
import {connect} from "react-redux";
import Btn from "../../../Common/Buttons/Btn";
import InputLabel from "../../../Common/Labels/InputLabel";
import {SelectButton} from "primereact/selectbutton";
import {updateConversionForm} from "../../../../data-layer/ActionCreators";

function mapStateToProps(state, props) {
    return {
        conversionForm: state.conversionForm
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        updateConversionForm: fieldNameToValue => dispatch(updateConversionForm(fieldNameToValue))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(function (props) {
    function onCurrency1Checked(selectedCurrency) {
        if (selectedCurrency !== props.conversionForm.currency2) {
            props.updateConversionForm({currency1: selectedCurrency})
        }
    }

    function onCurrency2Checked(selectedCurrency) {
        if (selectedCurrency !== props.conversionForm.currency1) {
            props.updateConversionForm({currency2: selectedCurrency})
        }
    }

    return (
        <div className={"form-view"}>
            <div className={"input-group"}>
                <InputLabel text={"1 Валюта:"}/>
                <SelectButton
                    options={props.currencies.map(currency => ({
                        label: currency.name,
                        value: currency
                    }))}
                    value={props.conversionForm.currency1}
                    onChange={e => onCurrency1Checked(e.target.value)}
                />

                <InputLabel text={"2 Валюта:"}/>
                <SelectButton
                    options={props.currencies.map(currency => ({
                        label: currency.name,
                        value: currency
                    }))}
                    value={props.conversionForm.currency2}
                    onChange={e => onCurrency2Checked(e.target.value)}
                />

                <InputLabel text={"Обмен 1 в 2:"}/>
                <div className={"conversion-entry"}>
                    <div className={"conversion-currency-name"}>
                        1 {props.conversionForm.currency1.name} =
                    </div>
                    <input className={"conversion-input"}
                           value={props.conversionForm.conversionPrice1to2}
                           onChange={e => props.updateConversionForm({conversionPrice1to2: e.target.value})}
                    />
                    <div className={"conversion-currency-name"}>
                        {props.conversionForm.currency2.name}
                    </div>
                </div>
                <InputLabel text={"Обмен 2 в 1:"}/>
                <div className={"conversion-entry"}>
                    <div className={"conversion-currency-name"}>
                        1 {props.conversionForm.currency2.name} =
                    </div>
                    <input className={"conversion-input"}
                           value={props.conversionForm.conversionPrice2to1}
                           onChange={e => props.updateConversionForm({conversionPrice2to1: e.target.value})}
                    />
                    <div className={"conversion-currency-name"}>
                        {props.conversionForm.currency1.name}
                    </div>
                </div>
            </div>
            <Btn text={"Сохранить"} onClick={() => props.onSubmit()}/>
        </div>
    )
})