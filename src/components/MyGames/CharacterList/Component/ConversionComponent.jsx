import React from "react";
import Btn from "../../../Common/Buttons/Btn";
import CharacterBalanceConversionForm from "../Form/CharacterBalanceConversionForm";
import {conversionsByGameIdUrl} from "../../../../util/Parameters";
import {get} from "../../../../util/Http";

/**
 * props {
 *     gameId: String
 *     currencies: List<CurrencyDto>
 *     onSubmit: form => {}
 * }
 */
export default class extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            formVisible: false,
            conversions: []
        }

        get(conversionsByGameIdUrl(this.props.gameId), rs => this.setState({conversions: rs}))
    }

    render() {
        return (
            !this.state.formVisible ?
                <Btn text={"Обмен валют"}
                     onClick={() => this.setState({formVisible: true})}
                /> :
                <CharacterBalanceConversionForm gameId={this.props.gameId}
                                                currencies={this.props.currencies}
                                                conversions={this.state.conversions}
                                                onSubmit={form => {
                                                    this.setState({formVisible: false})
                                                    this.props.onSubmit(form)
                                                }}
                />
        )
    }
}