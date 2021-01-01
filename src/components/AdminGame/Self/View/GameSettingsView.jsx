import React from "react";
import FormViewStyle from "../../../../styles/FormViewStyle";
import Btn from "../../../Common/Buttons/Btn";
import {connect} from "react-redux"
import {changeView, setActiveGame} from "../../../../data-layer/ActionCreators";
import {adminGameView} from "../../../../Views";
import InputLabel from "../../../Common/Labels/InputLabel";
import {InputTextarea} from "primereact/inputtextarea";
import {patch} from "../../../../util/Http";
import {patchSettingsUrl} from "../../../../util/Parameters";
import {InputSwitch} from "primereact/inputswitch";
import Popup from "../../../../util/Popup";
import Validation from "../../../../util/Validation";
import MaxEquippedAmountsComponent from "../Component/MaxEquippedAmountsComponent";

export default connect(
    state => ({
        game: state.activeGame,
        gameId: state.activeGame.id,
        settings: state.activeGame.settings
    }),
    null,
    (stateProps, dispatchProps, ownProps) => {
        const {dispatch} = dispatchProps

        return {
            ...stateProps,
            ...ownProps,
            setActiveGame: x => dispatch(setActiveGame(x)),
            back: () => dispatch(changeView(adminGameView))
        }
    }
)(class GameSettingsView extends React.Component {

    constructor(props) {
        super(props);

        this.state = props.settings
    }

    render() {
        return (
            <div style={FormViewStyle}>
                <InputLabel text={"Правила: (появляются при заполнении анкеты)"}/>
                <InputTextarea autoResize={true}
                               value={this.state.disclaimerText}
                               onChange={e => this.setState({disclaimerText: e.target.value})}
                />

                <InputLabel text={"Размер инвентаря:"}/>
                <input value={this.state.inventorySize}
                       onChange={e => this.setState({inventorySize: e.target.value})}
                />

                <InputLabel text={"Можно ли загружать аватар персонажа вручную?"}/>
                <InputSwitch checked={this.state.charImgUploadable}
                             onChange={e => this.setState({charImgUploadable: e.value})}
                />

                <MaxEquippedAmountsComponent
                    gameId={this.props.gameId}
                    maxEquippedAmounts={this.state.maxEquippedAmounts}
                    onDeleted={maxEquippedAmount => this.setState(state => ({
                        maxEquippedAmounts: state.maxEquippedAmounts.filter(v => v.id !== maxEquippedAmount.id)
                    }))}
                    onEdited={maxEquippedAmount => this.setState(state => ({
                        maxEquippedAmounts: state.maxEquippedAmounts.filter(v => v.id !== maxEquippedAmount.id).concat(maxEquippedAmount)
                    }))}
                    onAdded={maxEquippedAmount => this.setState(state => ({
                        maxEquippedAmounts: state.maxEquippedAmounts.concat(maxEquippedAmount)
                    }))}
                />

                <InputLabel text={"Максимальное количество питомцев:"}/>
                <input value={this.state.maxOwnedPetsCount}
                       onChange={e => this.setState({maxOwnedPetsCount: e.target.value})}
                />

                <Btn text={"Сохранить изменения"} onClick={() => {
                    const success = Validation.run(
                        Validation.between(this.state.inventorySize, 0, Number.MAX_SAFE_INTEGER, "Размер инвентаря"),
                        Validation.between(this.state.maxOwnedPetsCount, 0, Number.MAX_SAFE_INTEGER, "Максимальное количество питомцев")
                    )

                    if (success) {
                        patch(patchSettingsUrl(this.props.gameId), this.state, rs => {
                            this.setState(rs)
                            Popup.info("Изменения сохранены.")
                        })
                    }
                }}/>
                <Btn text={"Назад"} onClick={() => this.props.back()}/>
            </div>
        )
    }
})