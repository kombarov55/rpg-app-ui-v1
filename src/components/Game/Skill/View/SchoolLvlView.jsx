import React from "react";
import FormTitleLabel from "../../../Common/Labels/FormTitleLabel";
import {connect} from "react-redux"
import {changeView} from "../../../../data-layer/ActionCreators";
import {spellSchoolView} from "../../../../Views";
import Btn from "../../../Common/Buttons/Btn";
import FormViewStyle from "../../../../styles/FormViewStyle";
import List from "../../../Common/Lists/List";
import Stubs from "../../../../stubs/Stubs";
import ExpandableListItemWithBullets from "../../../Common/ListElements/ExpandableListItemWithBullets";
import ListItem from "../../../Common/ListElements/ListItem";
import priceCombinationListToString from "../../../../util/priceCombinationListToString";
import FormMode from "../../../../data-layer/enums/FormMode";
import SpellForm from "../Form/SpellForm";
import Popup from "../../../../util/Popup";

export default connect(
    state => ({
        schoolLvl: state.activeSchoolLvl
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
                      values={Stubs.schoolLvlList[0].spells.map(spell =>
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
                      values={Stubs.schoolLvlList[0].upgradePriceCombinations.map(upgradePriceCombination =>
                          <ListItem
                              text={upgradePriceCombination.spellCount + " заклинаний: " + priceCombinationListToString(upgradePriceCombination.priceCombinations)}

                              key={upgradePriceCombination.id}
                          />
                      )}
                />

                <Btn text={"Назад"} onClick={() => this.props.back()}/>
            </div>
        )
    }

    onAddSpellFormSubmit(form) {
        console.log(form)
        this.setState({
            spellFormVisible: false
        })
        Popup.info("Заклинание сохранено.")
    }

    onEditSpellFormSubmit(form) {
        console.log(form)
        this.setState({
            spellFormVisible: false
        })
        Popup.info("Заклинание обновлено.")
    }
})