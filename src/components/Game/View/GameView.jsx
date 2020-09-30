import React, {useState} from "react";
import {connect} from "react-redux";
import {
    changeView,
    setActiveGame,
    setActiveOrganization,
    setAvailableMerchandise,
    setGames,
    setOrganizations,
    updateActiveGame,
    updateGameForm,
    updateQuestionnaireTemplateForm
} from "../../../data-layer/ActionCreators";
import {
    adminPageView,
    conversionView,
    currencyFormView,
    gameEditView,
    merchandiseView,
    networkView,
    organizationDetailsView,
    questionnaireRulesView,
    skillCategoryView,
    subnetworkView
} from "../../../Views";
import {get, httpDelete, post, put} from "../../../util/Http";
import {
    addItemForSaleForGameUrl,
    deleteGameUrl,
    merchandiseUrl,
    organizationByGameIdAndIdUrl,
    organizationByGameIdUrl,
    organizationUrl,
    removeItemForSaleForGameUrl,
    saveSkillCategoryUrl,
    skillCategoryUrl
} from "../../../util/Parameters";
import Btn from "../../Common/Buttons/Btn";
import Preload from "../../../util/Preload";
import Globals from "../../../util/Globals";
import GameCreationMode from "../../../data-layer/enums/GameCreationMode";
import DefaultFormValues from "../../../data-layer/DefaultFormValues";
import QuestionnaireTemplateFormMode from "../../../data-layer/enums/QuestionnaireTemplateFormMode";
import List from "../../Common/Lists/List";
import SmallEditableListItem from "../../Common/ListElements/SmallEditableListItem";
import FormType from "../../../data-layer/enums/FormMode";
import FormMode from "../../../data-layer/enums/FormMode";
import ExpandableListItemWithButtons from "../../Common/ListElements/ExpandableListItemWithButtons";
import Popup from "../../../util/Popup";
import ExpandableListItemWithBullets from "../../Common/ListElements/ExpandableListItemWithBullets";
import OrganizationForm from "../Organization/Form/OrganizationForm";
import ItemForSaleForm from "../Merchandise/Form/ItemForSaleForm";
import FormatDate from "../../../util/FormatDate";
import SkillCategoryForm from "../Skill/Form/SkillCategoryForm";
import IconSelect from "../../Common/Input/IconSelect";
import MoneyIcons from "../../../data-layer/enums/MoneyIcons";

function mapStateToProps(state, props) {
    return {
        activeGame: state.activeGame,
        games: state.games,
        organizations: state.organizations,
        userAccounts: state.userAccounts,
        currencies: state.activeGame.currencies.map(v => v.name),
        availableMerchandise: state.availableMerchandise
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeView: (view, params = {}) => dispatch(changeView(view, params)),
        setGames: games => dispatch(setGames(games)),
        updateGameForm: game => dispatch(updateGameForm(game)),
        updateActiveGame: fieldNameToValue => dispatch(updateActiveGame(fieldNameToValue)),
        updateQuestionnaireTemplateForm: fieldNameToValue => dispatch(updateQuestionnaireTemplateForm(fieldNameToValue)),
        setActiveGame: game => dispatch(setActiveGame(game)),
        setOrganizations: organizations => dispatch(setOrganizations(organizations)),
        setActiveOrganization: organization => dispatch(setActiveOrganization(organization)),
        setAvailableMerchandise: xs => dispatch(setAvailableMerchandise(xs))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(function (props) {

    const [skillCategoryVisible, setSkillCategoryVisible] = useState(false)
    const [skillCategoryForm, setSkillCategoryForm] = useState(null)
    const [skillCategoryFormMode, setSkillCategoryFormMode] = useState(FormMode.CREATE)

    const [organizationFormVisible, setOrganizationFormVisible] = useState(false)
    const [organizationForm, setOrganizationForm] = useState()
    const [organizationFormMode, setOrganizationFormMode] = useState(FormMode.CREATE)

    const [itemForSaleFormVisible, setItemForSaleFormVisible] = useState(false)

    function onEditClicked() {
        props.updateGameForm(props.activeGame)
        props.changeView(gameEditView)
    }

    function onDeleteClicked() {
        if (window.confirm("Удалить игру?")) {
            httpDelete(deleteGameUrl(props.activeGame.id), () => {
                Popup.info("Игра архивирована.")
                props.setGames(props.games.filter(it => it.id !== props.activeGame.id))
                onBackClicked()
            })
        }
    }

    function onBackClicked() {
        switch (Globals.gameCreationMode) {
            case GameCreationMode.OPEN:
                props.changeView(adminPageView)
                break
            case GameCreationMode.BY_NETWORK:
                props.changeView(networkView)
                break
            case GameCreationMode.BY_SUBNETWORK:
                props.changeView(subnetworkView)
                break
        }
    }

    function onMerchandiseClicked() {
        props.changeView(merchandiseView, {
            gameId: props.activeGame.id
        })
    }

    function onAddQuestionnaireTemplateClicked() {
        Globals.questionnaireTemplateFormMode = QuestionnaireTemplateFormMode.CREATE
        props.updateQuestionnaireTemplateForm(DefaultFormValues.questionnaireTemplateForm)
        props.changeView(questionnaireRulesView)
    }

    function onConversionClicked() {
        Preload.conversionView(props.activeGame.id)
        props.changeView(conversionView)
    }

    function onMerchandiseButtonClicked() {
        props.changeView()
    }

    function onAddCurrencyClicked() {
        props.changeView(currencyFormView, {
            formType: FormType.CREATE
        })
    }

    function onEditCurrencyClicked(currency) {
        props.changeView(currencyFormView, {
            formType: FormType.EDIT,
            formState: currency
        })
    }

    function onSaveOrganizationClicked(form) {
        post(organizationByGameIdUrl(props.activeGame.id), form, rs => {
            setOrganizationFormVisible(false)
            Popup.info("Организация создана. Для дальнейшей настройки организации нажмите 'Подробнее'")
            props.setOrganizations(props.organizations.concat(rs))
        })
    }

    function onUpdateOrganizationClicked(form) {
        put(organizationByGameIdAndIdUrl(props.activeGame.id, form.id), form, rs => {
            setOrganizationFormVisible(false)
            Popup.info("Организация обновлена.")
            props.setOrganizations(props.organizations.filter(v => v.id !== rs.id).concat(rs))
        })
    }

    function onDeleteOrganizationClicked(organization) {
        httpDelete(organizationUrl(organization.id), rs => {
            props.setOrganizations(props.organizations.filter(v => v.id !== rs.id))

            Popup.info("Организация удалена")
        })
    }

    function onOrganizationDetailsClicked(organization) {
        props.setActiveOrganization(organization)
        props.changeView(organizationDetailsView)
    }

    function onDeleteSkillCategoryClicked(skillCategory) {
        httpDelete(skillCategoryUrl(skillCategory.id), rs => {
            Popup.info("Категория навыка удалена")
            props.setActiveGame(Object.assign({}, props.activeGame, {
                skillCategories: props.activeGame.skillCategories.filter(v => v.id !== rs.id)
            }))
        })
    }

    function onSkillCategoryDetailsClicked(skillCategory) {
        props.changeView(skillCategoryView, {
            skillCategory: skillCategory
        })
    }

    function onAddItemForSaleClicked() {
        get(merchandiseUrl(props.activeGame.id), rs => {
            props.setAvailableMerchandise(rs)
            setItemForSaleFormVisible(true)
        })
    }

    function onItemForSaleSubmit(form) {
        post(addItemForSaleForGameUrl(props.activeGame.id), form, rs => {
            props.setActiveGame(rs)
            setItemForSaleFormVisible(false)
            Popup.info("Товар добавлен.")
        })
    }

    function onItemForSaleDeleteClicked(itemForSale) {
        httpDelete(removeItemForSaleForGameUrl(props.activeGame.id, itemForSale.id), rs => {
            props.setActiveGame(rs)
            Popup.info("Товар снят с продажи")
        })
    }

    function onAddSkillCategorySubmit(form) {
        post(saveSkillCategoryUrl(props.activeGame.id), form, rs => {
            setSkillCategoryVisible(false)
            props.setActiveGame(Object.assign({}, props.activeGame, {
                skillCategories: props.activeGame.skillCategories.concat(rs)
            }))
            Popup.info("Категория навыка добавлена.")
        })
    }

    function onEditSkillCategorySubmit(form) {
        put(skillCategoryUrl(form.id), form, rs => {
            setSkillCategoryVisible(false)
            props.setActiveGame(Object.assign({}, props.activeGame, {
                skillCategories: props.activeGame.skillCategories.filter(v => v.id !== rs.id).concat(rs)
            }))
            Popup.info("Категория навыка обновлена.")
        })
    }

    return (
        <div className={"game-view"}>
            <div className={"game-info"}>
                <img className={"game-info-img"}
                     src={props.activeGame.imgSrc}
                />
                <div className={"game-name"}>{props.activeGame.title}</div>
                <div className={"game-description"}>{props.activeGame.description}</div>
                <div className={"game-description"}><a href={props.activeGame.groupLink}>Ссылка на группу</a></div>

                <List title={"Валюты: (макс. 3)"}
                      noItemsText={"Нет валют"}
                      values={props.activeGame.currencies.map(currency =>
                          <SmallEditableListItem text={currency.name}
                                                 onEditClicked={() => onEditCurrencyClicked(currency)}
                          />
                      )}
                      isAddButtonVisible={props.activeGame.currencies.length < props.activeGame.maxCurrenciesCount}
                      onAddClicked={() => onAddCurrencyClicked()}
                />

                <List title={"Категории навыков:"}
                      noItemsText={"Нет категорий навыков"}
                      isAddButtonVisible={!skillCategoryVisible}
                      onAddClicked={() => {
                          setSkillCategoryFormMode(FormMode.CREATE)
                          setSkillCategoryVisible(true)
                      }}
                      values={props.activeGame.skillCategories.map(skillCategory =>
                          <ExpandableListItemWithButtons
                              img={skillCategory.img}
                              name={skillCategory.name}
                              description={skillCategory.description}
                              onDeleteClicked={() => onDeleteSkillCategoryClicked(skillCategory)}
                              onEditClicked={() => {
                                  setSkillCategoryForm(skillCategory)
                                  setSkillCategoryFormMode(FormMode.EDIT)
                                  setSkillCategoryVisible(true)
                              }}
                              onDetailsClicked={() => onSkillCategoryDetailsClicked(skillCategory)}
                          />
                      )}
                />
                {
                    skillCategoryVisible && (
                        skillCategoryFormMode === FormMode.CREATE ?
                            <SkillCategoryForm
                                onSubmit={form => onAddSkillCategorySubmit(form)}
                            /> :
                            <SkillCategoryForm
                                initialState={skillCategoryForm}
                                onSubmit={form => onEditSkillCategorySubmit(form)}
                            />
                    )
                }

                <List title={"База:"}
                      noItemsText={"Нет товаров.."}
                      isAddButtonVisible={!itemForSaleFormVisible}
                      onAddClicked={() => onAddItemForSaleClicked()}
                      values={props.activeGame.itemsForSale.map(itemForSale =>
                          <ExpandableListItemWithBullets
                              name={itemForSale.merchandise.name}
                              img={itemForSale.merchandise.img}
                              description={itemForSale.merchandise.description}
                              onDeleteClicked={() => onItemForSaleDeleteClicked(itemForSale)}
                              bullets={[
                                  "Цена: " + itemForSale.price.map(v => v.name + ": " + v.amount).join(" или "),
                                  "Количество: " + itemForSale.amount,
                                  "Дата выставления на продажу: " + FormatDate(new Date(itemForSale.creationDate))
                              ]}

                              alwaysExpand={true}
                              key={itemForSale.id}
                          />
                      )}
                />
                {
                    itemForSaleFormVisible &&
                    <ItemForSaleForm
                        merchandiseList={props.availableMerchandise}
                        currencies={props.activeGame.currencies}
                        onSubmit={form => onItemForSaleSubmit(form)}
                    />
                }

                <List title={"Организации"}
                      noItemsText={"Нет организаций"}
                      isAddButtonVisible={!organizationFormVisible}
                      onAddClicked={() => {
                          setOrganizationFormMode(FormMode.CREATE)
                          setOrganizationFormVisible(true)
                      }}
                      values={props.organizations.map(organization =>
                          <ExpandableListItemWithBullets
                              name={organization.name}
                              description={organization.description}
                              bullets={[
                                  "Тип: " + organization.type.value,
                                  "Бюджет: " + organization.balance.map(v => v.name + ": " + v.amount).join(", "),
                                  "Главы: " + organization.heads.map(v => v.fullName).join(", ")
                              ]}
                              onEditClicked={() => {
                                  setOrganizationFormMode(FormMode.EDIT)
                                  setOrganizationForm(organization)
                                  setOrganizationFormVisible(true)

                              }}
                              onDeleteClicked={() => onDeleteOrganizationClicked(organization)}
                              onDetailsClicked={() => onOrganizationDetailsClicked(organization)}

                              alwaysExpand={true}
                              key={organization.id}
                          />
                      )}
                />
                {
                    organizationFormVisible &&
                    (organizationFormMode === FormMode.CREATE ?
                        <OrganizationForm
                            userAccounts={props.userAccounts}
                            currencies={props.currencies}
                            onSubmit={form => onSaveOrganizationClicked(form)}
                        /> :
                        <OrganizationForm
                            initialState={organizationForm}
                            userAccounts={props.userAccounts}
                            currencies={props.currencies}
                            onSubmit={form => onUpdateOrganizationClicked(form)}
                        />)
                }


                <div className={"game-view-button-group"}>
                    <Btn text={"Товары"} onClick={() => onMerchandiseClicked()}/>
                    <Btn text={"Присоединиться к игре"}/>
                    <Btn text={"Создать шаблон анкеты"} onClick={() => onAddQuestionnaireTemplateClicked()}/>
                    <Btn text={"Настройки обмена валют"} onClick={() => onConversionClicked()}/>
                    <Btn text={"Товары"} onClick={() => onMerchandiseButtonClicked()}/>
                    <Btn text={"Редактировать"} onClick={() => onEditClicked()}/>
                    <Btn text={"Удалить"} onClick={() => onDeleteClicked()}/>
                    <Btn text={"Назад"} onClick={() => onBackClicked()}/>
                </div>
            </div>
        </div>
    )
})