import React from "react";
import FormTitleLabel from "../../../Common/Labels/FormTitleLabel";
import {connect} from "react-redux"
import {changeView} from "../../../../data-layer/ActionCreators";
import {spellSchoolView} from "../../../../Views";
import Btn from "../../../Common/Buttons/Btn";
import FormViewStyle from "../../../../styles/FormViewStyle";
import List from "../../../Common/Lists/List";
import ExpandableListItemWithBullets from "../../../Common/ListElements/ExpandableListItemWithBullets";
import ListItem from "../../../Common/ListElements/ListItem";
import priceCombinationListToString from "../../../../util/priceCombinationListToString";
import FormMode from "../../../../data-layer/enums/FormMode";
import SpellForm from "../Form/SpellForm";
import Popup from "../../../../util/Popup";
import {post, put} from "../../../../util/Http";
import {addSpellUrl, editSpellUrl} from "../../../../util/Parameters";
import SpellPurchaseForm from "../Form/SpellPurchaseForm";

export default connect(
    state => ({
        schoolLvl: state.activeSchoolLvl,
        currencyNames: state.activeGame.currencies.map(v => v.name)
    }),
    null,
    (stateProps, dispatchProps, ownProps) => {
        const {dispatch} = dispatchProps

        return {
            ...stateProps,
            ...ownProps,

            back: () => dispatch(changeView(spellSchoolView))
        }
    }
)(class SchoolLvlView extends React.Component {

    constructor(props) {
        super(props);
        this.state = Object.assign({}, props.schoolLvl, {
            spellFormVisible: false,
            spellForm: null,
            spellFormMode: FormMode.CREATE,

            spellPurchaseFormVisible: false,
            spellPurchaseForm: null,
            spellPurchaseFormMode: FormMode.CREATE
        })
    }


    render() {
        return (
            <div style={FormViewStyle}>
                <FormTitleLabel text={this.state.lvl + " Уровень:"}/>

                <List title={"Заклинания:"}
                      noItemsText={"Пока нет.."}
                      isAddButtonVisible={!this.state.spellFormVisible}
                      onAddClicked={() => this.setState({
                          spellFormVisible: true,
                          spellFormMode: FormMode.CREATE
                      })}
                      values={this.state.spells.map(spell =>
                          <ExpandableListItemWithBullets
                              img={spell.img}
                              name={spell.name}
                              description={spell.description}

                              onEditClicked={() => this.setState({
                                  spellFormVisible: true,
                                  spellForm: spell,
                                  spellFormMode: FormMode.EDIT
                              })}

                              alwaysExpand={true}
                              key={spell.id}
                          />
                      )}
                />
                {
                    this.state.spellFormVisible &&
                    (this.state.spellFormMode == FormMode.CREATE ?
                            <SpellForm
                                onSubmit={form => this.onAddSpellFormSubmit(form)}
                            /> :
                            <SpellForm
                                initialState={this.state.spellForm}
                                onSubmit={form => this.onEditSpellFormSubmit(form)}
                            />
                    )
                }

                <List title={"Стоимость заклинаний:"}
                      noItemsText={"Пока нет.."}
                      isAddButtonVisible={!this.state.spellPurchaseFormVisible}
                      onAddClicked={() => this.setState({
                          spellPurchaseFormVisible: true,
                          spellPurchaseFormMode: FormMode.CREATE
                      })}
                      values={this.state.upgradePriceCombinations.map(upgradePriceCombination =>
                          <ListItem
                              text={upgradePriceCombination.spellCount + " заклинаний изучено: " + priceCombinationListToString(upgradePriceCombination.priceCombinations)}
                              onEdit={() => this.setState({
                                  spellPurchaseFormVisible: true,
                                  spellPurchaseFormMode: FormMode.EDIT,
                                  spellPurchaseForm: upgradePriceCombination
                              })}

                              key={upgradePriceCombination.id}
                          />
                      )}
                />

                {
                    this.state.spellPurchaseFormVisible &&
                    (
                        this.state.spellPurchaseFormMode == FormMode.CREATE ?
                            <SpellPurchaseForm
                                spellCount={this.state.upgradePriceCombinations.length + 1}
                                currencyNames={this.props.currencyNames}
                                onSubmit={form => this.onAddSpellPurchaseSubmit(form)}
                            /> :
                            <SpellPurchaseForm
                                initialState={this.state.spellPurchaseForm}
                                currencyNames={this.props.currencyNames}
                                onSubmit={form => this.onEditSpellPurchaseSubmit(form)}
                            />

                    )
                }

                <Btn text={"Назад"} onClick={() => this.props.back()}/>
            </div>
        )
    }

    onAddSpellFormSubmit(form) {
        post(addSpellUrl(this.state.id), form, rs => {
            this.setState(state => ({
                spellFormVisible: false,
                spells: state.spells.concat(rs)
            }))
            Popup.info("Заклинание сохранено.")
        })

    }

    onEditSpellFormSubmit(form) {
        put(editSpellUrl(form.id), form, rs => {
            this.setState(state => ({
                spellFormVisible: false,
                spells: state.spells.filter(v => v.id !== rs.id).concat(rs)
            }))
            Popup.info("Заклинание обновлено.")
        })
    }

    onAddSpellPurchaseSubmit(form) {
        console.log(form)
        this.setState(state => ({
            spellPurchaseFormVisible: false,
            upgradePriceCombinations: state.upgradePriceCombinations.concat(form)
        }))
        Popup.info("Стоимость заклинания добавлена.")
    }

    onEditSpellPurchaseSubmit(form) {
        console.log(form)
        this.setState(state => ({
            spellPurchaseFormVisible: false,
            upgradePriceCombinations: state.upgradePriceCombinations.filter(v => v.id !== form.id).concat(form)
        }))
        Popup.info("Стоимость заклинания обновлена.")
    }
})