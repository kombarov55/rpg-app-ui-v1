import React from "react";
import {connect} from "react-redux"
import {changeView, setCurrencies} from "../../../../data-layer/ActionCreators";
import {gameView, officeView} from "../../../../Views";
import FormViewStyle from "../../../../styles/FormViewStyle";
import Btn from "../../../Common/Buttons/Btn";
import {get, post} from "../../../../util/Http";
import {
    convertUrl,
    creditPaymentUrl,
    currenciesByGameIdUrl,
    disposeCharacterItemUrl,
    equipItemUrl,
    gameSettingsUrl,
    getCharacterByIdUrl,
    performCraftingUrl,
    transferItemUrl,
    transferUrl,
    unequipItemUrl, upgradeItemUrl
} from "../../../../util/Parameters";
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
import CharacterInventoryComponent from "../Component/CharacterInventoryComponent";
import CreditListItem from "../../../ListItem/CreditListItem";
import ConversionComponent from "../Component/ConversionComponent";
import CharacterCraftComponent from "../Component/CharacterCraftComponent";
import CharacterEquipmentComponent from "../Component/CharacterEquipmentComponent";
import CharacterFieldsComponent from "../Component/CharacterFieldsComponent";
import CharInfoComponent from "../Component/CharInfoComponent";
import CornerListItem from "../../../Common/ListElements/CornerListItem";
import SkillInfo from "../Component/SkillInfo";
import SkillStatsComponent from "../Component/SkillStatsComponent";

export default connect(
    state => ({
        gameId: state.activeGame.id,
        characterId: state.activeCharacter.id,
        currencies: state.currencies,
    }),
    null,
    (stateProps, dispatchProps, ownProps) => {
        const {dispatch} = dispatchProps

        return {
            ...stateProps,
            ...ownProps,
            setCurrencies: xs => dispatch(setCurrencies(xs)),
            toGameView: () => dispatch(changeView(gameView)),
            back: () => dispatch(changeView(officeView))
        }
    }
)(class CharacterListView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            character: {
                fieldNameToValueList: [],
                skillStats: [],
                balance: [],
                learnedSpells: [],
                learnedSkills: [],
                equippedItems: [],
                items: [],
                credits: []
            },

            gameSettings: null,

            transferFormVisible: false
        }

        get(currenciesByGameIdUrl(this.props.gameId), rs => this.props.setCurrencies(rs))
        get(gameSettingsUrl(this.props.gameId), rs => this.setState({gameSettings: rs}))
        this.refresh()
    }

    render() {
        return (
            <div style={FormViewStyle}>

                <CharInfoComponent character={this.state.character}/>
                <CharacterFieldsComponent fieldNameToValueList={this.state.character.fieldNameToValueList}/>
                <CornerListItem left={"Баллов актива"} right={this.state.character.activityPoints}/>
                <SkillStatsComponent skillStats={this.state.character.skillStats} />
                <List title={"Баланс:"}
                      values={this.state.character.balance.map(amount =>
                          <ListItem text={`${amount.name}: ${amount.amount}`}
                                    key={amount.name}
                          />
                      )}
                />

                <Btn text={"Переводы"} onClick={() => {
                    this.setState({transferFormVisible: true})
                }}/>
                {this.state.transferFormVisible &&
                <TransferForm currencyNames={this.props.currencies.map(v => v.name)}
                              gameId={this.props.gameId}
                              onSubmit={form => this.performTransfer(form)}
                />
                }

                <ConversionComponent gameId={this.props.gameId}
                                     currencies={this.props.currencies}
                                     onSubmit={form => this.onConversion(form.currency1, form.currency2, form.amount)}
                />

                <CharacterEquipmentComponent equippedItems={this.state.character.equippedItems}
                                             gameSettings={this.state.gameSettings}
                                             gameId={this.props.gameId}
                                             onUnequipItem={item => this.onUnequipItem(item)}
                />

                <CharacterInventoryComponent items={this.state.character.items}
                                             equippedItems={this.state.character.equippedItems}
                                             gameId={this.props.gameId}
                                             inventorySize={this.state.gameSettings?.inventorySize}
                                             onTransferItem={(item, destinationType, destination) => this.onTransferItem(item, destinationType, destination)}
                                             onDisposeItem={item => this.onDisposeItem(item)}
                                             onEquipItem={item => this.onEquipItem(item)}
                                             onUpgradeItem={(item, amounts) => this.onUpgradeItem(item, amounts)}
                />

                <CharacterCraftComponent gameId={this.props.gameId}
                                         items={this.state.character.items}
                                         learnedSkills={this.state.character.learnedSkills}
                                         onItemCrafted={form => this.onItemCrafted(form)}
                />

                <List title={"Навыки:"}
                      values={this.state.character.learnedSkills.map(({skill, amount}) =>
                          <SkillComponent
                              skill={skill}
                              currentLvl={amount}
                              onUpgradeClicked={(upgrade, amounts) => this.onUpgradeClicked(skill, upgrade, amounts)}
                              key={skill.id}
                          />
                      )}
                />

                <LearnNewSkillComponent gameId={this.props.gameId}
                                        learnedSkills={this.state.character.learnedSkills.map(v => v.skill)}
                                        onSkillPurchase={(skill, amounts) => this.onSkillPurchase(skill, amounts)}
                />

                <List title={"Заклинания:"}
                      values={this.state.character.learnedSpells.map(spell =>
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
                />

                <LearnNewSpellComponent gameId={this.props.gameId}
                                        characterId={this.props.characterId}
                                        isSpellLearned={spell => this.isSpellLearned(spell)}
                                        onSpellPurchase={(spell, amounts) => this.onSpellPurchase(spell, amounts)}
                />

                <List title={"Кредиты:"}
                      values={this.state.character.credits.map(credit =>
                          <CreditListItem credit={credit}
                                          onPayWholeCreditClicked={() => this.onPayWholeCreditClicked(credit)}
                                          onPartialPayClicked={amount => this.onPartialPayClicked(credit, amount)}
                                          key={credit.id}
                          />
                      )}
                />

                <Btn text={"Игра"} onClick={() => this.props.toGameView()}/>
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

    refresh(then = () => {
    }) {
        get(getCharacterByIdUrl(this.props.characterId), rs => {
            this.setState({character: rs})
            then()
        })
    }

    isEnoughMoneyOnBalance(currency, amount) {
        return this.state.character.balance.find(v => v.name === currency).amount >= amount
    }

    onTransferItem(item, destinationType, destination) {
        post(transferItemUrl, {
            itemId: item.id,
            fromType: TransferDestination.CHARACTER,
            fromId: this.state.character.id,
            toType: destinationType,
            toId: destination.id
        }, () => this.refresh(() => Popup.info("Предмет отпралвен.")))
    }

    onDisposeItem(item) {
        post(disposeCharacterItemUrl, {
            itemId: item.id,
            characterId: this.state.character.id
        }, () => this.refresh(() => Popup.info("Предмет выброшен.")))
    }

    onEquipItem(item) {
        post(equipItemUrl, {
            characterId: this.state.character.id,
            itemId: item.id
        }, () => this.refresh(() => Popup.info("Предмет одет.")))
    }

    onUpgradeItem(item, amounts) {
        post(upgradeItemUrl, {
            characterId: this.state.character.id,
            itemId: item.id,
            amounts: amounts
        }, () => this.refresh(() => Popup.success("Уровень предмета повышен.")))
    }

    onUnequipItem(item) {
        post(unequipItemUrl, {
            characterId: this.state.character.id,
            itemId: item.id
        }, () => this.refresh(() => Popup.info("Предмет снят.")))
    }

    onSpellPurchase(spell, amounts) {
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
    }

    onSkillPurchase(skill, amounts) {
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
    }

    onUpgradeClicked(skill, upgrade, amounts) {
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
    }

    onPayWholeCreditClicked(credit) {
        post(creditPaymentUrl, {
            creditId: credit.id,
            amount: credit.debtAmount
        }, () => this.refresh(() => Popup.info("Сумма внесена.")))
    }

    onPartialPayClicked(credit, amount) {
        post(creditPaymentUrl, {
            creditId: credit.id,
            amount: amount
        }, () => this.refresh(() => Popup.info("Сумма внесена.")))
    }

    isSpellLearned(spell) {
        return this.state.character.learnedSpells.some(v => v.id === spell.id)
    }

    onConversion(currency1, currency2, amount) {
        post(convertUrl, {
            currency1Id: currency1.id,
            currency2Id: currency2.id,
            amount: amount,
            characterId: this.state.character.id
        }, () => this.refresh(() => Popup.info("Обмен произведён.")))
    }

    onItemCrafted(form) {
        post(performCraftingUrl, {
            characterId: this.state.character.id,
            recipeId: form.recipe.id
        }, rs => this.refresh(() => {
            if (rs.success) {
                Popup.success("Успешно")
            } else {
                Popup.error("Не получилось скрафтить предмет ;(")
            }
        }))
    }
})