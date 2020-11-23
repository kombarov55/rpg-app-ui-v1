import React from "react";
import InputLabel from "../../../Common/Labels/InputLabel";

/**
 * props: {
 *     currency1: CurrencyDto
 *     currency2: CurrencyDto
 *     conversions: List<ConversionDto>
 *
 * }
 */
export default class extends React.Component {

    render() {
        return (
            (this.props.currency1 != null && this.props.currency2 != null) &&
            (
                this.getConversionPrice() != null ?
                    <div>
                        <InputLabel text={"Курс обмена: "}/>
                        <InputLabel text={`1 ${this.props.currency1.name} = ${this.getConversionPrice().conversionPrice1to2} ${this.props.currency2.name}`}/>
                        <InputLabel text={`1 ${this.props.currency2.name} = ${this.getConversionPrice().conversionPrice2to1} ${this.props.currency1.name}`}/>
                    </div> :
                    <InputLabel text={"Обмен для данных валют не поддерживается."}/>
            )
        )
    }

    getConversionPrice() {
        const currency1 = this.props.currency1
        const currency2 = this.props.currency2

        return this.props.conversions.find(v =>
            (v.currency1.toLowerCase() === currency1.name.toLowerCase() && v.currency2.toLowerCase() === currency2.name.toLowerCase()) ||
            (v.currency1.toLowerCase() === currency2.name.toLowerCase() && v.currency2.toLowerCase() === currency1.name.toLowerCase())
        )
    }
}