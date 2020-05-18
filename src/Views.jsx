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
import QuestionnaireTemplateCreationView from "./components/QuestionnaireCreation/View/QuestionnaireTemplateCreationView";
import QuestionnaireRulesView from "./components/QuestionnaireCreation/View/QuestionnaireRulesView";
import NetworkItem from "./components/Admin/NetworkItem";
import NetworkCreationView from "./components/Admin/Network/View/NetworkCreationView";
import SubnetworkCreationView from "./components/Admin/Subnetwork/View/SubnetworkCreationView";
import GameCreationView from "./components/Game/GameCreationView";
import NetworkEditView from "./components/Admin/Network/View/NetworkEditView";
import SubnetworkEditView from "./components/Admin/Subnetwork/View/SubnetworkEditView";
import GameEditView from "./components/Game/GameEditView";
import SkillView from "./components/Game/View/SkillListView";
import SkillItemForm from "./components/Game/View/SkillCreationView";
import SkillEditView from "./components/Game/View/SkillEditView";
import SkillSelectionView from "./components/QuestionnaireCreation/View/SkillSelectionView";
import AdminPageView from "./components/Admin/View/AdminPageView";
import Preload from "./util/Preload";
import QuestionnaireTemplateEditView from "./components/QuestionnaireCreation/View/QuestionnaireTemplateEditView";

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

export const questionnaireRulesView = {component: <QuestionnaireRulesView/>, label: "Правила игры"}
export const questionnaireTemplateCreationView = {component: <QuestionnaireTemplateCreationView/>, label: "Создание анкеты"}
export const questionnaireTemplateEditView = {component: <QuestionnaireTemplateEditView/>, label: "Редактирование шаблона анкеты"}
export const skillSelectionView = {component: <SkillSelectionView/>, label: "Выбор навыка"}

export const skillsView = {component: <SkillView/>, label: "Навыки"}
export const skillCreationView = {component: <SkillItemForm/>, label: "Создание навыка"}
export const skillEditView = {component: <SkillEditView/>, label: "Редактирование навыка"}