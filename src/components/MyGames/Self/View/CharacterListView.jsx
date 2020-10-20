import React from "react";
import {connect} from "react-redux"
import {changeView} from "../../../../data-layer/ActionCreators";
import {gameView} from "../../../../Views";
import FormViewStyle from "../../../../styles/FormViewStyle";
import Btn from "../../../Common/Buttons/Btn";
import {get} from "../../../../util/Http";
import {getCharacterByIdUrl} from "../../../../util/Parameters";
import InputLabel from "../../../Common/Labels/InputLabel";
import FormTitleLabel from "../../../Common/Labels/FormTitleLabel";
import ListItem from "../../../Common/ListElements/ListItem";
import List from "../../../Common/Lists/List";

export default connect(
    state => ({
        characterId: state.userAccount.gameIdToActiveCharacterId[state.activeGame.id]
    }),
    null,
    (stateProps, dispatchProps, ownProps) => {
        const {dispatch} = dispatchProps

        return {
            ...stateProps,
            ...ownProps,

            back: () => dispatch(changeView(gameView))
        }
    }
)(class CharacterListView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            character: {
                fieldNameToValueList: [],
                balance: []
            }
        }

        console.log({id: this.props.characterId})

        get(getCharacterByIdUrl(this.props.characterId), rs => this.setState({character: rs}))
    }

    render() {
        return (
            <div style={FormViewStyle}>
                <FormTitleLabel text={"Персонаж:"}/>
                <div>{Object.entries(this.state.character.fieldNameToValueList).map(([name, value]) =>
                    <div>
                        <InputLabel text={name + ":"}/>
                        <div>{value}</div>
                    </div>
                )}</div>

                <FormTitleLabel text={"Баланс:"}/>
                <List values={this.state.character.balance.map(amount =>
                    <ListItem text={`${amount.name}: ${amount.amount}`}
                        key={amount.name}
                    />
                )}/>

                <Btn text={"Назад"} onClick={() => this.props.back()}/>
            </div>
        )
    }
})