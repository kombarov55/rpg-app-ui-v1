import React, {useState} from "react";
import {connect} from "react-redux";
import {
    changeView,
    setActiveGame,
    setActiveOrganization,
    setActiveQuestionnaireTemplate,
    setActiveSkillCategory,
    setAvailableMerchandise,
    setGames,
    setOrganizations,
    setQuestionnaireTemplates,
    setRecipes,
    updateActiveGame,
    updateGameForm,
} from "../../../../data-layer/ActionCreators";
import {
    adminPageView,
    conversionView,
    currencyFormView,
    gameEditView,
    gameSettingsView, itemTemplateView,
    networkView,
    organizationDetailsView,
    questionnaireTemplateView,
    skillCategoryView,
    subnetworkView
} from "../../../../Views";
import {get, httpDelete, post, put} from "../../../../util/Http";
import {
    addItemForSaleForGameUrl,
    deleteGameUrl,
    deleteQuestionnaireTemplateUrl,
    deleteRecipe,
    editQuestionnaireTemplateUrl,
    itemTemplateUrl,
    organizationByGameIdAndIdUrl,
    organizationByGameIdUrl,
    organizationUrl,
    questionnaireTemplateByIdUrl,
    removeItemForSaleForGameUrl,
    saveQuestionnaireTemplateUrl,
    saveRecipe,
    saveSkillCategoryUrl,
    skillCategoryUrl
} from "../../../../util/Parameters";
import Btn from "../../../Common/Buttons/Btn";
import Preload from "../../../../util/Preload";
import Globals from "../../../../util/Globals";
import GameCreationMode from "../../../../data-layer/enums/GameCreationMode";
import List from "../../../Common/Lists/List";
import SmallEditableListItem from "../../../Common/ListElements/SmallEditableListItem";
import FormType from "../../../../data-layer/enums/FormMode";
import FormMode from "../../../../data-layer/enums/FormMode";
import ExpandableListItemWithButtons from "../../../Common/ListElements/ExpandableListItemWithButtons";
import Popup from "../../../../util/Popup";
import ExpandableListItemWithBullets from "../../../Common/ListElements/ExpandableListItemWithBullets";
import OrganizationForm from "../../../MyGames/Organization/Form/OrganizationForm";
import SkillCategoryForm from "../../Skill/Form/SkillCategoryForm";
import RecipeForm from "../Form/RecipeForm";
import QuestionnaireTemplateForm from "../../QuestionnaireTemplate/Form/QuestionnaireTemplateForm";
import TransferComponent from "../Component/TransferComponent";
import BalanceProcedures from "../../../../data-layer/Procedures/BalanceProcedures";
import OrganizationType from "../../../../data-layer/enums/OrganizationType";

function mapStateToProps(state, props) {
    return {
        activeGame: state.activeGame,
        games: state.games,
        organizations: state.organizations,
        userAccounts: state.userAccounts,
        currencies: state.activeGame.currencies.map(v => v.name),
        availableMerchandise: state.availableMerchandise,
        recipes: state.recipes,
        skills: state.skills,
        questionnaireTemplates: state.questionnaireTemplates,
    }
}


function mapDispatchToProps(dispatch) {
    return {
        changeView: (view, params = {}) => dispatch(changeView(view, params)),
        setGames: games => dispatch(setGames(games)),
        updateGameForm: game => dispatch(updateGameForm(game)),
        updateActiveGame: fieldNameToValue => dispatch(updateActiveGame(fieldNameToValue)),
        setActiveGame: game => dispatch(setActiveGame(game)),
        setOrganizations: organizations => dispatch(setOrganizations(organizations)),
        setActiveOrganization: organization => dispatch(setActiveOrganization(organization)),
        setAvailableMerchandise: xs => dispatch(setAvailableMerchandise(xs)),
        setActiveSkillCategory: x => dispatch(setActiveSkillCategory(x)),
        setRecipes: x => dispatch(setRecipes(x)),
        setQuestionnaireTemplates: x => dispatch(setQuestionnaireTemplates(x)),
        toQuestionnaireTemplateView: questionnaireTemplate => {
            get(questionnaireTemplateByIdUrl(questionnaireTemplate.id), rs => {
                dispatch(setActiveQuestionnaireTemplate(rs))
                dispatch(changeView(questionnaireTemplateView))
            })
        },
        toGameSettingsView: () => dispatch(changeView(gameSettingsView)),
        toItemTemplateView: () => dispatch(changeView(itemTemplateView))
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

    const [recipeFormVisible, setRecipeFormVisible] = useState(false)

    const [questionnaireTemplateFormVisible, setQuestionnaireTemplateFormVisible] = useState(false)
    const [questionnaireTemplateForm, setQuestionnaireTemplateForm] = useState()
    const [questionnaireTemplateMode, setQuestionnaireTemplateFormMode] = useState(FormMode.CREATE)

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

    function onConversionClicked() {
        Preload.conversionView(props.activeGame.id)
        props.changeView(conversionView)
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
        props.setActiveSkillCategory(skillCategory)
        props.changeView(skillCategoryView)
    }

    function onAddItemForSaleClicked() {
        get(itemTemplateUrl(props.activeGame.id), rs => {
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

                {/*
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

                */}

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
                                  "Тип: " + OrganizationType.getLabelByName(organization.type),
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

                <List title={"Рецепты крафта:"}
                      noItemsText={"Отсутствуют.."}
                      isAddButtonVisible={!recipeFormVisible}
                      onAddClicked={() => {
                          setRecipeFormVisible(true)
                      }}
                      values={props.recipes.map(recipe =>
                          <ExpandableListItemWithBullets
                              name={recipe.target.name}
                              img={recipe.target.img}
                              description={recipe.target.description}
                              bullets={[
                                  "Зависит от навыка: " + recipe.dependantSkill.name,
                                  "Мин. уровень навыка для крафта: " + recipe.minSkillLvl,
                                  "Необходимые предметы для крафта:",
                                  ...recipe.ingredients.map(warehouseEntry => warehouseEntry.merchandise.name + ": " + warehouseEntry.amount + "шт."),
                                  "Шанс успеха:",
                                  ...recipe.successChanceDependencies.map(successChanceDependency => successChanceDependency.min + " до " + successChanceDependency.max + ": " + successChanceDependency.percent + "%")
                              ]}
                              onDeleteClicked={() => httpDelete(deleteRecipe(recipe.id), rs => {
                                  props.setRecipes(props.recipes.filter(v => v.id !== rs.id))
                                  Popup.info("Рецепт удалён")
                              })}

                              alwaysExpand={true}
                              key={recipe.id}
                          />
                      )}
                />
                {
                    recipeFormVisible &&
                    <RecipeForm
                        targetOptions={props.availableMerchandise.filter(v => v.canBeCrafted)}
                        ingredientOptions={props.availableMerchandise.filter(v => v.canBeUsedInCraft)}
                        dependantSkillOptions={props.skills}
                        onSubmit={form => {
                            post(saveRecipe(props.activeGame.id), form, rs => props.setRecipes(props.recipes.concat(rs)))
                            Popup.info("Рецепт крафта создан.")
                            setRecipeFormVisible(false)
                        }}
                    />
                }

                <List title={"Шаблоны анкет:"}
                      noItemsText={"Пусто.."}
                      isAddButtonVisible={!questionnaireTemplateFormVisible}
                      onAddClicked={() => {
                          setQuestionnaireTemplateFormVisible(true)
                          setQuestionnaireTemplateFormMode(FormMode.CREATE)
                      }}
                      values={props.questionnaireTemplates.map(questionnaireTemplate =>
                          <ExpandableListItemWithBullets
                              name={questionnaireTemplate.name}
                              description={questionnaireTemplate.description}
                              img={questionnaireTemplate.img}
                              onEditClicked={() => {
                                  setQuestionnaireTemplateFormVisible(true)
                                  setQuestionnaireTemplateForm(questionnaireTemplate)
                                  setQuestionnaireTemplateFormMode(FormMode.EDIT)
                              }}
                              onDeleteClicked={() =>
                                  httpDelete(deleteQuestionnaireTemplateUrl(questionnaireTemplate.id), rs => {
                                      props.setQuestionnaireTemplates(props.questionnaireTemplates.filter(v => v.id !== rs.id))
                                      Popup.info("Шаблон анкеты удалён")
                                  })
                              }
                              onDetailsClicked={() => props.toQuestionnaireTemplateView(questionnaireTemplate)}
                              alwaysExpand={true}
                              key={questionnaireTemplate.id}
                          />
                      )}
                />

                {
                    questionnaireTemplateFormVisible && (
                        questionnaireTemplateMode === FormMode.CREATE ?
                            <QuestionnaireTemplateForm
                                onSubmit={form => {
                                    post(saveQuestionnaireTemplateUrl(props.activeGame.id), form, rs => {
                                        props.setQuestionnaireTemplates(props.questionnaireTemplates.concat(rs))
                                        Popup.info("Шаблон анкеты создан. Для дальнейшей настройки зайдите по кнопке 'Подробнее'")
                                        setQuestionnaireTemplateFormVisible(false)
                                    })
                                }}
                            /> :
                            <QuestionnaireTemplateForm
                                initialState={questionnaireTemplateForm}
                                onSubmit={form => {
                                    put(editQuestionnaireTemplateUrl(form.id), form, rs => {
                                        props.setQuestionnaireTemplates(props.questionnaireTemplates.filter(v => v.id !== rs.id).concat(rs))
                                        Popup.info("Шаблон анкеты обновлен")
                                        setQuestionnaireTemplateFormVisible(false)
                                    })
                                }}
                            />
                    )
                }

                <TransferComponent currencyNames={props.currencies}
                                   gameId={props.activeGame.id}
                                   onSubmit={({destinationType, destination, currency, amount}) =>
                                       BalanceProcedures.adminTransfer(destination.balanceId, currency, amount, destination.id, destinationType, () => {
                                           Popup.info("Перевод сделан.")
                                       })}
                />

                <div className={"game-view-button-group"}>
                    <Btn text={"Предметы"} onClick={() => props.toItemTemplateView()}/>
                    <Btn text={"Настройки обмена валют"} onClick={() => onConversionClicked()}/>
                    <Btn text={"Настройки"} onClick={() => props.toGameSettingsView()}/>
                    {/*<Btn text={"Редактировать"} onClick={() => onEditClicked()}/>*/}
                    {/*<Btn text={"Удалить"} onClick={() => onDeleteClicked()}/>*/}
                    <Btn text={"Назад"} onClick={() => onBackClicked()}/>
                </div>
            </div>
        </div>
    )
})