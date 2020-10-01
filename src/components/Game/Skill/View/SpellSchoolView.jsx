import React from "react";
import ViewInfo from "../../../Common/Constructions/ViewInfo";
import {connect} from "react-redux"
import {changeView, setActiveSchoolLvl} from "../../../../data-layer/ActionCreators";
import {schoolLvlView, skillCategoryView} from "../../../../Views";
import Btn from "../../../Common/Buttons/Btn";
import FormViewStyle from "../../../../styles/FormViewStyle";
import InputLabel from "../../../Common/Labels/InputLabel";
import priceCombinationListToString from "../../../../util/priceCombinationListToString";
import List from "../../../Common/Lists/List";
import ExpandableListItemWithBullets from "../../../Common/ListElements/ExpandableListItemWithBullets";
import {post} from "../../../../util/Http";
import {addSchoolLvlToSpellSchoolUrl} from "../../../../util/Parameters";
import Popup from "../../../../util/Popup";

export default connect(
    state => ({
        spellSchool: state.activeSpellSchool
    }),
    null,
    (stateProps, dispatchProps, ownProps) => {
        const {dispatch} = dispatchProps

        return {
            ...stateProps,
            ...ownProps,

            toSchoolLvlView: schoolLvl => {
                dispatch(setActiveSchoolLvl(schoolLvl))
                dispatch(changeView(schoolLvlView))
            },
            back: () => dispatch(changeView(skillCategoryView))
        }
    }
)(class SpellSchoolView extends React.Component {

    constructor(props) {
        super(props);

        this.state = props.spellSchool
    }

    render() {
        return (
            <div style={FormViewStyle}>
                <ViewInfo
                    img={this.state.img}
                    name={this.state.name}
                    description={this.state.description}
                />

                <InputLabel text={"Мин. количество заклинаний для перехода на следующий уровень:"}/>
                {this.state.minSpellCountToUpgrade}

                <InputLabel text={"Стоимость изучения:"}/>
                {priceCombinationListToString(this.state.purchasePriceCombinations)}

                <List title={"Круги:"}
                      noItemsText={"Пусто.."}
                      isAddButtonVisible={true}
                      onAddClicked={() => this.onAddSchoolLvlClicked()}
                      values={this.state.schoolLvls.map(schoolLvl =>
                          <ExpandableListItemWithBullets
                              name={schoolLvl.lvl + " Уровень:"}
                              description={"Стоимость покупки заклинаний:"}

                              bullets={[
                                  ...schoolLvl.spellPurchaseOptions.map(spellSchoolUpgradePriceCombination =>
                                      spellSchoolUpgradePriceCombination.spellCount + " навыков изучено: " + priceCombinationListToString(spellSchoolUpgradePriceCombination.priceCombinations)),
                                  "--------------",
                                  schoolLvl.spells.length + " навык(а)(ов)"
                              ]}

                              onDetailsClicked={() => this.props.toSchoolLvlView(schoolLvl)}


                              alwaysExpand={true}
                              key={schoolLvl.id}
                          />
                      )}
                />

                <Btn text={"Назад"}
                     onClick={() => this.props.back()}
                />

            </div>
        )
    }

    onAddSchoolLvlClicked() {
        post(addSchoolLvlToSpellSchoolUrl(this.state.id), {}, rs => {
            this.setState(state => ({schoolLvls: state.schoolLvls.concat(rs)}))
            Popup.info("Круг заклинаний добавлен.")
        })
    }
})