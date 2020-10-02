import React from "react";
import {connect} from "react-redux"
import FormViewStyle from "../../../../styles/FormViewStyle";
import ViewInfo from "../../../Common/Constructions/ViewInfo";
import ListItem from "../../../Common/ListElements/ListItem";
import List from "../../../Common/Lists/List";
import ExpandableListItemWithBullets from "../../../Common/ListElements/ExpandableListItemWithBullets";
import {changeView} from "../../../../data-layer/ActionCreators";
import {skillCategoryView} from "../../../../Views";
import Btn from "../../../Common/Buttons/Btn";
import {httpDelete} from "../../../../util/Http";
import {deleteSkillUpgrade} from "../../../../util/Parameters";
import Popup from "../../../../util/Popup";
import IsLastElement from "../../../../util/IsLastElement";

export default connect(
    state => ({
        activeSkill: state.activeSkill
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
)(class SkillView extends React.Component {

    constructor(props) {
        super(props);
        this.state = Object.assign({}, props.activeSkill, {})
    }

    render() {
        return (
            <div style={FormViewStyle}>
                <ViewInfo
                    img={this.state.img}
                    name={this.state.name}
                    description={this.state.description}
                    chips={[
                        this.state.upgradable ? "Прокачиваемый" : "Не прокачиваемый"
                    ]}
                />

                <List title={"Стоимость покупки: "}
                      noItemsText={"Бесплатно!"}
                      values={this.state.prices.map(amounts =>
                          <ListItem text={amounts.map(amount => amount.name + ": " + amount.amount)}/>
                      )}
                />

                <List title={"Прокачка:"}
                      noItemsText={"Отсутствует.."}
                      values={this.state.upgrades.map(skillUpgrade =>
                          <ExpandableListItemWithBullets
                              name={skillUpgrade.lvlNum + " Уровень:"}
                              description={skillUpgrade.description}
                              bullets={skillUpgrade.prices.map(amounts => amounts.map(amount => amount.name + ": " + amount.amount))}

                              isDeleteVisible={IsLastElement(skillUpgrade, this.state.upgrades)}
                              onDeleteClicked={() => this.deleteUpgrade(skillUpgrade)}

                              alwaysExpand={true}
                              key={skillUpgrade.id}
                          />
                      )}
                />

                <Btn text={"Назад"} onClick={() => this.props.back()}/>
            </div>
        )
    }

    deleteUpgrade(upgrade) {
        httpDelete(deleteSkillUpgrade(upgrade.id), rs => {
            this.setState(state => ({
                upgrades: state.upgrades.filter(v => v.id !== rs.id)
            }))
            Popup.info("Повышение навыка удалено.")
        })
    }
})