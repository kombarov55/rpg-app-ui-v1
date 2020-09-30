import React from "react"

import AnnoucementCreation from "./components/Announcement/AnnoucementCreation";
import AnnouncementView from "./components/Announcement/View/AnnouncementView";
import MyAnnouncementView from "./components/Announcement/View/MyAnnouncementView";
import FavoriteAnnouncementView from "./components/Announcement/View/FavoriteAnnouncementView";
import ConversationListView from "./components/Conversation/View/ConversationListView";
import ConversationView from "./components/Conversation/View/ConversationView";
import ConversationHeadView from "./components/Conversation/View/ConversationHeadView";
import ConversationInputView from "./components/Conversation/View/ConversationInputView";
import NetworkSelectionView from "./components/Admin/Network/View/NetworkSelectionView";
import NetworkView from "./components/Admin/Network/View/NetworkView";
import SubnetworkView from "./components/Admin/Subnetwork/View/SubnetworkView";
import GameView from "./components/Game/View/GameView";
import QuestionnaireTemplateCreationView
    from "./components/QuestionnaireTemplateCreation/View/QuestionnaireTemplateCreationView";
import QuestionnaireRulesView from "./components/QuestionnaireTemplateCreation/View/QuestionnaireRulesView";
import NetworkCreationView from "./components/Admin/Network/View/NetworkCreationView";
import SubnetworkCreationView from "./components/Admin/Subnetwork/View/SubnetworkCreationView";
import GameCreationView from "./components/Game/View/GameCreationView";
import NetworkEditView from "./components/Admin/Network/View/NetworkEditView";
import SubnetworkEditView from "./components/Admin/Subnetwork/View/SubnetworkEditView";
import GameEditView from "./components/Game/View/GameEditView";
import SkillView from "./components/Game/View/SkillCategoryView/SkillListView";
import SkillItemForm from "./components/Game/View/SkillCategoryView/SkillCreationView";
import SkillEditView from "./components/Game/View/SkillCategoryView/SkillEditView";
import SkillSelectionView from "./components/QuestionnaireTemplateCreation/View/SkillSelectionView";
import AdminPageView from "./components/Admin/View/AdminPageView";
import QuestionnaireTemplateEditView
    from "./components/QuestionnaireTemplateCreation/View/QuestionnaireTemplateEditView";
import ConversionView from "./components/Game/View/ConversionView";
import SkillCategoryForm from "./components/Game/View/SkillCategoryView/SkillCategoryForm";
import SpellSchoolCreationView from "./components/Game/SpellSchoolCreationView";
import SpellCreationView from "./components/Game/View/SkillCategoryView/SpellCreationView";
import CurrencyCreationView from "./components/Game/View/CurrencyFormView";
import ShopView from "./components/Game/Merchandise/View/ShopView";
import MerchandiseView from "./components/Game/Merchandise/View/MerchandiseView";
import SkillCategoryEditView from "./components/Game/View/SkillCategoryView/SkillCategoryEditView";
import SkillCategoryView from "./components/Game/View/SkillCategoryView/SkillCategoryView";
import SkillFormView from "./components/Game/View/SkillCategoryView/SkillFormView";
import OrganizationDetailsView from "./components/Game/Organization/View/OrganizationDetailsView";
import TestView from "./components/TestView";

export const testView = {component: <TestView/>, label: "Тест"}

export const announcementView = {component: <AnnouncementView/>, label: "Доска объявлений"}
export const myAnnouncementView = {component: <MyAnnouncementView/>, label: "Мои объявления"}
export const favoriteAnnouncementView = {component: <FavoriteAnnouncementView/>, label: "Избранное"}
export const announcementCreationView = {component: <AnnoucementCreation/>, label: "Создание объявления"}

export const conversationListView = {component: <ConversationListView/>, label: "Диалоги"}
export const conversationView = {
    component: <ConversationView/>,
    header: <ConversationHeadView/>,
    footer: <ConversationInputView/>,
    label: "Диалог"
}

export const adminPageView = {component: <AdminPageView/>, label: "Панель администратора"}

export const networkSelectionView = {component: <NetworkSelectionView/>, label: "Сети"}

export const networkCreationView = {component: <NetworkCreationView/>, label: "Создание сети"}
export const networkEditView = {component: <NetworkEditView/>, label: "Редактирование сети"}
export const networkView = {component: <NetworkView/>, label: "Сеть"}

export const subnetworkCreationView = {component: <SubnetworkCreationView/>, label: "Создание подсети"}
export const subnetworkView = {component: <SubnetworkView/>, label: "Подсеть"}
export const subnetworkEditView = {component: <SubnetworkEditView/>, label: "Редактирование подсети"}

export const gameView = {component: <GameView/>, label: "Игра"}
export const gameCreationView = {component: <GameCreationView/>, label: "Создание игры"}
export const gameEditView = {component: <GameEditView/>, label: "Редактирование игры"}

export const skillCategoryFormView = {component: <SkillCategoryForm/>, label: "Создание категории навыка"}
export const skillCategoryEditView = {component: <SkillCategoryEditView/>, label: "Редактироание категории навыка"}
export const skillCategoryView = {component: <SkillCategoryView/>, label: "Категория навыка"}

export const questionnaireRulesView = {component: <QuestionnaireRulesView/>, label: "Правила игры"}
export const questionnaireTemplateCreationView = {component: <QuestionnaireTemplateCreationView/>, label: "Создание анкеты"}
export const questionnaireTemplateEditView = {component: <QuestionnaireTemplateEditView/>, label: "Редактирование шаблона анкеты"}
export const skillSelectionView = {component: <SkillSelectionView/>, label: "Выбор навыка"}

export const skillsView = {component: <SkillView/>, label: "Навыки"}
export const skillFormView = {component: <SkillFormView/>, label: "Навык"}
export const skillCreationView = {component: <SkillItemForm/>, label: "Создание навыка"}
export const skillEditView = {component: <SkillEditView/>, label: "Редактирование навыка"}

export const conversionView = {component: <ConversionView/>, label: "Обмен валют"}

export const spellSchoolCreationView = {component: <SpellSchoolCreationView/>, label: "Создание школы навыка"}
export const spellCreationView = {component: <SpellCreationView/>, label: "Создание заклинания"}

export const currencyFormView = {component: <CurrencyCreationView/>, label: "Валюта"}

export const shopView = {component: <ShopView/>, label: "Магазин"}

export const merchandiseView = {component: <MerchandiseView/>, label: "Товары"}

export const organizationDetailsView = {component: <OrganizationDetailsView/>, label: "Организация"}