import React from "react";
import {connect} from "react-redux"
import FormTitleLabel from "../../../Common/Labels/FormTitleLabel";
import Btn from "../../../Common/Buttons/Btn";
import {changeView, setActiveOrganization} from "../../../../data-layer/ActionCreators";
import {gameView} from "../../../../Views";
import FormViewStyle from "../../../../styles/FormViewStyle";
import Label from "../../../Common/Labels/Label";
import BulletList from "../../../Common/Lists/BulletList";
import List from "../../../Common/Lists/List";
import ExpandableListItemWithButtons from "../../../Common/ListElements/ExpandableListItemWithButtons";
import {httpDelete, post} from "../../../../util/Http";
import {organizationHeadUrl} from "../../../../util/Parameters";
import Popup from "../../../../util/Popup";
import SmallerExpandableListItem from "../../../Common/ListElements/SmallerExpandableListItem";

export default connect(
    store => ({
        organization: store.activeOrganization,
        userAccounts: store.userAccounts
    }), dispatch => ({
        setOrganization: organization => dispatch(setActiveOrganization(organization)),
        back: () => dispatch(changeView(gameView))
    }))
(class OrganizationDetailsView extends React.Component {

        constructor(props) {
            super(props);
            this.state = this.formInitialState
        }


        formInitialState = {
            addHeadVisible: false
        }


        render() {
            return (
                <div style={FormViewStyle}>
                    <FormTitleLabel text={this.props.organization.name}/>
                    <Label text={this.props.organization.description}/>
                    <BulletList values={[
                        "Тип: " + this.props.organization.type.value,
                        "Начальный бюджет: " + this.props.organization.initialBudget.map(v => v.name + ": " + v.amount).join(", ")
                    ]}/>

                    <List title={"Главы организации:"}
                          noItemsText={"Нет глав"}
                          isAddButtonVisible={!this.state.addHeadVisible}
                          onAddClicked={() => this.setState({addHeadVisible: true})}
                          values={this.props.organization.heads.map(userAccount =>
                              <ExpandableListItemWithButtons
                                  img={userAccount.img}
                                  name={userAccount.fullName}
                                  description={userAccount.role}

                                  onDeleteClicked={() => this.onDeleteHeadClicked(userAccount)}

                                  key={userAccount.id}
                              />
                          )}
                    />

                    {
                        this.state.addHeadVisible &&
                        <List title={"Выбор игрока:"}
                              noItemsText={"Все доступные игроки уже выбраны!"}
                              values={this.props.userAccounts.filter(v => !this.props.organization.heads.some(head => head.id === v.id)).map(userAccount =>
                                  <SmallerExpandableListItem
                                      img={userAccount.img}
                                      name={userAccount.fullName}
                                      description={userAccount.role}
                                      onClick={() => this.onAddHeadClicked(userAccount)}

                                      alwaysExpand={true}
                                      key={userAccount.id}
                                  />
                              )}
                        />
                    }

                    <Btn text={"Назад"} onClick={() => this.props.back()}/>
                </div>
            )
        }

        onAddHeadClicked(userAccount) {
            post(organizationHeadUrl(this.props.organization.id, userAccount.id), {}, rs => {
                this.props.setOrganization(rs)
                this.setState({addHeadVisible: false})
                Popup.info(userAccount.fullName + " был(а) добавлен(а) в правящие члены организаций.")
            })
        }

        onDeleteHeadClicked(userAccount) {
            httpDelete(organizationHeadUrl(this.props.organization.id, userAccount.id), rs => {
                this.props.setOrganization(rs)
                Popup.info(userAccount.fullName + " исключен из правления организацией.")
            })
        }
    }
)