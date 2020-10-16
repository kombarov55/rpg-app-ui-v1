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
import GameView from "./components/Game/Self/View/GameView";
import NetworkCreationView from "./components/Admin/Network/View/NetworkCreationView";
import SubnetworkCreationView from "./components/Admin/Subnetwork/View/SubnetworkCreationView";
import GameCreationView from "./components/Game/Self/View/GameCreationView";
import NetworkEditView from "./components/Admin/Network/View/NetworkEditView";
import SubnetworkEditView from "./components/Admin/Subnetwork/View/SubnetworkEditView";
import GameEditView from "./components/Game/Self/View/GameEditView";
import AdminPageView from "./components/Admin/View/AdminPageView";
import ConversionView from "./components/Game/Self/View/ConversionView";
import CurrencyCreationView from "./components/Game/Self/View/CurrencyFormView";
import MerchandiseView from "./components/Game/Merchandise/View/MerchandiseView";
import SkillCategoryView from "./components/Game/Skill/View/SkillCategoryView";
import OrganizationDetailsView from "./components/Game/Organization/View/OrganizationDetailsView";
import TestView from "./components/TestView";
import SpellSchoolView from "./components/Game/Skill/View/SpellSchoolView";
import SchoolLvlView from "./components/Game/Skill/View/SchoolLvlView";
import SkillView from "./components/Game/Skill/View/SkillView";

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

export const skillCategoryView = {component: <SkillCategoryView/>, label: "Категория навыка"}
export const spellSchoolView = {component: <SpellSchoolView/>, label: "Школа навыков"}
export const schoolLvlView = {component: <SchoolLvlView/>, label: "Круг школы навыков"}

export const skillView = {component: <SkillView/>, label: "Навык"}

export const conversionView = {component: <ConversionView/>, label: "Обмен валют"}

export const currencyFormView = {component: <CurrencyCreationView/>, label: "Валюта"}

export const merchandiseView = {component: <MerchandiseView/>, label: "Товары"}

export const organizationDetailsView = {component: <OrganizationDetailsView/>, label: "Организация"}