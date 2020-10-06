import React from "react";
import {connect} from "react-redux";
import InputLabel from "../../../Common/Labels/InputLabel";
import {updateCurrencyForm} from "../../../../data-layer/ActionCreators";
import Btn from "../../../Common/Buttons/Btn";

function mapStateToProps(state, props) {
    return {
        currencyForm: state.currencyForm
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        updateCurrencyForm: fieldNameToValue => dispatch(updateCurrencyForm(fieldNameToValue))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(function (props) {
    return (
        <div className={"currency-form"}>
            <div className={"input-group"}>
                <InputLabel text={"Название:"}/>
                <input
                    value={props.currencyForm.name}
                    onChange={e => props.updateCurrencyForm({name: e.target.value})}
                />

                <InputLabel text={"Цена в баллах актива:"}/>
                <input
                    value={props.currencyForm.priceInActivityPoints}
                    onChange={e => props.updateCurrencyForm({priceInActivityPoints: e.target.value})}
                />
            </div>

            <Btn text={"Сохранить"}
                 onClick={() => props.onSubmit()}
            />
        </div>
    )
})