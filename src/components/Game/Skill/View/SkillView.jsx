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
import {httpDelete, post, put} from "../../../../util/Http";
import {addSkillUpgradeUrl, deleteSkillUpgrade, editSkillUpgradeUrl} from "../../../../util/Parameters";
import Popup from "../../../../util/Popup";
import IsLastElement from "../../../../util/IsLastElement";
import FormMode from "../../../../data-layer/enums/FormMode";
import SkillUpgradeForm from "../Form/SkillUpgradeForm";

export default connect(
    state => ({
        activeSkill: state.activeSkill,

        currencyNames: state.activeGame.currencies.map(v => v.name)
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
        this.state = Object.assign({}, props.activeSkill, {
            upgradeFormVisible: false,
            upgradeForm: null,
            upgradeFormMode: FormMode.CREATE
        })
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
                          <ListItem text={amounts.map(amount => amount.name + ": " + amount.amount).join(" + ")}/>
                      )}
                />

                <List title={"Прокачка:"}
                      noItemsText={"Отсутствует.."}
                      isAddButtonVisible={!this.state.upgradeFormVisible}
                      onAddClicked={() => this.setState({
                          upgradeFormVisible: true,
                          upgradeFormMode: FormMode.CREATE
                      })}
                      values={this.state.upgrades.map(skillUpgrade =>
                          <ExpandableListItemWithBullets
                              name={skillUpgrade.lvlNum + " Уровень:"}
                              description={skillUpgrade.description}
                              bullets={skillUpgrade.prices.map(amounts => amounts.map(amount => amount.name + ": " + amount.amount).join(" + "))}

                              isDeleteVisible={IsLastElement(skillUpgrade, this.state.upgrades)}
                              onDeleteClicked={() => this.deleteUpgrade(skillUpgrade)}
                              onEditClicked={() => this.setState({
                                  upgradeFormVisible: true,
                                  upgradeFormMode: FormMode.EDIT,
                                  upgradeForm: skillUpgrade
                              })}

                              alwaysExpand={true}
                              key={skillUpgrade.id}
                          />
                      )}
                />
                {
                    this.state.upgradeFormVisible && (
                        this.state.upgradeFormMode == FormMode.CREATE ?
                            <SkillUpgradeForm
                                lvlNum={Math.max(...this.state.upgrades.map(v => v.lvlNum)) + 1}
                                currencyNames={this.props.currencyNames}
                                onSubmit={form => this.onAddSkillUpgradeSubmit(form)}
                            /> :
                            <SkillUpgradeForm
                                initialState={this.state.upgradeForm}
                                currencyNames={this.props.currencyNames}
                                onSubmit={form => this.onEditSkillUpgradeSubmit(form)}
                            />
                    )
                }

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

    onAddSkillUpgradeSubmit(form) {
        post(addSkillUpgradeUrl(this.state.id), form, rs => {
            this.setState({
                upgradeFormVisible: false,
                upgrades: this.state.upgrades.concat(rs)
            })
            Popup.info("Прокачка навыка создана.")
        })
    }

    onEditSkillUpgradeSubmit(form) {
        put(editSkillUpgradeUrl(form.id), form, rs => {
            this.setState({
                upgradeFormVisible: false,
                upgrades: this.state.upgrades.filter(v => v.id !== rs.id).concat(rs)
            })
            Popup.info("Прокачка навыка изменена.")
        })
    }
})