import React from "react";
import Btn from "../../../Common/Buttons/Btn";
import TransferForm from "../../../MyGames/Game/Form/TransferForm";
import FormViewStyle from "../../../../styles/FormViewStyle";

/**
 * props: {
 *     currencyNames: [name: String]
 *     gameId: String
 * }
 */
export default class TransferComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            formVisible: false
        }
    }

    render() {
        return (
            <div style={FormViewStyle}>
                {
                    !this.state.formVisible ?
                        <Btn text={"Сделать перевод"} onClick={() => this.setState({formVisible: true})}/> :
                        <TransferForm
                            currencyNames={this.props.currencyNames}
                            gameId={this.props.gameId}
                            onSubmit={form => {
                                this.props.onSubmit(form)
                                this.setState({formVisible: false})
                            }}
                        />
                }
            </div>
        )
    }
}