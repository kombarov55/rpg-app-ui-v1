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
import NetworkCreationView from "./components/Admin/Network/View/NetworkCreationView";
import SubnetworkCreationView from "./components/Admin/Subnetwork/View/SubnetworkCreationView";
import GameCreationView from "./components/AdminGame/Self/View/GameCreationView";
import NetworkEditView from "./components/Admin/Network/View/NetworkEditView";
import SubnetworkEditView from "./components/Admin/Subnetwork/View/SubnetworkEditView";
import GameEditView from "./components/AdminGame/Self/View/GameEditView";
import AdminPageView from "./components/Admin/View/AdminPageView";
import ConversionView from "./components/AdminGame/Self/View/ConversionView";
import CurrencyCreationView from "./components/AdminGame/Self/View/CurrencyFormView";
import MerchandiseView from "./components/AdminGame/Merchandise/View/MerchandiseView";
import SkillCategoryView from "./components/AdminGame/Skill/View/SkillCategoryView";
import OrganizationDetailsView from "./components/MyGames/Organization/View/OrganizationDetailsView";
import TestView from "./components/TestView";
import SpellSchoolView from "./components/AdminGame/Skill/View/SpellSchoolView";
import SchoolLvlView from "./components/AdminGame/Skill/View/SchoolLvlView";
import SkillView from "./components/AdminGame/Skill/View/SkillView";
import QuestionnaireTemplateView from "./components/AdminGame/QuestionnaireTemplate/View/QuestionnaireTemplateView";
import MyGamesView from "./components/MyGames/Self/View/MyGamesView";
import AdminGameView from "./components/AdminGame/Self/View/AdminGameView";
import GameView from "./components/MyGames/Self/View/GameView";
import QuestionnaireFillingView from "./components/MyGames/Self/View/QuestionnaireFillingView";
import QuestionnaireDisclaimerView from "./components/MyGames/Self/View/QuestionnaireDisclaimerView";
import GameSettingsView from "./components/AdminGame/Self/View/GameSettingsView";
import UserAccountDetailsView from "./components/Admin/View/UserAccountDetailsView";
import QuestionnaireReviewView from "./components/MyGames/Self/View/QuestionnaireReviewView";
import CharacterListView from "./components/MyGames/CharacterList/View/CharacterListView";
import OfficeView from "./components/Office/Self/View/OfficeView";
import ShopView from "./components/MyGames/ShopView/View/ShopView";
import ShopManagementView from "./components/MyGames/ShopView/View/ShopManagementView";

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

export const adminGameView = {component: <AdminGameView/>, label: "Администрирование игры"}
export const gameCreationView = {component: <GameCreationView/>, label: "Создание игры"}
export const gameEditView = {component: <GameEditView/>, label: "Редактирование игры"}

export const skillCategoryView = {component: <SkillCategoryView/>, label: "Категория навыка"}
export const spellSchoolView = {component: <SpellSchoolView/>, label: "Школа навыков"}
export const schoolLvlView = {component: <SchoolLvlView/>, label: "Круг школы навыков"}

export const skillView = {component: <SkillView/>, label: "Навык"}
export const conversionView = {component: <ConversionView/>, label: "Обмен валют"}
export const currencyFormView = {component: <CurrencyCreationView/>, label: "Валюта"}
export const merchandiseView = {component: <MerchandiseView/>, label: "Товары"}
export const organizationDetailsView = {component: <OrganizationDetailsView/>, label: "Организация"}
export const questionnaireTemplateView = {component: <QuestionnaireTemplateView/>, label: "Шаблон анкеты"}
export const myGamesView = {component: <MyGamesView/>, label: "Мои игры"}
export const gameView = {component: <GameView/>, label: "Игра"}
export const questionnaireDisclaimerView = {component: <QuestionnaireDisclaimerView/>, label: "Правила игры"}
export const questionnaireFillingView = {component: <QuestionnaireFillingView/>, label: "Заполнение анкеты"}
export const gameSettingsView = {component: <GameSettingsView/>, label: "Настройки"}
export const userAccountDetailsView = {component: <UserAccountDetailsView/>, label: "Управление игроком"}
export const questionnaireReviewView = {component: <QuestionnaireReviewView/>, label: "Рассмотрение анкеты"}
export const characterListView = {component: <CharacterListView/>, label: "Лист персонажа"}
export const officeView = {component: <OfficeView/>, label: "Кабинет"}
export const shopView = {component: <ShopView/>, label: "Магазин"}
export const shopManagementView = {component: <ShopManagementView/>, label: "Управление магазином"}