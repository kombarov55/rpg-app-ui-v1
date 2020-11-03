import React from "react";
import {connect} from "react-redux"
import {changeView, setCurrencies} from "../../../../data-layer/ActionCreators";
import {gameView} from "../../../../Views";
import FormViewStyle from "../../../../styles/FormViewStyle";
import Btn from "../../../Common/Buttons/Btn";
import {get, post} from "../../../../util/Http";
import {currenciesByGameIdUrl, getCharacterByIdUrl, transferUrl} from "../../../../util/Parameters";
import InputLabel from "../../../Common/Labels/InputLabel";
import FormTitleLabel from "../../../Common/Labels/FormTitleLabel";
import ListItem from "../../../Common/ListElements/ListItem";
import List from "../../../Common/Lists/List";
import ExpandableListItem from "../../../Common/ListElements/ExpandableListItem";
import TransferForm from "../../Game/Form/TransferForm";
import Popup from "../../../../util/Popup";
import TransferDestination from "../../../../data-layer/enums/TransferDestination";
import GameCharacterProcedures from "../../../../data-layer/Procedures/GameCharacterProcedures";
import LearnNewSkillComponent from "../Component/LearnNewSkillComponent";
import SkillComponent from "../Component/SkillComponent";
import LearnNewSpellComponent from "../Component/LearnNewSpellComponent";

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
                <InputLabel text={this.state.character.name}/>
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
                              gameId={this.props.gameId}
                              onSubmit={form => this.performTransfer(form)}
                />
                }

                <FormTitleLabel text={"Навыки:"}/>
                {this.state.character.learnedSkills.map(({skill, amount}) =>
                    <SkillComponent
                        skill={skill}
                        currentLvl={amount}
                        onUpgradeClicked={(upgrade, amounts) => {
                            if (amounts.every(({name, amount}) => this.isEnoughMoneyOnBalance(name, amount))) {
                                GameCharacterProcedures.upgradeSkill(this.state.character.id, skill.id, amounts, () =>
                                    get(getCharacterByIdUrl(this.props.characterId), rs => {
                                        this.setState({character: rs})
                                        Popup.success("Уровень навыка повышен.")
                                    })
                                )
                            } else {
                                Popup.error("Недостаточно средств.")
                            }
                        }}
                        key={skill.id}
                    />
                )}
                <LearnNewSkillComponent
                    gameId={this.props.gameId}
                    learnedSkills={this.state.character.learnedSkills.map(v => v.skill)}
                    onSkillPurchase={(skill, amounts) => {
                        if (!amounts.every(amount => this.isEnoughMoneyOnBalance(amount.name, amount.amount))) {
                            Popup.error("Недостаточно средств.")
                            return
                        }
                        GameCharacterProcedures.purchaseSkill(this.state.character.id, skill.id, amounts, () =>
                            get(getCharacterByIdUrl(this.props.characterId), rs => {
                                this.setState({character: rs})
                                Popup.success(`Навык ${skill.name} изучен.`)
                            })
                        )
                    }}
                />

                <FormTitleLabel text={"Заклинания:"}/>
                {this.state.character.learnedSpells.map(spell =>
                    <ExpandableListItem
                        img={spell.img}
                        name={spell.name}
                        description={spell.description}
                        expandableElements={[
                            <div>
                                <div>Школа: {spell.spellSchoolName}</div>
                                <div>Уровень: {spell.lvl}</div>
                            </div>
                        ]}
                        alwaysExpand={true}
                        key={spell.id}
                    />
                )}
                <LearnNewSpellComponent gameId={this.props.gameId}
                                        characterId={this.props.characterId}
                                        onSpellPurchase={(spell, amounts) => {
                                            if (!amounts.every(amount => this.isEnoughMoneyOnBalance(amount.name, amount.amount))) {
                                                Popup.error("Недостаточно средств.")
                                                return
                                            }

                                            GameCharacterProcedures.purchaseSpell(this.props.characterId, spell.id, amounts, ({nextLvlUnlocked}) => {
                                                get(getCharacterByIdUrl(this.props.characterId), rs => {
                                                    this.setState({character: rs})
                                                    Popup.success(`Заклинание "${spell.name}" изучено.`)
                                                    if (nextLvlUnlocked) {
                                                        Popup.success("Вы открыли следующий круг.")
                                                    }
                                                })
                                            })
                                        }}
                />


                <Btn text={"Назад"} onClick={() => this.props.back()}/>
            </div>
        )
    }

    performTransfer(form) {
        if (this.isEnoughMoneyOnBalance(form.currency, form.amount)) {
            post(transferUrl, {
                from: this.state.character.balanceId,
                to: form.destination.balanceId,
                currency: form.currency,
                amount: form.amount,
                originId: this.state.character.id,
                originType: TransferDestination.CHARACTER,
                destinationId: form.destination.id,
                destinationType: form.destinationType
            }, () => {
                get(getCharacterByIdUrl(this.props.characterId), rs => {
                    Popup.info("Перевод выполнен")
                    this.setState({
                        character: rs,
                        transferFormVisible: false
                    })
                })
            })
        } else {
            Popup.error("У вас недостаточно средств для такого перевода.")
        }
    }

    isEnoughMoneyOnBalance(currency, amount) {
        return this.state.character.balance.find(v => v.name === currency).amount >= amount
    }
})