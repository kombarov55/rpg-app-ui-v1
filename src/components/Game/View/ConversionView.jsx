import React, {useState} from "react";
import {connect} from "react-redux";
import Label from "../../Common/Label";
import NoItemsLabel from "../../Common/NoItemsLabel";
import ListItemSmall from "../../Common/ListItemSmall";
import AddItemButton from "../../Common/AddItemButton";
import ConversionForm from "../ConversionForm";
import {setConversions, updateConversionForm} from "../../../data-layer/ActionCreators";
import DefaultFormValues from "../../../data-layer/DefaultFormValues";

function mapStateToProps(state, props) {
    return {
        currencies: state.currencies,
        conversions: state.conversions,
        conversionForm: state.conversionForm
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        setConversions: conversions => dispatch(setConversions(conversions)),
        updateConversionForm: fieldNameToValue => dispatch(updateConversionForm(fieldNameToValue))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(function (props) {
    const [formVisible, setFormVisible] = useState(false)

    return (
        <div className={"conversion-view"}>
            <Label text={"Валюты:"}/>
            <div className={"list"}>
                {props.currencies.length === 0 ?
                    <NoItemsLabel text={"Нет валют"}/> :
                    props.currencies.map(currency =>
                        <ListItemSmall left={currency.name} right={currency.priceInActivityPoints}/>
                    )
                }

            </div>
            <Label text={"Варианты обмена:"}/>
            <div className={"list"}>
                {
                    props.conversions.length === 0 ?
                        <NoItemsLabel text={"Нет вариантов обмена"}/> :
                        props.conversions.map(conversion =>
                            <ListItemSmall
                                left={"1 " + conversion.currency1.name + " = " + conversion.conversionPrice1to2 + " " + conversion.currency2.name}
                                right={"1 " + conversion.currency2.name + " = " + conversion.conversionPrice2to1 + " " + conversion.currency1.name}
                            />
                        )
                }
            </div>

            {
                formVisible &&
                <ConversionForm currencies={props.currencies}
                                onSubmit={() => {
                                    setFormVisible(false)
                                    props.setConversions(props.conversions.concat(props.conversionForm))
                                    props.updateConversionForm(DefaultFormValues.conversionForm)
                                }}
                />
            }

            {
                !formVisible &&
                <AddItemButton text={"Добавить вариант обмена"}
                               onClick={() => {
                                   setFormVisible(true)
                               }}
                />
            }


        </div>
    )
})