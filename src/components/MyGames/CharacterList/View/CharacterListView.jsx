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
import NameImgDescription from "../../../Common/Constructions/NameImgDescription";
import SkillAlreadyUpgradedComponent from "../Component/SkillAlreadyUpgradedComponent";
import SkillUpgradeComponent from "../Component/SkillUpgradeComponent";
import NotAvailableSkillUpgradeComponent from "../Component/NotAvailableSkillUpgradeComponent";
import GameCharacterProcedures from "../../../../data-layer/Procedures/GameCharacterProcedures";
import LearnNewSkillComponent from "../Component/LearnNewSkillComponent";

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
                    <div>
                        <NameImgDescription img={skill.img}
                                            name={skill.name}
                                            description={skill.description}

                                            key={skill.id}
                        />
                        <InputLabel text={`Текущий уровень: ${amount}`}/>
                        {skill.upgradable &&
                        <List title={"Уровни навыка:"}
                              noItemsText={"Пусто.."}
                              values={skill.upgrades.map(skillUpgrade =>
                                  this.getSkillUpgradeComponent(skill, skillUpgrade, amount)
                              )}
                        />
                        }
                    </div>
                )}
                <LearnNewSkillComponent
                    gameId={this.props.gameId}
                    learnedSkills={this.state.character.learnedSkills.map(v => v.skill)}
                    onSkillPurchase={(skill, amounts) => GameCharacterProcedures.purchaseSkill(this.state.character.id, skill.id, amounts, () =>
                        get(getCharacterByIdUrl(this.props.characterId), rs => {
                            this.setState({character: rs})
                            Popup.success("Навык изучен.")
                        })
                    )}
                />

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

    getSkillUpgradeComponent(skill, skillUpgrade, learnedLvl) {
        if (skillUpgrade.lvlNum <= learnedLvl) {
            return <SkillAlreadyUpgradedComponent skillUpgrade={skillUpgrade}
                                                  key={skillUpgrade.id}
            />
        }

        if (skillUpgrade.lvlNum === learnedLvl + 1) {
            return <SkillUpgradeComponent skillUpgrade={skillUpgrade}
                                          key={skillUpgrade.id}
                                          onUpgradeClicked={amounts => {
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

            />
        } else {
            return <NotAvailableSkillUpgradeComponent skillUpgrade={skillUpgrade}
                                                      key={skillUpgrade.id}
            />
        }
    }
})