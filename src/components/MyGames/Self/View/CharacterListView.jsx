import React from "react";
import {connect} from "react-redux"
import {changeView, setCurrencies} from "../../../../data-layer/ActionCreators";
import {gameView} from "../../../../Views";
import FormViewStyle from "../../../../styles/FormViewStyle";
import Btn from "../../../Common/Buttons/Btn";
import {get} from "../../../../util/Http";
import {currenciesByGameIdUrl, getCharacterByIdUrl} from "../../../../util/Parameters";
import InputLabel from "../../../Common/Labels/InputLabel";
import FormTitleLabel from "../../../Common/Labels/FormTitleLabel";
import ListItem from "../../../Common/ListElements/ListItem";
import List from "../../../Common/Lists/List";
import ExpandableListItem from "../../../Common/ListElements/ExpandableListItem";
import TransferForm from "../../Game/Form/TransferForm";

export default connect(
    state => ({
        gameId: state.activeGame.id,
        characterId: state.userAccount.gameToActiveCharacter.find(v => v.game.id === state.activeGame.id).activeCharacter.id,
        currencies: state.currencies,
    }),
    null,
    (stateProps, dispatchProps, ownProps) => {
        const {dispatch} = dispatchProps

        return {
            ...stateProps,
            ...ownProps,
            setCurrencies: xs => dispatch(setCurrencies(xs)),
            back: () => dispatch(changeView(gameView))
        }
    }
)(class CharacterListView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            character: {
                fieldNameToValueList: [],
                balance: [],
                learnedSpells: [],
                learnedSkills: []
            },

            transferFormVisible: false
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

                <List title={"Баланс:"}
                      values={this.state.character.balance.map(amount =>
                          <ListItem text={`${amount.name}: ${amount.amount}`}
                                    key={amount.name}
                          />
                      )}
                />

                <Btn text={"Переводы"} onClick={() => {
                    get(currenciesByGameIdUrl(this.props.gameId), rs => this.props.setCurrencies(rs))
                    this.setState({transferFormVisible: true})
                }}/>
                {this.state.transferFormVisible &&
                    <TransferForm currencyNames={this.props.currencies.map(v => v.name)}
                                  onSubmit={form => console.log(form)}
                    />
                }

                <List title={"Выученные заклинания:"}
                      noItemsText={"Ничего не выучено.."}
                      isAddButtonVisible={true}
                      onAddClicked={() => {
                      }}
                      values={this.state.character.learnedSpells.map(spell =>
                          <ExpandableListItem
                              img={spell.img}
                              name={spell.name}
                              description={spell.description}
                              expandableElements={[]}
                              alwaysExpand={true}
                              key={spell.id}
                          />
                      )}
                />

                <List title={"Выученные навыки:"}
                      noItemsText={"Ничего не выучено.."}
                      isAddButtonVisible={true}
                      onAddClicked={() => {
                      }}
                      values={this.state.character.learnedSkills.map(({skill, lvl}) =>
                          <ExpandableListItem
                              img={skill.img}
                              name={skill.name}
                              description={skill.description}

                              key={skill.id}
                          />
                      )}
                />

                <Btn text={"Назад"} onClick={() => this.props.back()}/>
            </div>
        )
    }
})