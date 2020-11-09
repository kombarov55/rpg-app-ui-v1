import React from "react";
import {connect} from "react-redux"
import FormTitleLabel from "../../../Common/Labels/FormTitleLabel";
import Btn from "../../../Common/Buttons/Btn";
import {changeView, setActiveOrganization, setAvailableMerchandise} from "../../../../data-layer/ActionCreators";
import {gameView} from "../../../../Views";
import FormViewStyle from "../../../../styles/FormViewStyle";
import List from "../../../Common/Lists/List";
import {get, httpDelete, post, put} from "../../../../util/Http";
import {
    addBalanceUrl,
    addOrganizationShopUrl,
    getOrganizationByIdUrl,
    organizationHeadUrl,
    removeOrganizationShopUrl
} from "../../../../util/Parameters";
import Popup from "../../../../util/Popup";
import CountryDetailsComponent from "../Components/CountryDetailsComponent";
import FormMode from "../../../../data-layer/enums/FormMode";
import ShopForm from "../Form/ShopForm";
import ListItem from "../../../Common/ListElements/ListItem";
import OrganizationType from "../../../../data-layer/enums/OrganizationType";
import ExpandableListItemWithBullets from "../../../Common/ListElements/ExpandableListItemWithBullets";
import SkillInfluenceToString from "../../../../util/SkillInfluenceToString";
import GetDestinationByName from "../../../../data-layer/enums/GetDestinationByName";
import OrganizationHeadsComponent from "../Components/OrganizationHeadsComponent";
import OrganizationBalanceComponent from "../Components/OrganizationBalanceComponent";
import GetActiveCharacterFromStore from "../../../../util/GetActiveCharacterFromStore";

export default connect(
    store => ({
        gameId: store.activeGame.id,
        characterId: GetActiveCharacterFromStore(store)?.id,
        organization: store.activeOrganization,
        userAccounts: store.userAccounts,
        currencies: store.activeGame.currencies,
        availableMerchandise: store.availableMerchandise
    }), dispatch => ({
        setOrganization: organization => dispatch(setActiveOrganization(organization)),
        setAvailableMerchandise: merchandiseList => dispatch(setAvailableMerchandise(merchandiseList)),
        back: () => dispatch(changeView(gameView))
    }))
(class OrganizationDetailsView extends React.Component {

        constructor(props) {
            super(props);
            this.state = this.formInitialState

            get(getOrganizationByIdUrl(this.props.organization.id), rs => this.setState({organization: rs}))
        }

        formInitialState = {
            organization: {
                heads: [],
                balance: [],
                shops: [],
                ownedMerchandise: [],
                entranceTax: []
            },

            addHeadVisible: false,

            addShopVisible: false,
            shopForm: null,
            shopFormMode: FormMode.CREATE,

            addBalanceVisible: false
        }


        render() {
            return (
                <div style={FormViewStyle}>
                    <FormTitleLabel text={this.state.organization.name}/>
                    <div>{OrganizationType.getLabelByName(this.state.organization.type)}</div>
                    <div>{this.state.organization.description}</div>

                    <OrganizationHeadsComponent gameId={this.props.gameId}
                                                heads={this.state.organization.heads}
                                                onAddHead={character => post(organizationHeadUrl(this.state.organization.id, character.id), {}, rs => {
                                                    this.setState({organization: rs})
                                                    Popup.info(`${character.name} назначен одним из глав организации.`)
                                                })}
                                                onRemoveHead={character => httpDelete(organizationHeadUrl(this.state.organization.id, character.id), rs => {
                                                    this.setState({organization: rs})
                                                    Popup.info(`${character.name} снят с правления организацией.`)
                                                })}
                    />

                    <OrganizationBalanceComponent gameId={this.state.gameId}
                                                  characterId={this.props.characterId}
                                                  currencyNames={this.props.currencies.map(v => v.name)}
                                                  balance={this.state.organization.balance}
                    />

                    <List title={"Магазины:"}
                          noItemsText={"Отсутствуют.."}
                          isAddButtonVisible={!this.state.addShopVisible}
                          onAddClicked={() => this.setState({
                              shopFormMode: FormMode.CREATE,
                              addShopVisible: true,
                          })}
                          values={this.state.organization.shops.map(shop =>
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
                          values={this.state.organization.ownedMerchandise.map(warehouseEntry =>
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
            switch (this.state.organization.type) {
                case OrganizationType.COUNTRY:
                    return (
                        <CountryDetailsComponent gameId={this.props.gameId}
                                                 organization={this.state.organization}
                                                 currencies={this.props.currencies}
                                                 setOrganization={organization => this.props.setOrganization(organization)}
                        />
                    )
                default:
                    return <div/>
            }
        }

        onAddHeadClicked(userAccount) {
            post(organizationHeadUrl(this.state.organization.id, userAccount.id), {}, rs => {
                this.props.setOrganization(rs)
                this.setState({addHeadVisible: false})
                Popup.info(userAccount.fullName + " был(а) добавлен(а) в правящие члены организаций.")
            })
        }

        onDeleteHeadClicked(userAccount) {
            httpDelete(organizationHeadUrl(this.state.organization.id, userAccount.id), rs => {
                this.props.setOrganization(rs)
                Popup.info(userAccount.fullName + " исключен из правления организацией.")
            })
        }

        onAddShopClicked(form) {
            post(addOrganizationShopUrl(this.state.organization.id), form, rs => {
                this.props.setOrganization(rs)
                Popup.info("Магазин добавлен")
                this.setState({
                    addShopVisible: false
                })
            })
        }

        onEditShopClicked(form) {
            put(removeOrganizationShopUrl(this.state.organization.id, form.id), form, rs => {
                this.props.setOrganization(rs)
                Popup.info("Магазин добавлен")
                this.setState({
                    addShopVisible: false
                })
            })
        }

        onDeleteShopClicked(shop) {
            httpDelete(removeOrganizationShopUrl(this.state.organization.id, shop.id), rs => {
                this.props.setOrganization(rs)
                Popup.info("Магазин удалён")
            })
        }

        onAddBalanceSubmit(amountList) {
            post(addBalanceUrl(this.state.organization.id), amountList, rs => {
                this.props.setOrganization(rs)
                this.setState({addBalanceVisible: false})
                Popup.info("Баланс пополнен.")
            })
        }
    }
)