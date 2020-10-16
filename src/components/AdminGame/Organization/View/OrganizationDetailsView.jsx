import React from "react";
import {connect} from "react-redux"
import FormTitleLabel from "../../../Common/Labels/FormTitleLabel";
import Btn from "../../../Common/Buttons/Btn";
import {changeView, setActiveOrganization, setAvailableMerchandise} from "../../../../data-layer/ActionCreators";
import {adminGameView} from "../../../../Views";
import FormViewStyle from "../../../../styles/FormViewStyle";
import List from "../../../Common/Lists/List";
import ExpandableListItemWithButtons from "../../../Common/ListElements/ExpandableListItemWithButtons";
import {httpDelete, post, put} from "../../../../util/Http";
import {
    addBalanceUrl,
    addOrganizationShopUrl,
    organizationHeadUrl,
    removeOrganizationShopUrl
} from "../../../../util/Parameters";
import Popup from "../../../../util/Popup";
import SmallerExpandableListItem from "../../../Common/ListElements/SmallerExpandableListItem";
import CountryDetailsComponent from "../Components/CountryDetailsComponent";
import FormMode from "../../../../data-layer/enums/FormMode";
import ShopForm from "../Form/ShopForm";
import ListItem from "../../../Common/ListElements/ListItem";
import PriceInput from "../../../Common/Input/PriceInput";
import OrganizationType from "../../../../data-layer/enums/OrganizationType";
import ExpandableListItemWithBullets from "../../../Common/ListElements/ExpandableListItemWithBullets";
import SkillInfluenceToString from "../../../../util/SkillInfluenceToString";
import GetDestinationByName from "../../../../data-layer/enums/GetDestinationByName";

export default connect(
    store => ({
        gameId: store.activeGame.id,
        organization: store.activeOrganization,
        userAccounts: store.userAccounts,
        currencies: store.activeGame.currencies,
        availableMerchandise: store.availableMerchandise
    }), dispatch => ({
        setOrganization: organization => dispatch(setActiveOrganization(organization)),
        setAvailableMerchandise: merchandiseList => dispatch(setAvailableMerchandise(merchandiseList)),
        back: () => dispatch(changeView(adminGameView))
    }))
(class OrganizationDetailsView extends React.Component {

        constructor(props) {
            super(props);
            this.state = this.formInitialState
        }


        formInitialState = {
            addHeadVisible: false,

            addShopVisible: false,
            shopForm: null,
            shopFormMode: FormMode.CREATE,

            addBalanceVisible: false
        }


        render() {
            return (
                <div style={FormViewStyle}>
                    <FormTitleLabel text={this.props.organization.name}/>
                    <div>{this.props.organization.type.value}</div>
                    <div>{this.props.organization.description}</div>

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

                    <List title={"Бюджет: "}
                          values={this.props.organization.balance.map(v =>
                              <ListItem text={v.name + ": " + v.amount}/>
                          )}
                    />
                    {
                        this.state.addBalanceVisible ?
                            <PriceInput currencies={this.props.currencies.map(v => v.name)}
                                        onSubmit={amountList => this.onAddBalanceSubmit(amountList)}
                            /> :
                            <Btn text={"Пополнить бюджет со своего счёта"}
                                 onClick={() => this.setState({addBalanceVisible: true})}
                            />
                    }

                    <List title={"Магазины:"}
                          noItemsText={"Отсутствуют.."}
                          isAddButtonVisible={!this.state.addShopVisible}
                          onAddClicked={() => this.setState({
                              shopFormMode: FormMode.CREATE,
                              addShopVisible: true,
                          })}
                          values={this.props.organization.shops.map(shop =>
                              <ListItem text={shop.name}
                                        onEdit={() => this.setState({
                                            shopFormMode: FormMode.EDIT,
                                            shopForm: shop,
                                            addShopVisible: true,
                                        })}
                                        onDelete={() => this.onDeleteShopClicked(shop)}
                              />
                          )}
                    />
                    {
                        this.state.addShopVisible &&
                        (this.state.shopFormMode === FormMode.CREATE ?
                                <ShopForm
                                    onSubmit={form => this.onAddShopClicked(form)}
                                /> :
                                <ShopForm
                                    initialState={this.state.shopForm}
                                    onSubmit={form => this.onEditShopClicked(form)}
                                />
                        )
                    }

                    <List title={"Склад:"}
                          noItemsText={"Пусто.."}
                          values={this.props.organization.ownedMerchandise.map(warehouseEntry =>
                              <ExpandableListItemWithBullets
                                  img={warehouseEntry.merchandise.img}
                                  name={warehouseEntry.merchandise.name}
                                  description={warehouseEntry.merchandise.description}

                                  bullets={[
                                      GetDestinationByName(warehouseEntry.merchandise.destination),
                                      "Категория: " + warehouseEntry.merchandise.category.name,
                                      "Тип: " + warehouseEntry.merchandise.type.name,
                                      warehouseEntry.merchandise.slots + " слот(ов)",
                                      warehouseEntry.merchandise.skillInfluences.map(it => SkillInfluenceToString(it)).join(", ")
                                  ]}

                                  alwaysExpand={true}
                                  key={warehouseEntry.id}
                              />
                          )}
                    />

                    {this.detailsComponent()}

                    <Btn text={"Назад"} onClick={() => this.props.back()}/>
                </div>
            )
        }

        detailsComponent() {
            switch (this.props.organization.type.name) {
                case OrganizationType.COUNTRY:
                    return (
                        <CountryDetailsComponent gameId={this.props.gameId}
                                                 organization={this.props.organization}
                                                 currencies={this.props.currencies}
                                                 setOrganization={organization => this.props.setOrganization(organization)}
                        />
                    )
                default: return <div/>
            }
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

        onAddShopClicked(form) {
            post(addOrganizationShopUrl(this.props.organization.id), form, rs => {
                this.props.setOrganization(rs)
                Popup.info("Магазин добавлен")
                this.setState({
                    addShopVisible: false
                })
            })
        }

        onEditShopClicked(form) {
            put(removeOrganizationShopUrl(this.props.organization.id, form.id), form, rs => {
                this.props.setOrganization(rs)
                Popup.info("Магазин добавлен")
                this.setState({
                    addShopVisible: false
                })
            })
        }

        onDeleteShopClicked(shop) {
            httpDelete(removeOrganizationShopUrl(this.props.organization.id, shop.id), rs => {
                this.props.setOrganization(rs)
                Popup.info("Магазин удалён")
            })
        }

        onAddBalanceSubmit(amountList) {
            post(addBalanceUrl(this.props.organization.id), amountList, rs => {
                this.props.setOrganization(rs)
                this.setState({addBalanceVisible: false})
                Popup.info("Баланс пополнен.")
            })
        }
    }
)