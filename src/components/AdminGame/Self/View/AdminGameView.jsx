import React from "react";
import {connect} from "react-redux";
import {
    changeView,
    setActiveOrganization,
    setActiveQuestionnaireTemplate,
    setActiveSkillCategory,
} from "../../../../data-layer/ActionCreators";
import {
    adminPageView,
    conversionView,
    gameSettingsView,
    itemTemplateView,
    organizationDetailsView,
    questionnaireTemplateView,
    skillCategoryView
} from "../../../../Views";
import {get, httpDelete, post, put} from "../../../../util/Http";
import {
    deleteQuestionnaireTemplateUrl, deleteRecipeUrl,
    editQuestionnaireTemplateUrl,
    gameByIdUrl,
    organizationByGameIdUrl,
    organizationUrl,
    saveCurrencyUrl,
    saveQuestionnaireTemplateUrl, saveRecipeUrl,
    saveSkillCategoryUrl,
    skillCategoryUrl,
    updateCurrencyUrl, updateRecipe
} from "../../../../util/Parameters";
import Btn from "../../../Common/Buttons/Btn";
import Popup from "../../../../util/Popup";
import NameImgDescription from "../../../Common/Constructions/NameImgDescription";
import InputLabel from "../../../Common/Labels/InputLabel";
import AdminGameCurrencyComponent from "../Component/AdminGameCurrencyComponent";
import AdminGameSkillCateoryComponent from "../Component/AdminGameSkillCateoryComponent";
import AdminGameOrganizationsComponent from "../Component/AdminGameOrganizationsComponent";
import RecipeComponent from "../Component/RecipeComponent";
import AdminGameQuestionnaireTemplatesComponent from "../Component/AdminGameQuestionnaireTemplatesComponent";
import AdminTransferComponent from "../Component/AdminTransferComponent";
import BalanceProcedures from "../../../../data-layer/Procedures/BalanceProcedures";
import FormViewStyle from "../../../../styles/FormViewStyle";
import ViewInfo from "../../../Common/Constructions/ViewInfo";

export default connect(
    state => ({
        activeGame: state.activeGame
    }),
    null,
    (stateProps, dispatchProps, ownProps) => {
        const {dispatch} = dispatchProps

        return {
            ...stateProps,
            ...ownProps,

            toSkillCategoryView: skillCategory => {
                dispatch(setActiveSkillCategory(skillCategory))
                dispatch(changeView(skillCategoryView))
            },
            toQuestionnaireTemplateView: questionnaireTemplate => {
                dispatch(setActiveQuestionnaireTemplate(questionnaireTemplate))
                dispatch(changeView(questionnaireTemplateView))
            },
            toItemTemplateView: () => dispatch(changeView(itemTemplateView)),
            toConversionView: () => dispatch(changeView(conversionView)),
            toGameSettingsView: () => dispatch(changeView(gameSettingsView)),
            back: () => dispatch(changeView(adminPageView))
        }
    }
)(class extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currencies: [],
            skillCategories: [],
            organizations: [],
            recipes: [],
            questionnaireTemplates: [],
        }

        get(gameByIdUrl(this.props.activeGame.id), rs => this.setState(rs))
    }

    render() {
        return (
            <div style={FormViewStyle}>
                <ViewInfo name={this.state.title}
                          img={this.state.imgSrc}
                          description={this.state.description}
                />

                <a href={this.state.groupLink}>Ссылка на группу</a>

                <AdminGameCurrencyComponent currencies={this.state.currencies}
                                            onAddCurrency={form => this.onAddCurrency(form)}
                                            onEditCurrency={form => this.onEditCurrency(form)}
                />

                <AdminGameSkillCateoryComponent skillCategories={this.state.skillCategories}
                                                onAddSkillCategory={skillCategory => this.onAddSkillCategory(skillCategory)}
                                                onDeleteSkillCategory={skillCategory => this.onDeleteSkillCategory(skillCategory)}
                                                onEditSkillCategory={skillCategory => this.onEditSkillCategory(skillCategory)}
                                                onSkillCategoryDetailsClicked={skillCategory => this.props.toSkillCategoryView(skillCategory)}
                />

                <AdminGameOrganizationsComponent organizations={this.state.organizations}
                                                 onAddOrganization={form => this.onAddOrganization(form)}
                                                 onEditOrganization={form => this.onEditOrganization(form)}
                                                 onDeleteOrganization={organization => this.onDeleteOrganization(organization)}
                />

                <RecipeComponent gameId={this.state.id}
                                 recipes={this.state.recipes}
                                 onAddRecipe={form => this.onAddRecipe(form)}
                                 onDeleteRecipe={recipe => this.onDeleteRecipe(recipe)}
                />

                <AdminGameQuestionnaireTemplatesComponent
                    questionnaireTemplates={this.state.questionnaireTemplates}
                    onAddQuestionnaireTemplate={form => this.onAddQuestionnaireTemplate(form)}
                    onEditQuestionnaireTemplate={form => this.onEditQuestionnaireTemplate(form)}
                    onDeleteQuestionnaireTemplate={form => this.onDeleteQuestionnaireTemplate(form)}
                    onQuestionnaireTemplateDetailsClicked={questionnaireTemplate => this.props.toQuestionnaireTemplateView(questionnaireTemplate)}
                />

                <AdminTransferComponent currencyNames={this.state.currencies}
                                        gameId={this.state.id}
                                        onSubmit={({destinationType, destination, currency, amount}) =>
                                            this.onAdminTransfer(destinationType, destination, currency, amount)}
                />

                <div className={"game-view-button-group"}>
                    <Btn text={"Предметы"} onClick={() => this.props.toItemTemplateView()}/>
                    <Btn text={"Настройки обмена валют"} onClick={() => this.props.toConversionView()}/>
                    <Btn text={"Настройки"} onClick={() => this.props.toGameSettingsView()}/>
                    <Btn text={"Назад"} onClick={() => this.props.back()}/>
                </div>
            </div>
        )
    }

    onAddCurrency(form) {
        post(saveCurrencyUrl(this.state.id), form, rs => {
            this.setState(state => ({currencies: state.currencies.concat(rs)}))
            Popup.info("Валюта добавлена.")
        })
    }

    onEditCurrency(form) {
        put(updateCurrencyUrl(this.state.id, form.id), form, rs => {
            this.setState(state => ({currencies: state.currencies.filter(v => v.id !== rs.id).concat(rs)}))
            Popup.info("Валюта обновлена.")
        })
    }

    onAddSkillCategory(form) {
        post(saveSkillCategoryUrl(this.state.id), form, rs => {
            this.setState(state => ({skillCategories: state.skillCategories.concat(rs)}))
            Popup.info("Категория навыков добавлена.")
        })
    }

    onEditSkillCategory(form) {
        put(skillCategoryUrl(form.id), form, rs => {
            this.setState(state => ({skillCategories: state.skillCategories.filter(v => v.id !== rs.id).concat(rs)}))
            Popup.info("Категория навыков обновлена.")
        })
    }

    onDeleteSkillCategory(form) {
        httpDelete(skillCategoryUrl(form.id), rs => {
            this.setState(state => ({skillCategories: state.skillCategories.filter(v => v.id !== rs.id)}))
            Popup.info("Категория навыков удалена.")
        })
    }

    onAddOrganization(form) {
        post(organizationByGameIdUrl(this.state.id), form, rs => {
            this.setState(state => ({organizations: state.organizations.concat(rs)}))
            Popup.info("Организация создана.")
        })
    }

    onEditOrganization(form) {
        put(organizationUrl(form.id), form, rs => {
            this.setState(state => ({organizations: state.organizations.filter(v => v.id !== rs.id).concat(rs)}))
            Popup.info("Организация обновлена.")
        })
    }

    onDeleteOrganization(form) {
        httpDelete(organizationUrl(form.id), rs => {
            this.setState(state => ({organizations: state.organizations.filter(v => v.id !== rs.id)}))
            Popup.info("Организация удалена.")
        })
    }

    onAddRecipe(form) {
        post(saveRecipeUrl(this.state.id), form, rs => {
            this.setState(state => ({questionnaireTemplates: state.questionnaireTemplates.concat(rs)}))
            Popup.info("Формула крафта создана.")
        })
    }

    onDeleteRecipe(form) {
        httpDelete(deleteRecipeUrl(form.id), rs => {
            this.setState(state => ({questionnaireTemplates: state.questionnaireTemplates.filter(v => v.id !== rs.id)}))
            Popup.info("Формула крафта удалена.")
        })
    }

    onAddQuestionnaireTemplate(form) {
        post(saveQuestionnaireTemplateUrl(this.state.id), form, rs => {
            this.setState(state => ({questionnaireTemplates: state.questionnaireTemplates.concat(rs)}))
            Popup.info("Шаблон анкеты создан. Для дальнейшей настройки перейдите по кнопке 'Подробнее'.")
        })
    }

    onEditQuestionnaireTemplate(form) {
        put(editQuestionnaireTemplateUrl(form.id), form, rs => {
            this.setState(state => ({questionnaireTemplates: state.questionnaireTemplates.filter(v => v.id !== rs.id).concat(rs)}))
            Popup.info("Шаблон анкеты обновлен. Для дальнейшей настройки перейдите по кнопке 'Подробнее'.")
        })
    }

    onDeleteQuestionnaireTemplate(form) {
        httpDelete(deleteQuestionnaireTemplateUrl(form.id), rs => {
            this.setState(state => ({questionnaireTemplates: state.questionnaireTemplates.filter(v => v.id !== rs.id)}))
            Popup.info("Шаблон анкеты удалён.")
        })
    }

    onAdminTransfer(destinationType, destination, currency, amount) {
        BalanceProcedures.adminTransfer(destination.balanceId, currency, amount, destination.id, destinationType, () => {
            Popup.info("Перевод сделан.")
        })
    }
})