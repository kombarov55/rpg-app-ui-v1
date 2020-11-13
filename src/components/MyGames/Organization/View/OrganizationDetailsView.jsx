import React from "react";
import {connect} from "react-redux"
import FormTitleLabel from "../../../Common/Labels/FormTitleLabel";
import Btn from "../../../Common/Buttons/Btn";
import {
    changeView,
    setActiveOrganization,
    setActiveShop
} from "../../../../data-layer/ActionCreators";
import {gameView, shopView} from "../../../../Views";
import FormViewStyle from "../../../../styles/FormViewStyle";
import {get, httpDelete, post, put} from "../../../../util/Http";
import {
    addOrganizationShopUrl,
    getOrganizationByIdUrl,
    organizationHeadUrl,
    removeOrganizationShopUrl,
    transferUrl
} from "../../../../util/Parameters";
import Popup from "../../../../util/Popup";
import CountryDetailsComponent from "../Components/CountryDetailsComponent";
import OrganizationType from "../../../../data-layer/enums/OrganizationType";
import OrganizationHeadsComponent from "../Components/OrganizationHeadsComponent";
import OrganizationBalanceComponent from "../Components/OrganizationBalanceComponent";
import GetActiveCharacterFromStore from "../../../../util/GetActiveCharacterFromStore";
import OrganizationShopsComponent from "../Components/OrganizationShopsComponent";
import OrganizationItemsComponent from "../Components/OrganizationItemsComponent";
import TransferDestination from "../../../../data-layer/enums/TransferDestination";

export default connect(
    store => ({
        gameId: store.activeGame.id,
        characterId: GetActiveCharacterFromStore(store)?.id,
        organization: store.activeOrganization,
        userAccounts: store.userAccounts,
        currencies: store.activeGame.currencies
    }), dispatch => ({
        setOrganization: organization => dispatch(setActiveOrganization(organization)),
        toShopView: shop => {
            dispatch(setActiveShop(shop))
            dispatch(changeView(shopView))
        },
        back: () => dispatch(changeView(gameView))
    }))
(class OrganizationDetailsView extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                organization: {
                    heads: [],
                    balance: [],
                    shops: [],
                    items: [],
                    entranceTax: []
                }
            }

            this.refresh()
        }

        render() {
            return (
                <div style={FormViewStyle}>
                    <FormTitleLabel text={this.state.organization.name}/>
                    <div>{OrganizationType.getLabelByName(this.state.organization.type)}</div>
                    <div>{this.state.organization.description}</div>

                    <OrganizationHeadsComponent gameId={this.props.gameId}
                                                heads={this.state.organization.heads}
                                                onAddHead={character => this.onAddHead(character)}
                                                onRemoveHead={character => this.onRemoveHead(character)}
                    />

                    <OrganizationBalanceComponent gameId={this.state.gameId}
                                                  characterId={this.props.characterId}
                                                  currencyNames={this.props.currencies.map(v => v.name)}
                                                  balance={this.state.organization.balance}
                                                  onTransferToOrganization={(name, amount, buyerBalance) => this.onTransferToOrganization(name, amount, buyerBalance)}
                    />

                    <OrganizationShopsComponent shops={this.state.organization.shops}
                                                onShopAdded={form => this.onAddShopClicked(form)}
                                                onShopEdited={form => this.onEditShopClicked(form)}
                                                onShopDeleted={shop => this.onDeleteShopClicked(shop)}
                                                onDetailsClicked={shop => this.props.toShopView(shop)}
                    />

                    <OrganizationItemsComponent items={this.state.organization.items}/>

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
                Popup.info(userAccount.fullName + " был(а) добавлен(а) в правящие члены организаций.")
            })
        }

        onDeleteHeadClicked(userAccount) {
            httpDelete(organizationHeadUrl(this.state.organization.id, userAccount.id), rs => {
                this.props.setOrganization(rs)
                Popup.info(userAccount.fullName + " исключен из правления организацией.")
            })
        }

        onAddHead(character) {
            post(organizationHeadUrl(this.state.organization.id, character.id), {}, rs => {
                this.setState({organization: rs})
                Popup.info(`${character.name} назначен одним из глав организации.`)
            })
        }

        onRemoveHead(character) {
            httpDelete(organizationHeadUrl(this.state.organization.id, character.id), rs => {
                this.setState({organization: rs})
                Popup.info(`${character.name} снят с правления организацией.`)
            })
        }

        onTransferToOrganization(currencyName, amount, buyerBalance) {
            post(transferUrl, {
                from: buyerBalance.id,
                to: this.state.organization.balanceId,
                currency: currencyName,
                amount: amount,
                originId: this.props.characterId,
                originType: TransferDestination.PLAYER,
                destinationId: this.state.organization.id,
                destinationType: TransferDestination.ORGANIZATION
            }, () => {
                this.refresh(() => Popup.info("Перевод выполнен."))
            })
        }

        onAddShopClicked(form) {
            post(addOrganizationShopUrl(this.state.organization.id), form, rs => {
                this.setState({organization: rs})
                Popup.info("Магазин добавлен")
            })
        }

        onEditShopClicked(form) {
            put(removeOrganizationShopUrl(this.state.organization.id, form.id), form, rs => {
                this.setState({organization: rs})
                Popup.info("Магазин обновлен")
            })
        }

        onDeleteShopClicked(shop) {
            httpDelete(removeOrganizationShopUrl(this.state.organization.id, shop.id), rs => {
                this.setState({organization: rs})
                Popup.info("Магазин удалён")
            })
        }

        refresh(then = () => {}) {
            get(getOrganizationByIdUrl(this.props.organization.id), rs => {
                this.setState({organization: rs})
                then()
            })
        }
    }
)