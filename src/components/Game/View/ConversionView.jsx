import React from "react";
import {connect} from "react-redux";
import Label from "../../Common/Label";
import NoItemsLabel from "../../Common/NoItemsLabel";
import ListItemSmall from "../../Common/ListItemSmall";

function mapStateToProps(state, props) {
    return {
        currencies: state.currencies
    }
}

function mapDispatchToProps(dispatch, props) {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(function (props) {
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
        </div>
    )
})