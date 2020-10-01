import React from "react";
import ViewInfo from "../../../Common/Constructions/ViewInfo";
import {connect} from "react-redux"
import {changeView} from "../../../../data-layer/ActionCreators";
import {skillCategoryView} from "../../../../Views";
import Btn from "../../../Common/Buttons/Btn";
import FormViewStyle from "../../../../styles/FormViewStyle";
import InputLabel from "../../../Common/Labels/InputLabel";
import priceCombinationListToString from "../../../../util/priceCombinationListToString";
import List from "../../../Common/Lists/List";
import ExpandableListItemWithBullets from "../../../Common/ListElements/ExpandableListItemWithBullets";
import Stubs from "../../../../stubs/Stubs";

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

            back: () => dispatch(changeView(skillCategoryView))
        }
    }
)(class SpellSchoolView extends React.Component {

    constructor(props) {
        super(props);

        this.state = Object.assign({}, props.spellSchool, {})
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
                      values={Stubs.schoolLvlList.map(schoolLvl =>
                          <ExpandableListItemWithBullets
                              name={schoolLvl.lvl + " Уровень:"}
                              description={"Стоимость покупки заклинаний:"}

                              bullets={[
                                  ...schoolLvl.upgradePriceCombinations.map(spellSchoolUpgradePriceCombination =>
                                      spellSchoolUpgradePriceCombination.spellCount + " навыков изучено: " + priceCombinationListToString(spellSchoolUpgradePriceCombination.priceCombinations)),
                                      "--------------",
                                      schoolLvl.spells.length + " навык(а)(ов)"
                                  ]}

                              onDetailsClicked={() => alert("go!")}


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
})