import React, {useState} from "react";
import {connect} from "react-redux";
import Label from "../../../Common/Labels/Label";
import NoItemsLabel from "../../../Common/Labels/NoItemsLabel";
import ListItemSmall from "../../../Common/ListElements/SmallListItem";
import AddItemButton from "../../../Common/Buttons/AddItemButton";
import ConversionForm from "../Form/ConversionForm";
import {changeView, setConversions, updateConversionForm} from "../../../../data-layer/ActionCreators";
import DefaultFormValues from "../../../../data-layer/DefaultFormValues";
import Btn from "../../../Common/Buttons/Btn";
import {gameView} from "../../../../Views";
import {post} from "../../../../util/Http";
import {conversionsByGameIdUrl} from "../../../../util/Parameters";

function mapStateToProps(state, props) {
    return {
        activeGame: state.activeGame,
        currencies: state.currencies,
        conversions: state.conversions,
        conversionForm: state.conversionForm
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        setConversions: conversions => dispatch(setConversions(conversions)),
        updateConversionForm: fieldNameToValue => dispatch(updateConversionForm(fieldNameToValue)),
        changeView: view => dispatch(changeView(view))
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
                                left={"1 " + conversion.currency1 + " = " + conversion.conversionPrice1to2 + " " + conversion.currency2}
                                right={"1 " + conversion.currency2 + " = " + conversion.conversionPrice2to1 + " " + conversion.currency1}
                            />
                        )
                }
            </div>
            {
                formVisible &&
                <ConversionForm currencies={props.currencies}
                                onSubmit={() => {
                                    setFormVisible(false)
                                    post(conversionsByGameIdUrl(props.activeGame.id), props.conversionForm, rs => props.setConversions(props.conversions.concat(rs)))
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
            <Btn text={"Назад"} onClick={() => props.changeView(gameView)}/>
        </div>
    )
})